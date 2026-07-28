-- ==============================================================================
-- Supabase Row Level Security (RLS) & Table Hardening Migration
-- ==============================================================================

-- 1. Enable Row Level Security on `files` table
ALTER TABLE IF EXISTS public.files ENABLE ROW LEVEL SECURITY;

-- 2. Revoke all default public access from anon & authenticated roles
REVOKE ALL ON TABLE public.files FROM anon, authenticated;

-- 3. Create strict RLS Policy: Users can only SELECT, INSERT, UPDATE, DELETE their own files
DROP POLICY IF EXISTS "Users manage their own files" ON public.files;

CREATE POLICY "Users manage their own files"
  ON public.files
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- 4. Grant explicit table permissions to authenticated users and service_role
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.files TO authenticated;
GRANT ALL ON TABLE public.files TO service_role;
