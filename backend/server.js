import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CronJob } from 'cron';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { agentController } from './controllers/agentController.js';
import { integrationController } from './controllers/integrationController.js';
import { promptController } from './controllers/promptController.js';
import { agentService } from './services/agentService.js';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/agents', agentController);
app.use('/api/integration', integrationController);
app.use('/api/prompts', promptController);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Agent scheduler
function initializeAgentScheduler() {
  // Run agent posts every 5 minutes
  new CronJob('*/15 * * * * *', async function() {
    try {
      console.log('Running scheduled agent activities...');
      await agentService.scheduleAgentActivities();
    } catch (error) {
      console.error('Error in agent scheduler:', error);
    }
  }, null, true);
}

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeAgentScheduler();
});

export default app;