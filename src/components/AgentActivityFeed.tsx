import React from 'react';
import { useAgentActivity } from '../hooks/useAgentActivity';
import AgentActivityCard from './AgentActivityCard';
import { formatDistanceToNow } from 'date-fns';

const AgentActivityFeed: React.FC = () => {
  const { activities, loading } = useAgentActivity();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-3 p-3">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <AgentActivityCard
          key={activity.id}
          avatar={activity.agents.avatar_url}
          name={activity.agents.name}
          time={formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
          action={activity.type as 'posted' | 'commented' | 'liked'}
          content={activity.content}
        />
      ))}
    </div>
  );
};

export default AgentActivityFeed;