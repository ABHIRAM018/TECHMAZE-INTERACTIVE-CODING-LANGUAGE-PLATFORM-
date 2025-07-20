/*
  # Set up resources tables

  1. New Tables
    - `youtube_resources`
      - `id` (uuid, primary key)
      - `language` (text)
      - `title` (text)
      - `url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `notes_resources`
      - `id` (uuid, primary key)
      - `language` (text)
      - `title` (text)
      - `url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create tables if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'youtube_resources') THEN
    CREATE TABLE youtube_resources (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      language text NOT NULL,
      title text NOT NULL,
      url text NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;

  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notes_resources') THEN
    CREATE TABLE notes_resources (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      language text NOT NULL,
      title text NOT NULL,
      url text NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE youtube_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes_resources ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- YouTube resources policies
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'youtube_resources' AND policyname = 'Anyone can view youtube_resources') THEN
    CREATE POLICY "Anyone can view youtube_resources"
      ON youtube_resources FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'youtube_resources' AND policyname = 'Only admins can modify youtube_resources') THEN
    CREATE POLICY "Only admins can modify youtube_resources"
      ON youtube_resources FOR ALL
      USING (auth.uid() IN (SELECT id FROM admin_users));
  END IF;

  -- Notes resources policies
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'notes_resources' AND policyname = 'Anyone can view notes_resources') THEN
    CREATE POLICY "Anyone can view notes_resources"
      ON notes_resources FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'notes_resources' AND policyname = 'Only admins can modify notes_resources') THEN
    CREATE POLICY "Only admins can modify notes_resources"
      ON notes_resources FOR ALL
      USING (auth.uid() IN (SELECT id FROM admin_users));
  END IF;
END $$;