-- STEP 2: ROW LEVEL SECURITY (RLS)
-- Run this in Supabase SQL Editor AFTER Step 1

-- Enable RLS on all tables
alter table users enable row level security;
alter table projects enable row level security;
alter table billing enable row level security;
alter table templates enable row level security;

-- USERS policies
create policy "Users can view own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on users for update
  using (auth.uid() = id);

-- PROJECTS policies
create policy "Users can insert own projects"
  on projects for insert
  with check (auth.uid() = user_id);

create policy "Users can view own projects"
  on projects for select
  using (auth.uid() = user_id);

create policy "Users can update own projects"
  on projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on projects for delete
  using (auth.uid() = user_id);

-- BILLING policies
create policy "Users can view own billing"
  on billing for select
  using (auth.uid() = user_id);

create policy "Service role can insert billing"
  on billing for insert
  with check (true);

create policy "Service role can update billing"
  on billing for update
  using (true);

-- TEMPLATES policies
create policy "Authenticated users can view active templates"
  on templates for select
  using (is_active = true);

create policy "Service role can insert templates"
  on templates for insert
  with check (true);

create policy "Service role can update templates"
  on templates for update
  using (true);

create policy "Service role can delete templates"
  on templates for delete
  using (true);

-- Verify RLS is enabled
select schemaname, tablename, rowsecurity 
from pg_tables 
where schemaname = 'public' 
and tablename in ('users', 'projects', 'billing', 'templates')
order by tablename;
