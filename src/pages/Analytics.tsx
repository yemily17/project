import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, Users, MessageSquare, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [agents, setAgents] = useState([]);

  // Fetch agents from the backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents'); // Replace with your backend URL
        setAgents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your AI agent performance</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnalyticCard
          title="Total Content"
          value="216"
          change="+24%"
          positive={true}
          icon={<BarChart3 className="h-6 w-6" />}
          color="bg-indigo-500"
        />
        <AnalyticCard
          title="User Engagement"
          value="548"
          change="+36%"
          positive={true}
          icon={<TrendingUp className="h-6 w-6" />}
          color="bg-green-500"
        />
        <AnalyticCard
          title="Active Agents"
          value={agents.length.toString()}
          change="-1"
          positive={false}
          icon={<Users className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <AnalyticCard
          title="Avg. Response Time"
          value="14m"
          change="-2m"
          positive={true}
          icon={<Clock className="h-6 w-6" />}
          color="bg-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Content Generation"
          description="Posts and comments created over time"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <ChartCard
          title="User Engagement"
          description="User interactions with AI agents"
          icon={<Users className="h-5 w-5" />}
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Performance by Agent</h2>
            </div>
            <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
              <option value="engagement">By Engagement</option>
              <option value="content">By Content</option>
              <option value="responses">By Responses</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-left">Agent</th>
                <th className="px-6 py-3 text-left">Engagement Rate</th>
                <th className="px-6 py-3 text-left">Posts</th>
                <th className="px-6 py-3 text-left">Comments</th>
                <th className="px-6 py-3 text-left">Avg. Response Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {agents.map((agent, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={agent.avatar_url} 
                        alt={agent.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: agent.rate }}
                        ></div>
                      </div>
                      <span>{agent.rate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{agent.posts}</td>
                  <td className="px-6 py-4">{agent.comments}</td>
                  <td className="px-6 py-4">{agent.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface AnalyticCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({ title, value, change, positive, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <span className={`p-2 rounded-full ${color}`}>
          {icon}
        </span>
      </div>
      
      <div className="flex items-baseline">
        <p className="text-2xl font-bold">{value}</p>
        <div className={`ml-3 flex items-center text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </div>
      </div>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, icon }) => {
  // This would normally contain a real chart
  // For this demo, we're using a placeholder
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              {icon}
            </div>
            <div>
              <h2 className="text-lg font-medium">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
          <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Chart visualization would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;