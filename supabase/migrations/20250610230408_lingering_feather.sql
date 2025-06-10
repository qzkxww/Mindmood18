/*
  # Create insights and daily tips tables

  1. New Tables
    - `user_insights`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `insight_type` (text, type of insight)
      - `title` (text, insight title)
      - `description` (text, insight description)
      - `data_points` (jsonb, supporting data)
      - `date_generated` (date)
      - `created_at` (timestamp)
    
    - `daily_tips`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `tip_content` (text, the tip content)
      - `tip_category` (text, category of tip)
      - `date_shown` (date)
      - `is_personalized` (boolean, whether tip is AI-generated)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to read their own insights and tips

  3. Indexes
    - Add indexes for efficient querying by user and date
*/

CREATE TABLE IF NOT EXISTS user_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  insight_type text NOT NULL CHECK (insight_type IN ('mood_pattern', 'energy_pattern', 'weekly_summary', 'trend_analysis', 'recommendation')),
  title text NOT NULL,
  description text NOT NULL,
  data_points jsonb DEFAULT '{}',
  date_generated date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  tip_content text NOT NULL,
  tip_category text DEFAULT 'general' CHECK (tip_category IN ('general', 'mood', 'energy', 'sleep', 'stress', 'motivation')),
  date_shown date NOT NULL DEFAULT CURRENT_DATE,
  is_personalized boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date_shown)
);

ALTER TABLE user_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tips ENABLE ROW LEVEL SECURITY;

-- Policies for user_insights
CREATE POLICY "Users can read own insights"
  ON user_insights
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insights"
  ON user_insights
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for daily_tips
CREATE POLICY "Users can read own tips"
  ON daily_tips
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tips"
  ON daily_tips
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tips"
  ON daily_tips
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_user_insights_user_date ON user_insights(user_id, date_generated DESC);
CREATE INDEX IF NOT EXISTS idx_user_insights_type ON user_insights(user_id, insight_type, date_generated DESC);
CREATE INDEX IF NOT EXISTS idx_daily_tips_user_date ON daily_tips(user_id, date_shown DESC);