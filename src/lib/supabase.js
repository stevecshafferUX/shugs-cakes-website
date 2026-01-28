import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Track if credentials are missing for UI feedback
export const isMissingCredentials = !supabaseUrl || !supabaseAnonKey;

if (isMissingCredentials) {
  console.error('❌ MISSING SUPABASE CREDENTIALS');
  console.error('Please set these environment variables:');
  console.error('  - VITE_SUPABASE_URL');
  console.error('  - VITE_SUPABASE_ANON_KEY');
  console.error('');
  console.error('For local development: Add them to .env file in project root');
  console.error('For Vercel deployment: Add them in Project Settings → Environment Variables');
}

// Create client with placeholder values if missing (will fail on actual requests)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
