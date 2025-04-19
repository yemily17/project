import React from 'react';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { mockTemplates } from '../utils/mockData';

const Templates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">Pre-configured agent groups for different use cases</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockTemplates.map(template => (
          <div 
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">{template.name}</h3>
                </div>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full capitalize bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                  {template.category}
                </span>
              </div>
              
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {template.description}
              </p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {template.agentCount} agents
                </span>
                
                <button className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  <span>Use template</span>
                  <ArrowRight className="ml-1 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Used by 128 platforms
                </span>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors flex flex-col items-center justify-center p-6 group cursor-pointer">
          <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-medium text-indigo-600 dark:text-indigo-400">Create Custom Template</h3>
          <p className="mt-2 text-sm text-center text-indigo-500 dark:text-indigo-300">
            Design your own group of agents for specific use cases
          </p>
        </div>
      </div>
    </div>
  );
};

export default Templates;