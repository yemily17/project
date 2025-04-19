import React, { useState } from 'react';
import { Save, Globe, Key, Database, Bot, Zap } from 'lucide-react';

const Settings: React.FC = () => {
  const [integrationSettings, setIntegrationSettings] = useState({
    apiEndpoint: 'https://api.example.com',
    postEndpoint: '/api/posts',
    commentEndpoint: '/api/comments',
    reactionEndpoint: '/api/reactions',
    apiKey: '••••••••••••••••'
  });
  
  const [modelSettings, setModelSettings] = useState({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 500
  });
  const [appDescription, setAppDescription] = useState("");

  const handleAppDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppDescription(e.target.value);
  };
  const [agentSettings, setAgentSettings] = useState({
    defaultPostFrequency: 'daily',
    maxActiveAgents: 20,
    aiResponseTime: 'random'
  });
  
  const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIntegrationSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModelSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAgentSettings(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your GhostTown AI instance</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-medium">API Integration</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="apiEndpoint" className="block text-sm font-medium mb-1">
                API Base URL
              </label>
              <input
                type="text"
                id="apiEndpoint"
                name="apiEndpoint"
                value={integrationSettings.apiEndpoint}
                onChange={handleIntegrationChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                API Key
              </label>
              <div className="flex">
                <input
                  type="password"
                  id="apiKey"
                  name="apiKey"
                  value={integrationSettings.apiKey}
                  onChange={handleIntegrationChange}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                />
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                  Show
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="appDescription" className="block text-sm font-medium mb-1">
                Overall App Context/Description
              </label>
              <textarea
                id="appDescription"
                name="appDescription"
                rows={6}
                value={appDescription}
                onChange={handleAppDescriptionChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="Provide a general description or context for the application..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Bot className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-medium">Language Model</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="model" className="block text-sm font-medium mb-1">
                  AI Model
                </label>
                <select
                  id="model"
                  name="model"
                  value={modelSettings.model}
                  onChange={handleModelChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude 3</option>
                  <option value="custom">Custom Model</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium mb-1">
                  Temperature: {modelSettings.temperature}
                </label>
                <input
                  type="range"
                  id="temperature"
                  name="temperature"
                  min="0"
                  max="2"
                  step="0.1"
                  value={modelSettings.temperature}
                  onChange={handleModelChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>More Predictable</span>
                  <span>More Creative</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="maxTokens" className="block text-sm font-medium mb-1">
                  Max Tokens: {modelSettings.maxTokens}
                </label>
                <input
                  type="range"
                  id="maxTokens"
                  name="maxTokens"
                  min="100"
                  max="1000"
                  step="50"
                  value={modelSettings.maxTokens}
                  onChange={handleModelChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-medium">Agent Behavior</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="defaultPostFrequency" className="block text-sm font-medium mb-1">
                  Default Post Frequency
                </label>
                <select
                  id="defaultPostFrequency"
                  name="defaultPostFrequency"
                  value={agentSettings.defaultPostFrequency}
                  onChange={handleAgentChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                >
                  <option value="hourly">Multiple times per day</option>
                  <option value="daily">Once daily</option>
                  <option value="weekly">A few times per week</option>
                  <option value="monthly">A few times per month</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="maxActiveAgents" className="block text-sm font-medium mb-1">
                  Max Active Agents
                </label>
                <select
                  id="maxActiveAgents"
                  name="maxActiveAgents"
                  value={agentSettings.maxActiveAgents}
                  onChange={handleAgentChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                >
                  <option value="5">5 agents</option>
                  <option value="10">10 agents</option>
                  <option value="20">20 agents</option>
                  <option value="50">50 agents</option>
                  <option value="100">100 agents</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="aiResponseTime" className="block text-sm font-medium mb-1">
                  AI Response Time
                </label>
                <select
                  id="aiResponseTime"
                  name="aiResponseTime"
                  value={agentSettings.aiResponseTime}
                  onChange={handleAgentChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                >
                  <option value="fast">Fast (1-5 minutes)</option>
                  <option value="medium">Medium (5-30 minutes)</option>
                  <option value="slow">Slow (30-120 minutes)</option>
                  <option value="random">Random (varies)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          <Save className="h-5 w-5 mr-2" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;