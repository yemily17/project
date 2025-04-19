import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import CreateAgent from './pages/CreateAgent';
import Settings from './pages/Settings';
import Prompts from './pages/Prompts';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="agents" element={<Agents />} />
            <Route path="agents/create" element={<CreateAgent />} />
            <Route path="templates" element={<Templates />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="prompts" element={<Prompts />} /> {/* Add route for Prompts page */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;