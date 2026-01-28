# Supabase Setup Guide for Shug's Cakes

This guide will help you set up Supabase for your bakery website to enable Google authentication and data persistence.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Project name**: `shugs-cakes` (or your preference)
   - **Database password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing plan**: Free tier is perfect to start
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, click the **Settings** gear icon (bottom left)
2. Click **API** in the left sidebar
3. Find these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")
4. Copy both values - you'll need them next

## Step 3: Set Up Environment Variables

1. In your project root, create a `.env` file (NOT `.env.example`)
2. Add your credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **IMPORTANT**: Add `.env` to your `.gitignore` file (should already be there)
4. Never commit your `.env` file to GitHub!

## Step 4: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click "+ New query"
3. Paste this SQL and click "Run":

```sql
-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  contact_methods JSONB DEFAULT '{}'::jsonb,
  theme TEXT,
  due_date DATE,
  pickup_time TIME,
  servings INTEGER,
  cost DECIMAL(10,2),
  order_type JSONB DEFAULT '{}'::jsonb,
  cake_type JSONB DEFAULT '{}'::jsonb,
  details TEXT,
  design TEXT,
  status TEXT DEFAULT 'pending',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (for non-authenticated users)
CREATE POLICY "Anyone can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Allow admins to view all orders (update admin_user_id with your user ID)
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );

-- Allow admins to update all orders
CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email = 'steve.c.shaffer@gmail.com'
    )
  );
```

4. **IMPORTANT**: Replace `'your-admin-email@gmail.com'` with your actual Google email
5. Run the query

## Step 5: Enable Google OAuth

1. In Supabase dashboard, go to **Authentication** in the left sidebar
2. Click **Providers**
3. Find **Google** in the list and click to expand it
4. Toggle "Enable Sign in with Google" to **ON**

### Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** > **Credentials**
4. Click **"+ CREATE CREDENTIALS"** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: **Shug's Cakes**
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed
   - Save and continue
6. Back to creating OAuth client ID:
   - Application type: **Web application**
   - Name: **Shug's Cakes Website**
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for local development)
     - `https://your-domain.vercel.app` (your production URL)
   - Authorized redirect URIs:
     - `https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback`
     - (Get this URL from Supabase Google provider settings)
7. Click **Create**
8. Copy the **Client ID** and **Client Secret**
9. Go back to Supabase > Authentication > Providers > Google
10. Paste **Client ID** and **Client Secret**
11. Click **Save**

## Step 6: Update Vercel Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add these variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Save**
6. Redeploy your app (Vercel > Deployments > ... > Redeploy)

## Step 7: Test Everything

### Local Testing:

1. Run `npm install` to install Supabase dependency
2. Run `npm run dev`
3. Click "Sign in with Google" in header
4. Complete Google sign-in flow
5. You should be redirected back logged in
6. Fill out order form and submit
7. Check Supabase dashboard > Table Editor > orders table

### Production Testing:

1. Visit your Vercel deployment
2. Test Google sign-in
3. Submit test order
4. Verify in Supabase

## Step 8: Set Up Promotions Table

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click "+ New query"
3. Copy the SQL from `supabase-migrations/02-promotions-table.sql` in your project
4. **IMPORTANT**: Replace `'your-admin-email@gmail.com'` with your actual Google email (same as in Step 4)
5. Run the query

## Step 9: Update Admin Email in Code

1. Open `src/lib/adminCheck.js` in your code editor
2. Replace `'your-admin-email@gmail.com'` with your actual Google email
3. Save the file
4. This controls who can access the admin panel

## Step 10: Access Admin Dashboard

1. Sign in with Google using your admin email (from the main site header)
2. Go to `/admin/login`
3. Click "Sign in with Google"
4. You will be redirected to the admin dashboard if your email is authorized
5. Non-admin users will see an "Access Denied" message

## Database Schema

### Orders Table:
- `id` - UUID primary key
- `created_at` - Timestamp
- `user_id` - UUID (links to Google auth user)
- `customer_name` - Text
- `customer_email` - Text
- `customer_phone` - Text
- `contact_methods` - JSON (email, facebook, wix)
- `theme` - Text
- `due_date` - Date
- `pickup_time` - Time
- `servings` - Integer
- `cost` - Decimal
- `order_type` - JSON (cake, cupcake, cookies, desserts)
- `cake_type` - JSON (sheet, round, tiered, etc.)
- `details` - Text
- `design` - Text
- `status` - Text (pending, in-progress, completed, cancelled)
- `updated_at` - Timestamp

### Promotions Table:
- `id` - UUID primary key
- `created_at` - Timestamp
- `title` - Text (promotion name)
- `code` - Text (unique promo code)
- `discount_type` - Text (percentage or fixed)
- `discount_value` - Decimal (percentage value or dollar amount)
- `description` - Text
- `valid_from` - Date
- `valid_until` - Date
- `active` - Boolean
- `max_uses` - Integer (optional usage limit)
- `current_uses` - Integer (tracks current usage)
- `updated_at` - Timestamp

## Troubleshooting

### "Invalid API key" error:
- Check that `.env` file exists in project root
- Verify env variables don't have quotes or extra spaces
- Restart dev server after adding env variables

### Google sign-in not working:
- Verify authorized redirect URIs in Google Cloud Console
- Check that Google provider is enabled in Supabase
- Ensure Client ID and Secret are correctly entered

### Orders not saving:
- Check browser console for errors
- Verify table exists in Supabase
- Check RLS policies are set up correctly
- Make sure `VITE_` prefix is in env variable names

### "relation orders does not exist":
- Run the SQL script in Step 4
- Refresh the Table Editor page

## Security Notes

- ✅ Never commit `.env` file
- ✅ Use environment variables on Vercel
- ✅ RLS (Row Level Security) is enabled
- ✅ Users can only see their own orders
- ✅ Only admins can see all orders and manage data
- ✅ Admin authentication uses Google OAuth
- ⚠️  Update admin email in both RLS policies and `src/lib/adminCheck.js`
- ⚠️  Keep your admin email private and secure

## Features Implemented

- ✅ Google OAuth authentication for customers
- ✅ Google OAuth authentication for admin panel
- ✅ Order form with Supabase integration
- ✅ Customer order history page (`/my-orders`)
- ✅ Admin dashboard with real-time stats
- ✅ Orders management with status updates
- ✅ Customers management (aggregated from orders)
- ✅ Promotions management (create, edit, deactivate)
- ✅ Row Level Security for data protection

## Next Steps

- [ ] Add email notifications for new orders
- [ ] Implement promotional code validation in order form
- [ ] Add image upload for gallery (Supabase Storage)
- [ ] Set up automated backups
- [ ] Integrate Stripe for payments
- [ ] Add email notifications for order status changes
- [ ] Implement order export (CSV/PDF)

## Support

If you need help:
1. Check [Supabase Documentation](https://supabase.com/docs)
2. Visit [Supabase Discord](https://discord.supabase.com)
3. Check application logs in browser console
