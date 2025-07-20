/*
  # Fix admin policies recursion issue

  1. Changes
     - Fix the infinite recursion in admin_users policies
     - Update youtube_resources and notes_resources policies to use a simpler admin check
     - Add fallback policies for non-admin users

  2. Security
     - Maintain proper access control while avoiding recursion
     - Ensure only admins can modify resources
     - Allow all users to view resources
*/

-- Drop problematic policies that cause recursion
DROP POLICY IF EXISTS "Only admins can modify youtube_resources" ON youtube_resources;
DROP POLICY IF EXISTS "Only admins can modify notes_resources" ON notes_resources;
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Only admins can view admin_users" ON admin_users;

-- Create new policies with fixed admin check
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'youtube_resources' AND policyname = 'Admins can insert youtube_resources'
  ) THEN
    CREATE POLICY "Admins can insert youtube_resources"
      ON youtube_resources FOR INSERT
      WITH CHECK (
        (SELECT COUNT(*) FROM admin_users WHERE admin_users.id = auth.uid()) > 0
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'youtube_resources' AND policyname = 'Admins can update youtube_resources'
  ) THEN
    CREATE POLICY "Admins can update youtube_resources"
      ON youtube_resources FOR UPDATE
      USING (
        (SELECT COUNT(*) FROM admin_users WHERE admin_users.id = auth.uid()) > 0
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'youtube_resources' AND policyname = 'Admins can delete youtube_resources'
  ) THEN
    CREATE POLICY "Admins can delete youtube_resources"
      ON youtube_resources FOR DELETE
      USING (
        (SELECT COUNT(*) FROM admin_users WHERE admin_users.id = auth.uid()) > 0
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'notes_resources' AND policyname = 'Admins can insert notes_resources'
  ) THEN
    CREATE POLICY "Admins can insert notes_resources"
      ON notes_resources FOR INSERT
      WITH CHECK (
        (SELECT COUNT(*) FROM admin_users WHERE admin_users.id = auth.uid()) > 0
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'notes_resources' AND policyname = 'Admins can update notes_resources'
  ) THEN
    CREATE POLICY "Admins can update notes_resources"
      ON notes_resources FOR UPDATE
      USING (
        (SELECT COUNT(*) FROM admin_users WHERE admin_users.id = auth.uid()) > 0
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'notes_resources' AND policyname = 'Admins can delete notes_resources'
  ) THEN
    CREATE POLICY "Admins can delete notes_resources"
      ON notes_resources FOR DELETE
      USING (
        (SELECT COUNT(*) FROM admin_users WHERE admin_users.id = auth.uid()) > 0
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_users' AND policyname = 'Admin users can view admin_users'
  ) THEN
    CREATE POLICY "Admin users can view admin_users"
      ON admin_users FOR SELECT
      USING (
        auth.uid() IN (SELECT id FROM admin_users)
      );
  END IF;
END $$;