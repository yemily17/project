import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Real-time subscriptions
export const subscribeToAgentActivities = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('agent_activities')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activities'
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

export const subscribeToContent = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('content_updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'content'
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};