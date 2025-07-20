import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'techmaze-web'
    }
  },
  db: {
    schema: 'public'
  },
  // Add proper error handling for fetch operations
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...options?.headers,
        'Accept': 'application/json',
      }
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred while fetching data');
      }
      return response;
    }).catch((error) => {
      console.error('Supabase fetch error:', error);
      throw error;
    });
  }
});

// Verify connection with better error handling
const verifyConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('Supabase connection established successfully');
  } catch (error) {
    console.error('Supabase connection error:', error);
    // Re-throw the error to be handled by the application
    throw new Error('Failed to connect to Supabase. Please check your configuration and network connection.');
  }
};

verifyConnection();

export const isSupabaseConfigured = true;