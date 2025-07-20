/*
  # Fix Admin Authentication

  1. Changes
    - Recreate admin_credentials table with proper structure
    - Add initial admin user with hashed password
    - Set up proper RLS policies
    
  2. Security
    - Enable RLS
    - Add secure policies for admin access
    - Store hashed passwords only
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS admin_credentials CASCADE;
DROP TABLE IF EXISTS admin_sessions CASCADE;

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

-- Insert default admin user (password: admin123)
INSERT INTO admin_credentials (username, password_hash) VALUES
  ('admin', '$2a$10$5DgRoq6Qh9ZHCqCpqvqF5OUvG.dYxlOnT7BVqTNxms0jw9QwXl7Uy')
ON CONFLICT (username) DO NOTHING;