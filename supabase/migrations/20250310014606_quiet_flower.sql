/*
  # Fix Resource Management Tables

  1. Changes
    - Recreate resource tables with proper structure
    - Set up correct RLS policies
    - Add validation for URLs
    
  2. Security
    - Enable RLS on all tables
    - Add secure policies for admin access
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS youtube_resources CASCADE;
DROP TABLE IF EXISTS notes_resources CASCADE;

-- Create youtube_resources table
CREATE TABLE IF NOT EXISTS youtube_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL CHECK (language IN ('Python', 'C', 'C++')),
  title text NOT NULL,
  url text NOT NULL CHECK (url ~ '^https?://'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notes_resources table
CREATE TABLE IF NOT EXISTS notes_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL CHECK (language IN ('Python', 'C', 'C++')),
  title text NOT NULL,
  url text NOT NULL CHECK (url ~ '^https?://'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE youtube_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes_resources ENABLE ROW LEVEL SECURITY;

-- Create policies for youtube_resources
CREATE POLICY "Anyone can view youtube resources"
  ON youtube_resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage youtube resources"
  ON youtube_resources
  FOR ALL
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM admin_sessions
      WHERE expires_at > now()
    )
  );

-- Create policies for notes_resources
CREATE POLICY "Anyone can view notes resources"
  ON notes_resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage notes resources"
  ON notes_resources
  FOR ALL
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM admin_sessions
      WHERE expires_at > now()
    )
  );

-- Insert default resources
INSERT INTO youtube_resources (language, title, url) VALUES
  ('Python', 'Python Beginner Tutorial', 'https://www.youtube.com/watch?v=YYXdXT2l-Gg'),
  ('Python', 'Python OOP Tutorial', 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM'),
  ('C', 'C Programming Tutorial', 'https://www.youtube.com/watch?v=KJgsSFOSQv0'),
  ('C', 'Data Structures in C', 'https://www.youtube.com/watch?v=B31LgI4Y4DQ'),
  ('C++', 'C++ Tutorial for Beginners', 'https://www.youtube.com/watch?v=vLnPwxZdW4Y')
ON CONFLICT DO NOTHING;

INSERT INTO notes_resources (language, title, url) VALUES
  ('Python', 'Python Documentation', 'https://docs.python.org/3/'),
  ('Python', 'Python Tutorial PDF', 'https://docs.python.org/3/tutorial/index.html'),
  ('C', 'C Programming Notes', 'https://www.learn-c.org/'),
  ('C', 'C Reference Guide', 'https://en.cppreference.com/w/c'),
  ('C++', 'C++ Tutorial', 'https://www.learncpp.com/')
ON CONFLICT DO NOTHING;