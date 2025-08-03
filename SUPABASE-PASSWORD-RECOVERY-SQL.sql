-- =====================================================
-- SUPABASE PASSWORD RECOVERY SETUP SQL
-- =====================================================
-- Run this in your Supabase SQL Editor to fix password recovery issues
-- =====================================================

-- Step 1: Enable Row Level Security on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Step 2: Create necessary RLS policies for password recovery
-- Policy to allow users to update their own password
DROP POLICY IF EXISTS "Users can update their own password" ON auth.users;
CREATE POLICY "Users can update their own password" ON auth.users
  FOR UPDATE USING (auth.uid() = id);

-- Policy to allow password reset operations from Supabase Auth
DROP POLICY IF EXISTS "Allow password reset" ON auth.users;
CREATE POLICY "Allow password reset" ON auth.users
  FOR UPDATE USING (true);

-- Policy for email verification during signup and password reset
DROP POLICY IF EXISTS "Allow email verification" ON auth.users;
CREATE POLICY "Allow email verification" ON auth.users
  FOR UPDATE USING (auth.uid() = id);

-- Policy to allow users to view their own user data
DROP POLICY IF EXISTS "Users can view their own user data" ON auth.users;
CREATE POLICY "Users can view their own user data" ON auth.users
  FOR SELECT USING (auth.uid() = id);

-- Step 3: Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO anon;
GRANT SELECT, UPDATE ON auth.users TO authenticated;

-- Step 4: Create a function for password reset logging (optional)
CREATE OR REPLACE FUNCTION log_password_reset_attempt()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be used to log password reset attempts
  -- You can extend this to log to a separate table if needed
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create a user profiles view for better data access
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  updated_at,
  last_sign_in_at,
  CASE 
    WHEN email_confirmed_at IS NOT NULL THEN 'verified'
    ELSE 'unverified'
  END as email_status
FROM auth.users
WHERE auth.uid() = id;

-- Grant access to the user profiles view
GRANT SELECT ON user_profiles TO authenticated;

-- Step 6: Create a function to check if user exists (for password reset validation)
CREATE OR REPLACE FUNCTION user_exists(email_address text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM auth.users 
    WHERE email = email_address
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION user_exists(text) TO authenticated;
GRANT EXECUTE ON FUNCTION user_exists(text) TO anon;

-- Step 7: Create a function to get user reset status
CREATE OR REPLACE FUNCTION get_user_reset_status(user_email text)
RETURNS TABLE(
  user_id uuid,
  email text,
  email_confirmed boolean,
  can_reset_password boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN true ELSE false END
  FROM auth.users u
  WHERE u.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_user_reset_status(text) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_reset_status(text) TO anon;

-- Step 8: Add helpful comments for documentation
COMMENT ON POLICY "Users can update their own password" ON auth.users IS 'Allows users to update their own password during reset process';
COMMENT ON POLICY "Allow password reset" ON auth.users IS 'Allows password reset operations from Supabase Auth';
COMMENT ON POLICY "Allow email verification" ON auth.users IS 'Allows email verification during signup and password reset';
COMMENT ON POLICY "Users can view their own user data" ON auth.users IS 'Allows users to view their own profile information';
COMMENT ON VIEW user_profiles IS 'View for users to access their own profile data securely';
COMMENT ON FUNCTION user_exists(text) IS 'Check if a user exists by email address';
COMMENT ON FUNCTION get_user_reset_status(text) IS 'Get user status for password reset validation';

-- Step 9: Verify the setup (optional - run these to check if everything is working)
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'auth';

-- Check if policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'auth';

-- Test the user_exists function
-- SELECT user_exists('test@example.com');

-- Test the get_user_reset_status function
-- SELECT * FROM get_user_reset_status('test@example.com');

-- =====================================================
-- ADDITIONAL TROUBLESHOOTING QUERIES
-- =====================================================

-- Query 1: Check if any users have unconfirmed emails
-- SELECT email, email_confirmed_at, created_at 
-- FROM auth.users 
-- WHERE email_confirmed_at IS NULL;

-- Query 2: Check recent user activity
-- SELECT email, created_at, last_sign_in_at, email_confirmed_at
-- FROM auth.users 
-- ORDER BY created_at DESC 
-- LIMIT 10;

-- Query 3: Check for any failed authentication attempts (if you have logging set up)
-- This would require additional setup for comprehensive logging

-- =====================================================
-- NOTES FOR SUPABASE DASHBOARD CONFIGURATION
-- =====================================================
/*
After running this SQL, also configure these in your Supabase Dashboard:

1. Go to Authentication > Settings
   - Enable "Enable email confirmations"
   - Enable "Enable email change confirmations"
   - Set your Site URL (e.g., http://localhost:5174 for development)
   - Configure Sender Name and Email

2. Go to Authentication > Email Templates
   - Customize the "Reset Password" template
   - Test the email delivery

3. Go to Authentication > Policies
   - Verify the policies created by this script are active

4. Test the password reset flow:
   - Create a test user
   - Request password reset
   - Check email delivery
   - Test the reset link
*/

-- =====================================================
-- END OF SCRIPT
-- ===================================================== 