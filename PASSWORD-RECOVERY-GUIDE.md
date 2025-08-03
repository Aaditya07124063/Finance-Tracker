# Password Recovery Guide for Finance Tracker

## Overview
The Finance Tracker app uses Supabase for authentication and provides a secure password recovery system. If you forget your password, you can easily reset it using your email address.

## How to Reset Your Password

### Step 1: Access the Password Reset
1. Go to the Finance Tracker login page
2. Click on the "Forgot your password?" link below the sign-in form
3. You'll be taken to the password reset form

### Step 2: Enter Your Email
1. Enter the email address associated with your account
2. Click "Send Reset Link"
3. You'll see a success message: "Password reset email sent! Check your inbox."

### Step 3: Check Your Email
1. Open your email inbox
2. Look for an email from Supabase with the subject "Reset your password"
3. The email will contain a secure link to reset your password

### Step 4: Reset Your Password
1. Click the reset link in the email
2. You'll be redirected to the password reset page
3. Enter your new password (minimum 6 characters)
4. Confirm your new password
5. Click "Update Password"

### Step 5: Success
1. You'll see a success message: "Password Updated!"
2. You'll be automatically redirected to the dashboard
3. You can now sign in with your new password

## Important Notes

### Security Features
- Reset links expire after 24 hours for security
- Each reset link can only be used once
- Passwords must be at least 6 characters long
- The system validates that both password fields match

### If You Don't Receive the Email
1. Check your spam/junk folder
2. Make sure you entered the correct email address
3. Wait a few minutes - emails may take time to arrive
4. Try requesting a new reset link

### If the Reset Link Doesn't Work
1. The link may have expired (24-hour limit)
2. The link may have already been used
3. Request a new password reset link
4. Make sure you're using the complete link from the email

## Troubleshooting

### Common Issues

**"Invalid or expired reset link"**
- The link has expired or been used already
- Request a new password reset

**"Invalid reset link"**
- The link format is incorrect
- Make sure you copied the entire link from the email

**"Passwords do not match"**
- Make sure both password fields contain the same password
- Check for extra spaces or typos

**"Password must be at least 6 characters long"**
- Your new password is too short
- Choose a longer password

### Getting Help

If you continue to have issues with password recovery:

1. **Double-check your email address** - Make sure you're using the same email you used to create your account

2. **Clear your browser cache** - Sometimes cached data can interfere with the reset process

3. **Try a different browser** - Some browser extensions can interfere with the reset process

4. **Contact Support** - If all else fails, contact the application administrator

## Security Best Practices

### Creating a Strong Password
- Use at least 8 characters
- Include a mix of uppercase and lowercase letters
- Include numbers and special characters
- Avoid common words or phrases
- Don't use personal information (birthday, name, etc.)

### Protecting Your Account
- Never share your password with anyone
- Use a unique password for this app
- Consider using a password manager
- Enable two-factor authentication if available
- Regularly update your password

## Technical Details

### How It Works
1. When you request a password reset, Supabase sends a secure token to your email
2. The token is embedded in the reset link
3. When you click the link, the app validates the token
4. If valid, you can set a new password
5. The old password is immediately invalidated

### Email Configuration
The password reset emails are sent through Supabase's secure email service. The emails include:
- A secure, time-limited reset link
- Clear instructions on how to proceed
- Security warnings about link sharing

### Privacy
- Your email address is only used for password recovery
- Reset links are encrypted and secure
- No personal data is stored in the reset process
- All reset attempts are logged for security purposes

## Support

If you need additional help with password recovery, please contact the application administrator with:
- Your email address
- A description of the issue you're experiencing
- Any error messages you see
- The steps you've already tried

---

*This guide is designed to help you recover your password securely and efficiently. The Finance Tracker app prioritizes your security and privacy.* 