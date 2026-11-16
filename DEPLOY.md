# Deploying AI Engineer Line

This guide puts the site on the public internet with sign-in, on free tiers, in about 45 minutes.
You need three free accounts: **GitHub** (code), **Supabase** (sign-in + progress database) and **Vercel** (hosting).

> Turn on two-factor authentication for all three accounts before you start. Most real-world "hacks" of small sites are a stolen password for the hosting or database account, not a flaw in the code.

---

## How the pieces fit

```
Visitor ──HTTPS──► Vercel (static files + security headers)
   │
   └──HTTPS──► Supabase Auth (email link sign-in; GitHub / Google optional)
               Supabase Postgres (lesson_progress table, Row Level Security)
```

- The site is **static HTML/JS**. There is no application server to break into.
- Sign-in is handled by Supabase Auth. No passwords are stored anywhere.
- Each learner's progress is protected by **Row Level Security**: the database itself refuses to show or change anyone else's rows.

---

## 1. Put the code on GitHub

```bash
cd ai-engineer-line
npm ci            # install exact versions from package-lock.json
npm run build     # check it builds locally (sign-in will show as "off" — that's expected)
npm start         # optional: preview at http://localhost:4321 with production security headers

git init
git add .
git commit -m "AI Engineer Line: initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/ai-engineer-line.git
git push -u origin main
```

Then, in the repository's **Settings**:
- **Code security** → enable Dependabot alerts, Dependabot security updates, and secret scanning with push protection.
- **Branches** → add a rule for `main`: require a pull request and require the `ci` check to pass.

---

## 2. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**. Choose the region closest to your learners (e.g. Mumbai), and save the database password in a password manager.
2. Open **SQL Editor** → **New query**, paste the whole of `supabase/migrations/0001_progress.sql`, and click **Run**.
3. Check it worked: **Table Editor** → `lesson_progress` should show **RLS enabled**.

### Configure sign-in

Open **Authentication**:

1. **URL Configuration**
   - **Site URL**: your live address, e.g. `https://ai-engineer-line.vercel.app` (update this later if you add a custom domain).
   - **Redirect URLs**: add `https://ai-engineer-line.vercel.app/auth/callback/` and, for local testing, `http://localhost:4321/auth/callback/`. Only exact URLs you list here can receive sign-in links, which stops attackers redirecting tokens elsewhere.
2. **Sign In / Providers → Email**: enable it. Keep "Confirm email" on. This gives you magic-link sign-in.
3. **GitHub** (optional — skip it unless you want a "Continue with GitHub" button):
   - On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
     - Homepage URL: your site URL.
     - Authorization callback URL: the callback shown on Supabase's GitHub provider page (it looks like `https://<project-ref>.supabase.co/auth/v1/callback`).
   - Copy the Client ID and a new Client Secret into Supabase's GitHub provider and enable it.
   - Add `github` to the `NEXT_PUBLIC_AUTH_PROVIDERS` variable in Vercel (step 3 below) — the button only appears then.
