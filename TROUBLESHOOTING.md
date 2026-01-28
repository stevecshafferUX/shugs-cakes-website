# Troubleshooting Guide - Shug's Cakes Website

## White Screen / Blank Page Issues

If you're seeing a blank white screen when visiting the deployed site, follow these steps:

### 1. Check Browser Console for Errors

1. Open your deployed site in a browser
2. Press `F12` or right-click → "Inspect" to open Developer Tools
3. Click the "Console" tab
4. Look for error messages (red text)

Common errors and solutions:

#### "Supabase credentials are required"
**Problem:** Environment variables are not set in Vercel
**Solution:** See "Set Environment Variables in Vercel" below

#### "Failed to fetch" or network errors
**Problem:** Supabase credentials are incorrect or Supabase project is not accessible
**Solution:** Verify your Supabase URL and anon key are correct

#### Import errors or "Cannot find module"
**Problem:** Missing npm dependencies
**Solution:** Run `npm install` locally and commit package-lock.json

---

### 2. Set Environment Variables in Vercel

**CRITICAL:** Your app requires these environment variables to work:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project (`shugs-cakes-website`)
3. Go to **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. Add these two variables:

   | Variable Name | Value | Where to Find It |
   |--------------|-------|------------------|
   | `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Dashboard → Project Settings → API → Project URL |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...long string` | Supabase Dashboard → Project Settings → API → anon public key |

6. For each variable:
   - Click "Add New"
   - Enter the variable name (e.g., `VITE_SUPABASE_URL`)
   - Paste the value
   - Select environment: **Production**, **Preview**, and **Development** (check all three)
   - Click "Save"

7. **IMPORTANT:** After adding variables, you MUST redeploy:
   - Go to **Deployments** tab
   - Find the latest deployment
   - Click the three dots `...` → **Redeploy**
   - Click "Redeploy" to confirm

---

### 3. Verify Supabase Project is Set Up

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Check **Table Editor** → Verify these tables exist:
   - `orders`
   - `promotions`
   - (others are optional for now)

If tables don't exist:
- Go to **SQL Editor**
- Run the migration scripts from `supabase-migrations/` folder in order
- Start with `01-orders-table.sql` and `02-promotions-table.sql`

---

### 4. Check Vercel Build Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click on the latest deployment
4. Scroll down to **Build Logs**
5. Look for errors in red

Common build issues:
- Missing dependencies → Run `npm install` locally
- Linting errors → Fix the code or update `.eslintrc`
- Import errors → Check file paths and imports

---

### 5. Test Locally First

Before debugging Vercel, make sure the app works locally:

1. Create `.env` file in project root with:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Run the development server:
   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:5173 in your browser
4. Check if the site loads properly
5. Check browser console for errors (F12)

If it works locally but not on Vercel:
- **→ Problem is definitely environment variables in Vercel**
- **→ Follow Step 2 above**

---

## Common Error Messages

### "Failed to construct URL"
**Cause:** `VITE_SUPABASE_URL` is not set or is empty
**Fix:** Set environment variable in Vercel (see Step 2)

### "Invalid API key"
**Cause:** `VITE_SUPABASE_ANON_KEY` is not set, empty, or incorrect
**Fix:** Verify the anon key in Supabase Dashboard → Settings → API

### "relation 'orders' does not exist"
**Cause:** Database tables haven't been created
**Fix:** Run SQL migrations in Supabase SQL Editor (see Step 3)

### "Access Denied" after logging in
**Cause:** Your Google email is not set as admin
**Fix:** Verify `steve.c.shaffer@gmail.com` is in:
- `src/lib/adminCheck.js` (line 16)
- All RLS policies in Supabase (use `99-update-admin-email.sql` if needed)

---

## Quick Checklist

Use this checklist to diagnose issues:

- [ ] Vercel environment variables are set (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- [ ] Redeployed after setting environment variables
- [ ] Supabase project is active and accessible
- [ ] Database tables exist (at minimum: `orders` and `promotions`)
- [ ] Admin email is set to `steve.c.shaffer@gmail.com` in code
- [ ] Build succeeds without errors
- [ ] Browser console shows no errors (or shows specific error to debug)
- [ ] Site works locally with `.env` file

---

## Getting Your Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click on your project
3. Click the **Settings** gear icon (bottom left)
4. Click **API** in the left sidebar
5. Copy these values:
   - **Project URL** → This is your `VITE_SUPABASE_URL`
   - **anon public** key → This is your `VITE_SUPABASE_ANON_KEY`

**IMPORTANT:**
- Never commit these values to GitHub
- Use `.env` file locally (already in `.gitignore`)
- Set them as environment variables in Vercel

---

## Still Having Issues?

1. **Check Browser Console** - This will show the actual error
2. **Check Vercel Deployment Logs** - Shows build-time errors
3. **Verify Environment Variables** - Most common cause of white screen
4. **Test Locally** - Helps isolate if it's a deployment vs code issue

The most common issue is **missing environment variables in Vercel**. Make sure you've followed Step 2 completely, including the redeploy step.
