-- STEP 1: DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- Users
create table if not exists users (
  id uuid primary key references auth.users,
  email text unique not null,
  plan text default 'free',
  credits int default 3,
  created_at timestamptz default now()
);

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  property_title text,
  property_type text,
  script text,
  voiceover_url text,
  video_url text,
  status text default 'draft',
  created_at timestamptz default now()
);

-- Billing
create table if not exists billing (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  stripe_customer_id text unique,
  stripe_subscription_id text,
  subscription_status text,
  updated_at timestamptz default now()
);

-- Templates
create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  template_name text,
  style_type text,
  prompt_prefix text,
  is_active bool default true
);

-- Verify tables created
select table_name from information_schema.tables 
where table_schema = 'public' and table_name in ('users', 'projects', 'billing', 'templates')
order by table_name;
