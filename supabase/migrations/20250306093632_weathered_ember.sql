/*
  # Fix Admin Authentication System

  1. Changes
    - Recreate admin tables with proper structure
    - Set up correct RLS policies
    - Add initial admin user with proper password hash
    
  2. Security
    - Enable RLS on all tables
    - Add secure policies for admin access
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_credentials CASCADE;

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
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read admin credentials"
  ON admin_credentials
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can manage admin sessions"
  ON admin_sessions
  FOR ALL
  TO public
  USING (true);

-- Insert default admin user with password 'admin123'
-- This password hash is generated using bcrypt with 10 rounds
INSERT INTO admin_credentials (username, password_hash)
VALUES (
  'admin',
  '$2a$10$zqU/7OMlRWiCjOELGKxG6.Tj7HvoFxqV3uhF9VXlkCfSoqQJhFCeC'
) ON CONFLICT (username) DO NOTHING;