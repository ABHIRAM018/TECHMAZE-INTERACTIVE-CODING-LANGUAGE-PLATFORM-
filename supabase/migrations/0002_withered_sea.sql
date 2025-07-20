/*
  # Add output column to code_submissions

  1. Changes
    - Add output column to code_submissions table
    - No need to recreate table or policies since they exist from previous migration
*/

-- Add output column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'code_submissions' 
    AND column_name = 'output'
  ) THEN
    ALTER TABLE code_submissions ADD COLUMN output text;
  END IF;
END $$;