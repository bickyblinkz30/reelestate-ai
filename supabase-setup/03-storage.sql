-- STEP 3: STORAGE BUCKET & POLICIES
-- Run this in Supabase SQL Editor AFTER Steps 1 & 2

-- Create storage bucket (run via SQL or use Dashboard UI)
-- Note: Bucket creation via SQL requires the storage extension
insert into storage.buckets (id, name, public)
values ('property-media', 'property-media', true)
on conflict (id) do nothing;

-- Storage policies for property-media bucket

-- Anyone can view/download files
create policy "Public can view property media"
  on storage.objects for select
  using (bucket_id = 'property-media');

-- Authenticated users can upload
create policy "Authenticated users can upload property media"
  on storage.objects for insert
  with check (
    bucket_id = 'property-media' 
    and auth.role() = 'authenticated'
  );

-- Users can delete their own uploads
create policy "Users can delete own property media"
  on storage.objects for delete
  using (
    bucket_id = 'property-media' 
    and auth.uid() = owner
  );

-- Restrict file types (optional but recommended)
-- This is enforced at the application level, but you can add a check constraint:
-- Allowed: image/jpeg, image/png, image/webp, video/mp4, audio/mpeg

-- Verify bucket and policies
select name, public from storage.buckets where name = 'property-media';

select * from storage.policies where bucket_id = 'property-media';
