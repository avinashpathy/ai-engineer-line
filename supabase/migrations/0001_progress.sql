-- Lesson progress, one row per (user, lesson).
-- Row Level Security means a signed-in user can only ever see or change their own rows,
-- even though the anon key is public. Nobody can read another learner's data.

create table if not exists public.lesson_progress (
  user_id      uuid        not null references auth.users (id) on delete cascade,
  lesson_key   text        not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key),
  -- only well-formed keys like "transformers/mini-gpt" are accepted
  constraint lesson_key_format check (lesson_key ~ '^[a-z0-9-]{1,48}/[a-z0-9-]{1,48}$')
);

alter table public.lesson_progress enable row level security;
alter table public.lesson_progress force row level security;

-- Remove default grants, then grant only what the app needs.
revoke all on public.lesson_progress from anon, authenticated;
grant select, insert, delete on public.lesson_progress to authenticated;

create policy "read own progress"   on public.lesson_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own progress" on public.lesson_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "delete own progress" on public.lesson_progress for delete to authenticated using ((select auth.uid()) = user_id);

-- Cap rows per user so a compromised account can't fill the database.
create or replace function public.limit_progress_rows() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.lesson_progress where user_id = new.user_id) >= 500 then
    raise exception 'progress limit reached';
  end if;
  return new;
end $$;

drop trigger if exists limit_progress_rows on public.lesson_progress;
create trigger limit_progress_rows before insert on public.lesson_progress
  for each row execute function public.limit_progress_rows();
