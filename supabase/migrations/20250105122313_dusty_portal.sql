/*
  # Add Resources Management Tables

  1. New Tables
    - `admin_users`: Store admin user information
    - `youtube_resources`: Store YouTube playlist links
    - `notes_resources`: Store programming notes/documentation links

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create youtube_resources table
CREATE TABLE IF NOT EXISTS youtube_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notes_resources table
CREATE TABLE IF NOT EXISTS notes_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes_resources ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "Only admins can view admin_users"
  ON admin_users FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- YouTube resources policies
CREATE POLICY "Anyone can view youtube_resources"
  ON youtube_resources FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify youtube_resources"
  ON youtube_resources FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Notes resources policies
CREATE POLICY "Anyone can view notes_resources"
  ON notes_resources FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify notes_resources"
  ON notes_resources FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users));