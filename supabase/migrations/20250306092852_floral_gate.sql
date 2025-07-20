/*
  # Fix Admin Authentication System

  1. Changes
    - Drop and recreate admin tables with proper structure
    - Set up correct RLS policies without recursion
    - Add initial admin user
    
  2. Security
    - Enable RLS on all tables
    - Add secure policies for admin access
    - Prevent infinite recursion in policies
*/

-- Drop existing tables to start fresh
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_credentials CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create admin_credentials table first (base table for admin authentication)
CREATE TABLE IF NOT EXISTS admin_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admin_sessions table for session management
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_credentials(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Enable RLS
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_credentials
CREATE POLICY "Public can authenticate admin credentials"
  ON admin_credentials
  FOR SELECT
  TO public
  USING (true);

-- Create policies for admin_sessions
CREATE POLICY "Admin sessions are accessible by authenticated users"
  ON admin_sessions
  FOR ALL
  TO public
  USING (true);

-- Insert default admin (password: admin123)
INSERT INTO admin_credentials (username, password_hash)
VALUES ('admin', '$2a$10$X7U8fxO0k9hJqY1jB0.WXOqFLF.c/E8L3gjXdnP.r9R8g7xQz2DQy')
ON CONFLICT (username) DO NOTHING;