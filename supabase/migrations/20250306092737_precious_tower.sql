/*
  # Admin Authentication Setup

  1. Changes
    - Create admin_users table for base admin identification
    - Add admin_credentials table for secure admin login
    - Add admin_sessions table for session management
    - Set up correct RLS policies without recursion
    - Add default admin account

  2. Security
    - Enable RLS on all tables
    - Add secure policies for admin access
    - Prevent infinite recursion in policies
*/

-- Create admin_users table first (base table for admin identification)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Create admin_credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admin_sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_credentials(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure clean slate
DROP POLICY IF EXISTS "Admin users are viewable by admins" ON admin_users;
DROP POLICY IF EXISTS "Admin credentials are accessible by admins" ON admin_credentials;
DROP POLICY IF EXISTS "Admin sessions are accessible by admins" ON admin_sessions;

-- Create new policies
CREATE POLICY "Admin users are viewable by admins"
  ON admin_users FOR ALL
  USING (auth.uid() = id);

CREATE POLICY "Admin credentials are accessible by admins"
  ON admin_credentials FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  ));

CREATE POLICY "Admin sessions are accessible by admins"
  ON admin_sessions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  ));

-- Insert default admin credentials if they don't exist
INSERT INTO admin_credentials (username, password_hash)
SELECT 'admin', '$2a$10$X7U8fxO0k9hJqY1jB0.WXOqFLF.c/E8L3gjXdnP.r9R8g7xQz2DQy'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_credentials WHERE username = 'admin'
);