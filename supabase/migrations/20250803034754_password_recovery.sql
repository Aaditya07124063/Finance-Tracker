/*
  # Password Recovery Setup

  This migration ensures proper password recovery functionality by:
  1. Setting up proper RLS policies for auth.users
  2. Enabling password reset functionality
  3. Configuring email templates (if needed)
  4. Setting up proper user permissions
*/

-- Enable RLS on auth.users if not already enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to update their own password
CREATE POLICY IF NOT EXISTS "Users can update their own password" ON auth.users
  FOR UPDATE USING (auth.uid() = id);

-- Policy to allow password reset operations
CREATE POLICY IF NOT EXISTS "Allow password reset" ON auth.users
  FOR UPDATE USING (true);

-- Policy for email verification
CREATE POLICY IF NOT EXISTS "Allow email verification" ON auth.users
  FOR UPDATE USING (auth.uid() = id);

-- Policy to allow users to view their own user data
CREATE POLICY IF NOT EXISTS "Users can view their own user data" ON auth.users
  FOR SELECT USING (auth.uid() = id);

-- Enable email confirmations (this is typically done via Supabase dashboard, but included for reference)
-- Note: These settings should be configured in the Supabase Dashboard under Authentication > Settings

-- Create a function to handle password reset logging (optional, for monitoring)
CREATE OR REPLACE FUNCTION log_password_reset_attempt()
RETURNS TRIGGER AS $$
BEGIN
  -- Log password reset attempts (you can create a separate table for this if needed)
  -- This is optional but useful for monitoring and security
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to log password reset attempts (optional)
-- CREATE TRIGGER password_reset_log_trigger
--   AFTER UPDATE ON auth.users
--   FOR EACH ROW
--   WHEN (OLD.encrypted_password IS DISTINCT FROM NEW.encrypted_password)
--   EXECUTE FUNCTION log_password_reset_attempt();

-- Ensure proper permissions for the auth schema
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO anon;

-- Grant necessary permissions for password operations
GRANT SELECT, UPDATE ON auth.users TO authenticated;

-- Create a view for user profile data (optional, for better data access)
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  updated_at,
  last_sign_in_at
FROM auth.users
WHERE auth.uid() = id;

-- Grant access to the user profiles view
GRANT SELECT ON user_profiles TO authenticated;

-- Ensure proper function permissions
GRANT EXECUTE ON FUNCTION log_password_reset_attempt() TO authenticated;

-- Add comments for documentation
COMMENT ON POLICY "Users can update their own password" ON auth.users IS 'Allows users to update their own password during reset process';
COMMENT ON POLICY "Allow password reset" ON auth.users IS 'Allows password reset operations from Supabase Auth';
COMMENT ON POLICY "Allow email verification" ON auth.users IS 'Allows email verification during signup and password reset';
COMMENT ON POLICY "Users can view their own user data" ON auth.users IS 'Allows users to view their own profile information';
COMMENT ON VIEW user_profiles IS 'View for users to access their own profile data securely'; 