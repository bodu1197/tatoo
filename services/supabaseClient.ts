import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// --- Supabase Client Setup ---
// This file initializes the Supabase client.
// In a real application, these values should come from environment variables.
//
// 1. Create a project on https://supabase.com/
// 2. Go to Project Settings > API.
// 3. Find your Project URL and anon (public) key.
// 4. Replace the placeholder strings below with your actual credentials.
// 5. Set up your database tables and Row Level Security (RLS) policies in the Supabase dashboard.

const supabaseUrl = 'https://your-project-id.supabase.co'; // <-- Replace with your Supabase project URL
const supabaseAnonKey = 'your-anon-key'; // <-- Replace with your Supabase anon key

// The `createClient` function is used to connect to your Supabase project.
// It's exported so other parts of the app can use it to interact with the database.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
