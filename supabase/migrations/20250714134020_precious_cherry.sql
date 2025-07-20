/*
  # Add Go language support to resource constraints

  1. Updates
    - Add 'Go' to the language check constraints for both youtube_resources and notes_resources tables
    - This allows Go language resources to be stored in the database

  2. Changes
    - Update youtube_resources language constraint to include 'Go'
    - Update notes_resources language constraint to include 'Go'
*/

-- Update youtube_resources table constraint to include Go
ALTER TABLE youtube_resources 
DROP CONSTRAINT IF EXISTS youtube_resources_language_check;

ALTER TABLE youtube_resources 
ADD CONSTRAINT youtube_resources_language_check 
CHECK ((language = ANY (ARRAY['Python'::text, 'C'::text, 'C++'::text, 'Go'::text])));

-- Update notes_resources table constraint to include Go
ALTER TABLE notes_resources 
DROP CONSTRAINT IF EXISTS notes_resources_language_check;

ALTER TABLE notes_resources 
ADD CONSTRAINT notes_resources_language_check 
CHECK ((language = ANY (ARRAY['Python'::text, 'C'::text, 'C++'::text, 'Go'::text])));