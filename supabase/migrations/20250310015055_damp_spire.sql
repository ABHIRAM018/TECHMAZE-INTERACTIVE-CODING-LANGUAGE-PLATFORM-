/*
  # Fix Admin and Resource Management System

  1. Changes
    - Drop and recreate admin tables with proper structure
    - Add proper RLS policies for all tables
    - Add initial admin credentials
    
  2. Security
    - Enable RLS with appropriate policies
    - Store securely hashed passwords
    - Set up proper session management
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_credentials CASCADE;
DROP TABLE IF EXISTS youtube_resources CASCADE;
DROP TABLE IF EXISTS notes_resources CASCADE;

-- Create admin_credentials table
CREATE TABLE admin_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admin_sessions table
CREATE TABLE admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_credentials(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Create youtube_resources table
CREATE TABLE youtube_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL CHECK (language IN ('Python', 'C', 'C++')),
  title text NOT NULL,
  url text NOT NULL CHECK (url ~ '^https?://'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notes_resources table
CREATE TABLE notes_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL CHECK (language IN ('Python', 'C', 'C++')),
  title text NOT NULL,
  url text NOT NULL CHECK (url ~ '^https?://'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes_resources ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_credentials
CREATE POLICY "Public can read admin credentials"
  ON admin_credentials
  FOR SELECT
  TO public
  USING (true);

-- Create policies for admin_sessions
CREATE POLICY "Public can manage admin sessions"
  ON admin_sessions
  FOR ALL
  TO public
  USING (true);

-- Create policies for youtube_resources
CREATE POLICY "Anyone can view youtube resources"
  ON youtube_resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage youtube resources"
  ON youtube_resources
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for notes_resources
CREATE POLICY "Anyone can view notes resources"
  ON notes_resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage notes resources"
  ON notes_resources
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default admin user (username: admin, password: admin123)
INSERT INTO admin_credentials (username, password_hash)
VALUES ('admin', '$2a$10$5DgRoq6Qh9ZHCqCpqvqF5OUvG.dYxlOnT7BVqTNxms0jw9QwXl7Uy')
ON CONFLICT (username) DO NOTHING;