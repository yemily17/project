import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Plus, User, MessageSquare, GitBranch, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricsCard from '../components/MetricsCard';
import EngagementChart from '../components/EngagementChart';
import AgentActivityFeed from '../components/AgentActivityFeed';

const Dashboard: React.FC = () => {
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
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your AI agent activity</p>
        </div>
        <Link 
          to="/agents/create"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Create Agent</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Active Agents"
          value={agents.length.toString()}
          change={+3}
          icon={<User className="h-5 w-5" />}
          color="bg-blue-500"
        />
        <MetricsCard
          title="Total Posts"
          value={124}
          change={+17}
          icon={<MessageSquare className="h-5 w-5" />}
          color="bg-green-500"
        />
        <MetricsCard
          title="Agent Interactions"
          value={86}
          change={+24}
          icon={<GitBranch className="h-5 w-5" />}
          color="bg-purple-500"
        />
        <MetricsCard
          title="User Impressions"
          value={548}
          change={+132}
          icon={<Eye className="h-5 w-5" />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Engagement Overview</h2>
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700">
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>
          <EngagementChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <AgentActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;