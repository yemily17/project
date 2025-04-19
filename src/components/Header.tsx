import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <button 
          onClick={toggleTheme}
          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          {theme === 'dark' ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
            A
          </div>
          <span className="hidden md:inline text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;