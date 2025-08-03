# Password Reset Troubleshooting Guide

## Error: "access_denied" and "otp_expired"

If you're seeing this error when trying to reset your password:

```
reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
```

## What This Error Means

This error occurs when:
1. **The reset link has expired** (links expire after 24 hours)
2. **The reset link has already been used** (links can only be used once)
3. **The reset link is invalid** (malformed or corrupted URL)

## How to Fix It

### Option 1: Request a New Reset Link
1. Go back to the login page
2. Click "Forgot your password?"
3. Enter your email address again
4. Click "Send Reset Link"
5. Check your email for a fresh reset link

### Option 2: Check Your Email
1. Look for the most recent password reset email
2. Make sure you're using the complete link from the email
3. Don't copy/paste partial URLs
4. Click the link directly from your email client

### Option 3: Clear Browser Cache
1. Clear your browser's cache and cookies
2. Try the reset link again
3. Or try using a different browser

## Prevention Tips

### For Users:
- **Use reset links immediately** - Don't wait too long after receiving the email
- **Click links directly** - Don't copy/paste the URL
- **Check spam folder** - Reset emails might be filtered
- **Use the same email** - Make sure you're using the email you registered with

### For Developers:
- **Test the flow regularly** - Ensure reset links work in your environment
- **Monitor Supabase logs** - Check for email delivery issues
- **Verify email configuration** - Make sure Supabase email service is working
- **Check redirect URLs** - Ensure they match your app's domain

## Technical Details

### Why This Happens:
1. **Token Expiration**: Supabase reset tokens expire after 24 hours
2. **One-time Use**: Each reset link can only be used once
3. **URL Encoding**: Special characters in URLs can cause issues
4. **Browser Issues**: Cached redirects can interfere with the flow

### Error Codes Explained:
- `access_denied`: The reset link is invalid or has been used
- `otp_expired`: The one-time password (reset token) has expired
- `error_description`: Human-readable description of the error

## Testing the Fix

After implementing the fix:

1. **Request a new reset link**
2. **Use the link immediately** (within a few minutes)
3. **Check the browser console** for debug messages
4. **Verify the password change** works correctly

## Common Issues and Solutions

### Issue: "Link not working"
**Solution**: Request a new reset link and use it immediately

### Issue: "Email not received"
**Solution**: 
- Check spam/junk folder
- Verify email address is correct
- Wait a few minutes for delivery

### Issue: "Page shows error immediately"
**Solution**: 
- Clear browser cache
- Try incognito/private browsing mode
- Check if the URL contains error parameters

### Issue: "Password change fails"
**Solution**:
- Ensure password is at least 6 characters
- Make sure both password fields match
- Try a different password

## Getting Help

If you continue to have issues:

1. **Check the browser console** for error messages
2. **Try a different browser** to rule out browser-specific issues
3. **Contact support** with the specific error message
4. **Provide debug information** from the browser console

## Debug Information

When reporting issues, include:
- The complete error URL
- Browser console messages
- Steps taken before the error
- Email client used
- Browser and version

---

*This guide helps resolve the most common password reset issues. The system has been updated to provide better error handling and user feedback.* 