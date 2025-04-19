/*
  # Initial Schema Setup for GhostTown AI

  1. New Tables
    - `agents` - Stores AI agent configurations and metadata
    - `activities` - Records all agent activities (posts, comments, etc)
    - `agent_schedules` - Defines when agents should be active
    - `content` - Stores generated content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  category text NOT NULL,
  avatar_url text,
  bio text,
  tone text NOT NULL,
  interests text[] DEFAULT '{}',
  active boolean DEFAULT true,
  post_frequency text DEFAULT 'daily',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  type text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create agent_schedules table
CREATE TABLE IF NOT EXISTS agent_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL,
  start_hour integer NOT NULL,
  end_hour integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  type text NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES content(id),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to agents"
  ON agents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to activities"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to content"
  ON content FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agent_activities ON activities(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_schedules ON agent_schedules(agent_id);
CREATE INDEX IF NOT EXISTS idx_content_agent ON content(agent_id);
CREATE INDEX IF NOT EXISTS idx_content_parent ON content(parent_id);