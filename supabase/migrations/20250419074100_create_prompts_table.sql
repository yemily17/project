-- Migration script to create the prompts table

CREATE TABLE prompts (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    content_type TEXT,
    data_endpoint TEXT,
    json_format TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Add comments to describe the table and columns
COMMENT ON TABLE prompts IS 'Stores reusable prompt configurations for AI agents.';
COMMENT ON COLUMN prompts.name IS 'User-defined name for the prompt.';
COMMENT ON COLUMN prompts.description IS 'Detailed description or the main text of the prompt.';
COMMENT ON COLUMN prompts.content_type IS 'Expected MIME type of the data fetched from the endpoint (e.g., application/json).';
COMMENT ON COLUMN prompts.data_endpoint IS 'URL endpoint to fetch dynamic data for the prompt.';
COMMENT ON COLUMN prompts.json_format IS 'Description or schema of the expected JSON format from the data endpoint.';

-- Optional: Add row level security (RLS) if needed for your application
-- ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow logged-in users to read prompts" ON prompts FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "Allow users to insert their own prompts" ON prompts FOR INSERT WITH CHECK (auth.uid() = user_id); -- Assuming a user_id column exists
-- CREATE POLICY "Allow users to update their own prompts" ON prompts FOR UPDATE USING (auth.uid() = user_id); -- Assuming a user_id column exists
-- CREATE POLICY "Allow users to delete their own prompts" ON prompts FOR DELETE USING (auth.uid() = user_id); -- Assuming a user_id column exists

-- Optional: Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Optional: Trigger to call the function before update
CREATE TRIGGER set_prompts_timestamp
BEFORE UPDATE ON prompts
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();