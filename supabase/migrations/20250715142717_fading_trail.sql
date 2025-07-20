/*
  # Fix Go language constraints and ensure proper database setup

  1. Updates
    - Update language constraints to include 'Go' properly
    - Ensure both tables support Go language
    - Add proper indexes for performance

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access controls
*/

-- Update youtube_resources language constraint to include Go
ALTER TABLE youtube_resources DROP CONSTRAINT IF EXISTS youtube_resources_language_check;
ALTER TABLE youtube_resources ADD CONSTRAINT youtube_resources_language_check 
  CHECK (language = ANY (ARRAY['Python'::text, 'C'::text, 'C++'::text, 'Go'::text]));

-- Update notes_resources language constraint to include Go
ALTER TABLE notes_resources DROP CONSTRAINT IF EXISTS notes_resources_language_check;
ALTER TABLE notes_resources ADD CONSTRAINT notes_resources_language_check 
  CHECK (language = ANY (ARRAY['Python'::text, 'C'::text, 'C++'::text, 'Go'::text]));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_youtube_resources_language ON youtube_resources(language);
CREATE INDEX IF NOT EXISTS idx_notes_resources_language ON notes_resources(language);
CREATE INDEX IF NOT EXISTS idx_youtube_resources_created_at ON youtube_resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_resources_created_at ON notes_resources(created_at DESC);

-- Ensure proper column defaults
ALTER TABLE youtube_resources ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE youtube_resources ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE notes_resources ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE notes_resources ALTER COLUMN updated_at SET DEFAULT now();