# Supabase Password Recovery Setup Guide

This guide explains how to configure password recovery functionality in your Supabase project for the Finance Tracker application.

## Prerequisites

- A Supabase project
- Email service configured in Supabase
- Environment variables set up in your application

## Step 1: Configure Email Settings

### 1.1 Enable Email Authentication
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Settings**
3. Ensure **Enable email confirmations** is turned ON
4. Ensure **Enable email change confirmations** is turned ON

### 1.2 Configure Email Templates
1. Go to **Authentication** → **Email Templates**
2. Customize the **Reset Password** template:

```html
<h2>Reset Your Password</h2>
<p>You requested a password reset for your Finance Tracker account.</p>
<p>Click the button below to reset your password:</p>
<a href="{{ .ConfirmationURL }}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
  Reset Password
</a>
<p>This link will expire in 24 hours.</p>
<p>If you didn't request this reset, you can safely ignore this email.</p>
```

### 1.3 Set Email Sender
1. Go to **Authentication** → **Settings**
2. Configure your **Site URL** (e.g., `http://localhost:5173` for development)
3. Set a custom **Sender Name** (e.g., "Finance Tracker")
4. Configure your **Sender Email** (must be verified in Supabase)

## Step 2: Environment Variables

Ensure your `.env` file contains:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Database Configuration

### 3.1 User Table Permissions
Ensure your RLS (Row Level Security) policies allow password reset operations:

```sql
-- Allow users to update their own password
CREATE POLICY "Users can update their own password" ON auth.users
FOR UPDATE USING (auth.uid() = id);

-- Allow password reset operations
CREATE POLICY "Allow password reset" ON auth.users
FOR UPDATE USING (true);
```

### 3.2 Email Verification
Make sure email verification is properly configured:

```sql
-- Enable email verification for new users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Policy for email verification
CREATE POLICY "Allow email verification" ON auth.users
FOR UPDATE USING (auth.uid() = id);
```

## Step 4: Testing Password Recovery

### 4.1 Test the Flow
1. Start your development server: `npm run dev`
2. Go to the login page
3. Click "Forgot your password?"
4. Enter a valid email address
5. Check your email for the reset link
6. Click the link and set a new password

### 4.2 Common Issues

**Email not received:**
- Check spam/junk folder
- Verify email service is configured in Supabase
- Check Supabase logs for email delivery errors

**Reset link not working:**
- Ensure Site URL is correctly configured
- Check that the redirect URL matches your app's URL
- Verify the link hasn't expired (24-hour limit)

**Token validation errors:**
- Check that your Supabase URL and keys are correct
- Ensure the reset link contains valid tokens
- Verify the user account exists

## Step 5: Production Configuration

### 5.1 Update Site URL
For production, update your Site URL in Supabase:
1. Go to **Authentication** → **Settings**
2. Set **Site URL** to your production domain
3. Update your environment variables

### 5.2 Email Service
Consider using a dedicated email service for production:
- **SendGrid** (recommended)
- **Mailgun**
- **Amazon SES**

### 5.3 Security Considerations
- Enable HTTPS in production
- Set up proper CORS policies
- Configure rate limiting for password reset requests
- Monitor failed password reset attempts

## Step 6: Monitoring and Logs

### 6.1 Supabase Logs
Monitor password reset activity:
1. Go to **Logs** in your Supabase dashboard
2. Filter by "auth" events
3. Look for password reset attempts and failures

### 6.2 Application Logs
Add logging to your application for password reset events:

```typescript
// In your auth hook
const resetPassword = async (email: string) => {
  console.log(`Password reset requested for: ${email}`)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  
  if (error) {
    console.error('Password reset error:', error)
  } else {
    console.log('Password reset email sent successfully')
  }
  
  return { error }
}
```

## Troubleshooting

### Email Delivery Issues
1. Check Supabase email service status
2. Verify sender email is confirmed
3. Check email template syntax
4. Review email delivery logs

### Authentication Errors
1. Verify Supabase URL and keys
2. Check RLS policies
3. Ensure user account exists
4. Verify email verification status

### Frontend Issues
1. Check React Router configuration
2. Verify environment variables
3. Test reset link URL format
4. Check browser console for errors

## Security Best Practices

1. **Rate Limiting**: Implement rate limiting for password reset requests
2. **Token Expiration**: Use short-lived reset tokens (24 hours max)
3. **HTTPS**: Always use HTTPS in production
4. **Logging**: Log all password reset attempts
5. **Monitoring**: Set up alerts for suspicious activity
6. **User Notification**: Notify users of password changes via email

## Support

If you encounter issues:
1. Check Supabase documentation
2. Review application logs
3. Test with a fresh user account
4. Contact Supabase support if needed

---

*This guide ensures your Finance Tracker app has a secure and reliable password recovery system.* 