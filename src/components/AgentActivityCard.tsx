import React from 'react';

interface AgentActivityCardProps {
  avatar: string;
  name: string;
  time: string;
  action: 'posted' | 'commented' | 'liked';
  content: string;
}

const AgentActivityCard: React.FC<AgentActivityCardProps> = ({ 
  avatar, 
  name, 
  time, 
  action, 
  content 
}) => {
  return (
    <div className="flex space-x-3 p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <img 
        src={avatar} 
        alt={name} 
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="flex items-baseline space-x-1">
          <h4 className="font-medium">{name}</h4>
          <span className="text-gray-500 dark:text-gray-400 text-sm">{time}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">{action}</span> {content}
        </p>
      </div>
    </div>
  );
};

export default AgentActivityCard;