# Admin User Setup Guide

## Overview

The application now uses Supabase Authentication for admin access instead of hardcoded credentials. This provides better security and proper session management.

## Setup Steps

### 1. Create an Admin User

You need to create an admin user account in Supabase:

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to Authentication > Users
3. Click "Invite User" or "Add User"
4. Enter the admin email address (e.g., `steve.c.shaffer@gmail.com`)
5. Set a secure password
6. Click "Create User"

### 2. Configure Admin Email List

Add the admin email to your environment variables:

1. Open the `.env` file in your project root
2. Update the `VITE_ADMIN_EMAILS` variable:
   ```env
   VITE_ADMIN_EMAILS=steve.c.shaffer@gmail.com,another@admin.com
   ```
3. You can add multiple admin emails separated by commas

### 3. (Optional) Set Admin Role in User Metadata

For better admin management, you can set the admin role directly in user metadata:

1. In Supabase Dashboard, go to Authentication > Users
2. Click on the admin user
3. Scroll to "User Metadata" section
4. Click "Edit" and add:
   ```json
   {
     "role": "admin",
     "full_name": "Administrator"
   }
   ```
5. Save changes

## Logging In as Admin

1. Navigate to `/admin/login`
2. Enter your admin email and password
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

## Security Notes

- **Never commit the `.env` file** - It's already in `.gitignore`
- Admin credentials are now managed through Supabase Auth
- Sessions are stored securely using Supabase tokens
- Admin status is checked both client-side and should be enforced with Row Level Security policies

## Migration from Old System

If you were using the old hardcoded credentials:
- Old username: `admin`
- Old password: `admin`

These no longer work. You must create a proper Supabase user account as described above.

## Troubleshooting

### "Invalid credentials" error
- Ensure the user account exists in Supabase
- Check that the email matches what's in `VITE_ADMIN_EMAILS`
- Verify the password is correct

### Not redirected to admin dashboard
- Check browser console for errors
- Verify the user email is in `VITE_ADMIN_EMAILS` in `.env`
- Restart the dev server after changing `.env` file

### Can't access admin pages
- Make sure you're signed in with an admin account
- Check that the email is in the admin list
- Clear browser cache and cookies, then try again
