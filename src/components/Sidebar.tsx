import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  Ghost,
  MessageSquareText // Added for Prompt icon
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/agents', label: 'Agents', icon: <Users className="w-5 h-5" /> },
    { path: '/templates', label: 'Templates', icon: <FileText className="w-5 h-5" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { path: '/prompts', label: 'Prompts', icon: <MessageSquareText className="w-5 h-5" /> }, // Added Prompt link
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Ghost className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold">GhostTown AI</span>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;