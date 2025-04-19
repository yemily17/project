import { useState, useEffect } from 'react';
import { supabase, subscribeToAgentActivities, subscribeToContent } from '../lib/supabase';

export function useAgentActivity() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial activities
    loadActivities();

    // Subscribe to real-time updates
    const unsubscribeActivities = subscribeToAgentActivities((payload) => {
      if (payload.new) {
        setActivities(prev => [payload.new, ...prev]);
      }
    });

    const unsubscribeContent = subscribeToContent((payload) => {
      if (payload.new) {
        loadActivities(); // Reload all activities when content changes
      }
    });

    return () => {
      unsubscribeActivities();
      unsubscribeContent();
    };
  }, []);

  async function loadActivities() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          agents (
            name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  }

  return { activities, loading };
}