4. **Google** (optional):
   - In [Google Cloud Console](https://console.cloud.google.com/): **APIs & Services → Credentials → Create OAuth client ID → Web application**.
   - Authorised redirect URI: the same Supabase callback URL.
   - Paste the Client ID and Secret into Supabase's Google provider and enable it.
   - Set **OAuth consent screen → Publishing status** to *In production*; while it says *Testing*, only test users you list can sign in.
   - Add `google` to `NEXT_PUBLIC_AUTH_PROVIDERS` (for both: `github,google`).
5. **Rate Limits**: keep the defaults or lower them (for example, emails per hour). They stop people spamming sign-in emails.
6. **Emails (required before anyone else can sign in):** Supabase's built-in email sender only delivers to members of your own Supabase team, at about 2 emails an hour — everyone else gets "Email address not authorized". Add your own SMTP provider under **Authentication → Emails → SMTP Settings**. Several providers (for example Resend, Brevo, Amazon SES) have free tiers that cover a small site; you'll need to verify a sending domain with them. Then raise the email rate limit under **Rate Limits** to suit your traffic.

### Copy your keys

**Project Settings → API** (or **API Keys**):
- **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`.
- **anon / publishable key** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`. It's safe to expose: it can only do what the RLS policies allow.

> ⚠️ Never copy the **service_role / secret** key into this project, into Vercel, or anywhere in the browser. It bypasses all security rules.

---

## 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import your GitHub repository.
2. Framework preset: **Next.js** (detected automatically). Leave build settings as they are.
3. **Environment Variables** — add for Production and Preview:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon / publishable key |
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-project>.vercel.app` |
   | `NEXT_TELEMETRY_DISABLED` | `1` |
   | `NEXT_PUBLIC_AUTH_PROVIDERS` | Optional: `github`, `google` or `github,google` — only for providers you set up in step 2. Leave it out for email-only sign-in. |

4. Click **Deploy**. In a minute or two you'll have a public URL.
5. Visit `/account/` on the live site and sign in with the email link and each provider you enabled. Changing any `NEXT_PUBLIC_` variable needs a redeploy (**Deployments → ⋯ → Redeploy**), because these values are built into the pages. Mark a lesson complete, sign in on a second browser, and check that the progress appears.

Every `git push` to `main` now redeploys automatically, and every pull request gets its own preview URL.

### Custom domain (optional)

**Vercel → Project → Settings → Domains** → add your domain and follow the DNS instructions. HTTPS certificates are automatic. Then update **Site URL** and **Redirect URLs** in Supabase, and `NEXT_PUBLIC_SITE_URL` in Vercel, to the new domain.

### Other hosts

The build output in `out/` is plain static files, so it also runs on Cloudflare Pages, Netlify or any static host. `public/_headers` carries the same security headers for Cloudflare Pages and Netlify. Run `npm run build` and deploy the `out/` folder.

---

## 4. Security checks after launch

Do these once after the first deploy, and again after big changes.

1. **Headers**: scan your URL at [securityheaders.com](https://securityheaders.com) and [observatory.mozilla.org](https://developer.mozilla.org/en-US/observatory). You should get an A or A+.
2. **Row Level Security**: in Supabase's SQL editor, run
   ```sql
   select tablename, rowsecurity from pg_tables where schemaname = 'public';
   ```
   Every table must show `rowsecurity = true`. Supabase's **Advisors → Security Advisor** should report no errors.
3. **Cross-user test**: sign in as two different users in two browsers. Neither should ever see the other's progress.
4. **Accounts**: two-factor authentication on GitHub, Vercel, Supabase, Google Cloud and your domain registrar.
5. **Updates**: merge Dependabot pull requests when CI passes. CodeQL runs weekly and on every pull request.

---

## 5. Day-to-day

- **Add or edit a lesson**: create or edit `content/learn/<station>/<lesson>.mdx`. The station and lesson must be listed in `lib/curriculum.ts`. Push, and Vercel redeploys.
- **Add a project**: add `content/projects/<slug>.mdx` with the same front-matter fields as the existing ones.
- **Deleting a user** (if someone asks): Supabase → **Authentication → Users** → delete. Their progress rows are deleted automatically.
- **Free-tier note**: Supabase pauses free projects after about a week with no activity. Sign-in stops working until you resume it in the dashboard; the rest of the site keeps working. Upgrade or keep some traffic flowing once you have real users.

---

## What "secure" means here (and what it doesn't)

No website can honestly promise it "cannot be hacked". This one is built to make attacks hard and their impact small:

| Risk | What protects it |
|---|---|
| Server takeover | There is no application server; the site is static files on Vercel's CDN |
| Stolen passwords | No passwords exist; sign-in is a one-time email link (GitHub / Google optional) |
| Reading or changing other people's data | Row Level Security in Postgres, plus a key-format check and a per-user row cap |
| Cross-site scripting | React escaping, MDX with JavaScript blocked, Mermaid in strict mode, Content-Security-Policy |
| Clickjacking | `X-Frame-Options: DENY` and `frame-ancestors 'none'` |
| Sign-in token theft via redirects | PKCE flow + Supabase's exact redirect-URL allow-list |
| Leaked secrets | Only public keys in the app; secret scanning with push protection on GitHub |
| Vulnerable dependencies | `npm audit` in CI, Dependabot, CodeQL |
| Account takeover of *your* admin accounts | Two-factor authentication on every service (step 4) |

The CSP allows `'unsafe-inline'` for scripts because Next.js static export inlines small bootstrap scripts and a static host can't add per-request nonces. Every other source is locked down; moving to server rendering with nonces is the next step if you ever need stricter.
