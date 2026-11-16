import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy & security" };

export default function Privacy() {
  return (
    <div className="wrap">
      <div className="phead"><h1>Privacy &amp; security</h1><p>What this site stores, and how it&apos;s protected.</p></div>
      <article className="prose" style={{ marginBottom: 40 }}>
        <h2>What we store</h2>
        <ul>
          <li><strong>Without an account:</strong> nothing leaves your browser. Completed lessons are kept in your browser&apos;s local storage.</li>
          <li><strong>With an account:</strong> your email address (from the sign-in method you chose) and a list of lesson IDs you marked complete, with the time you did it. Nothing else.</li>
          <li>No passwords are ever stored: sign-in uses a one-time email link (or GitHub or Google, where the site has them switched on).</li>
          <li>No ads, no third-party trackers, no selling of data.</li>
        </ul>
        <h2>How it&apos;s protected</h2>
        <ul>
          <li>The site itself is static files served over HTTPS, with strict security headers (Content-Security-Policy, HSTS, frame blocking).</li>
          <li>Accounts are handled by Supabase Auth. Your progress table is protected by database Row Level Security: each signed-in user can read and change only their own rows.</li>
          <li>Sign-in links expire and sign-in attempts are rate-limited.</li>
        </ul>
        <h2>Deleting your data</h2>
        <p>To delete your account and all progress, contact the site owner using the address listed in this repository&apos;s <code>SECURITY.md</code>. Deleting the account removes your progress rows automatically.</p>
        <h2>Reporting a security issue</h2>
        <p>Please report vulnerabilities privately as described in <code>SECURITY.md</code> rather than opening a public issue.</p>
      </article>
    </div>
  );
}
