import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if real credentials are configured (not placeholders)
const isPlaceholder = (val) =>
  !val || val.includes('your-') || val.includes('placeholder') || val === '';

export const isMissingCredentials = isPlaceholder(supabaseUrl) || isPlaceholder(supabaseAnonKey);
export const isSupabaseConfigured = !isMissingCredentials;

if (isMissingCredentials) {
  console.warn('⚠️ Supabase not configured — running in static mode (public pages only).');
  console.warn('To enable orders, admin, and auth, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

// Create client with placeholder values if missing (will fail on actual requests)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
