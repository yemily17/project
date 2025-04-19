import express from 'express';
import { integrationService } from '../services/integrationService.js';

const router = express.Router();

// Save platform integration configuration
router.post('/config', async (req, res) => {
  try {
    const config = await integrationService.savePlatformConfig(req.body);
    res.status(201).json(config);
  } catch (error) {
    console.error('Error saving integration config:', error);
    res.status(500).json({ error: 'Failed to save integration configuration' });
  }
});

// Get platform integration configuration
router.get('/config/:id', async (req, res) => {
  try {
    const config = await integrationService.getPlatformConfig(req.params.id);
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }
    res.json(config);
  } catch (error) {
    console.error('Error getting integration config:', error);
    res.status(500).json({ error: 'Failed to fetch integration configuration' });
  }
});

// Test platform connection
router.post('/test', async (req, res) => {
  try {
    const { apiEndpoint, apiKey } = req.body;
    
    const connectionResult = await integrationService.testConnection(apiEndpoint, apiKey);
    
    res.json(connectionResult);
  } catch (error) {
    console.error('Error testing connection:', error);
    res.status(500).json({ error: 'Failed to test connection' });
  }
});

// Submit content to the platform
router.post('/submit', async (req, res) => {
  try {
    const { platformId, contentType, content } = req.body;
    
    // Validate request
    if (!platformId || !contentType || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Submit the content to the target platform
    const result = await integrationService.submitContent(platformId, contentType, content);
    
    res.json(result);
  } catch (error) {
    console.error('Error submitting content:', error);
    res.status(500).json({ error: 'Failed to submit content to platform' });
  }
});

export const integrationController = router;