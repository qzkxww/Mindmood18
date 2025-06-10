/*
  # Create mood entries table

  1. New Tables
    - `mood_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `mood_value` (decimal, 1-5 scale)
      - `energy_value` (decimal, 1-5 scale)
      - `notes` (text, optional user notes)
      - `date` (date, the date of the entry)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `mood_entries` table
    - Add policies for users to manage their own mood entries

  3. Indexes
    - Add index on user_id and date for efficient querying
*/

CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  mood_value decimal(3,1) NOT NULL CHECK (mood_value >= 1 AND mood_value <= 5),
  energy_value decimal(3,1) NOT NULL CHECK (energy_value >= 1 AND energy_value <= 5),
  notes text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own mood entries
CREATE POLICY "Users can read own mood entries"
  ON mood_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own mood entries
CREATE POLICY "Users can insert own mood entries"
  ON mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own mood entries
CREATE POLICY "Users can update own mood entries"
  ON mood_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own mood entries
CREATE POLICY "Users can delete own mood entries"
  ON mood_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for efficient querying by user and date
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_date ON mood_entries(user_id, date DESC);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_mood_entries_updated_at
  BEFORE UPDATE ON mood_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();