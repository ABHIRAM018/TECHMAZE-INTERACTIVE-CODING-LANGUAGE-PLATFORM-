/*
  # Fix admin_users policy recursion issue

  1. Changes
     - Drop the problematic policy on admin_users that causes infinite recursion
     - Create a new policy that doesn't reference itself
     - Update policies for youtube_resources and notes_resources to use a simpler admin check

  2. Security
     - Maintain proper access control for admin users
     - Ensure only authenticated users with admin role can modify resources
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Only admins can view admin_users" ON admin_users;

-- Create a new policy that doesn't reference itself
CREATE POLICY "Admins can view admin_users"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- Update youtube_resources policies to avoid recursion
DROP POLICY IF EXISTS "Only admins can modify youtube_resources" ON youtube_resources;

CREATE POLICY "Only admins can modify youtube_resources"
  ON youtube_resources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Update notes_resources policies to avoid recursion
DROP POLICY IF EXISTS "Only admins can modify notes_resources" ON notes_resources;

CREATE POLICY "Only admins can modify notes_resources"
  ON notes_resources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );