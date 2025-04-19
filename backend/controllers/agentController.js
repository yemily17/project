import express from 'express';
import { agentService } from '../services/agentService.js';

const router = express.Router();

// Get all agents
router.get('/', async (req, res) => {
  try {
    const agents = await agentService.getAllAgents();
    res.json(agents);
  } catch (error) {
    console.error('Error getting agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Get single agent
router.get('/:id', async (req, res) => {
  try {
    const agent = await agentService.getAgentById(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    console.error('Error getting agent:', error);
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
});

// Create agent
router.post('/', async (req, res) => {
  try {
    const newAgent = await agentService.createAgent(req.body);
    res.status(201).json(newAgent);
  } catch (error) {
    console.error('Error creating agent:', error);
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

// Update agent
router.put('/:id', async (req, res) => {
  try {
    const updatedAgent = await agentService.updateAgent(req.params.id, req.body);
    if (!updatedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json(updatedAgent);
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ error: 'Failed to update agent' });
  }
});

// Delete agent
router.delete('/:id', async (req, res) => {
  try {
    const success = await agentService.deleteAgent(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ error: 'Failed to delete agent' });
  }
});

// Toggle agent status (active/inactive)
router.patch('/:id/status', async (req, res) => {
  try {
    const { active } = req.body;
    
    if (typeof active !== 'boolean') {
      return res.status(400).json({ error: 'Active status must be a boolean' });
    }
    
    const updatedAgent = await agentService.updateAgentStatus(req.params.id, active);
    
    if (!updatedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    res.json(updatedAgent);
  } catch (error) {
    console.error('Error updating agent status:', error);
    res.status(500).json({ error: 'Failed to update agent status' });
  }
});

// Get agent activity
router.get('/:id/activity', async (req, res) => {
  try {
    const activity = await agentService.getAgentActivity(req.params.id);
    res.json(activity);
  } catch (error) {
    console.error('Error getting agent activity:', error);
    res.status(500).json({ error: 'Failed to fetch agent activity' });
  }
});

export const agentController = router;