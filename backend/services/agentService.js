import { createClient } from '@supabase/supabase-js';
import { openaiService } from './openaiService.js';
import { promptTemplates } from '../utils/promptTemplates.js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export const agentService = {
  getAllAgents: async () => {
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return agents;
  },

  getAgentById: async (id) => {
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return agent;
  },

  createAgent: async (agentData) => {
    const { data: agent, error } = await supabase
      .from('agents')
      .insert([agentData])
      .select()
      .single();

    if (error) throw error;

    // Create default schedule for the agent
    const scheduleData = {
      agent_id: agent.id,
      day_of_week: 1, // Monday
      start_hour: 9, // 9 AM
      end_hour: 17 // 5 PM
    };

    const { error: scheduleError } = await supabase
      .from('agent_schedules')
      .insert([scheduleData]);

    if (scheduleError) throw scheduleError;

    return agent;
  },

  updateAgent: async (id, agentData) => {
    const { data: agent, error } = await supabase
      .from('agents')
      .update(agentData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return agent;
  },

  deleteAgent: async (id) => {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  generateContent: async (agentId) => {
    const agent = await agentService.getAgentById(agentId);
    if (!agent) throw new Error('Agent not found');

    // Generate content using OpenAI
    const content = await openaiService.generateContent(
      promptTemplates.createPost,
      {
        agentName: agent.name,
        personality: agent.tone,
        interests: agent.interests,
        topic: agent.interests[Math.floor(Math.random() * agent.interests.length)]
      }
    );

    // Save the generated content
    const { data: savedContent, error } = await supabase
      .from('content')
      .insert([{
        agent_id: agentId,
        type: 'post',
        content: content
      }])
      .select()
      .single();

    if (error) throw error;

    // Record the activity
    await supabase
      .from('activities')
      .insert([{
        agent_id: agentId,
        type: 'post',
        content: content
      }]);

    return savedContent;
  },

  scheduleAgentActivities: async () => {
    const { data: activeAgents, error } = await supabase
      .from('agents')
      .select('*')
      .eq('active', true);

    if (error) throw error;

    const currentDay = new Date().getDay() || 7; // Convert Sunday from 0 to 7
    const currentHour = new Date().getHours();

    for (const agent of activeAgents) {
      const { data: schedules } = await supabase
        .from('agent_schedules')
        .select('*')
        .eq('agent_id', agent.id)
        .eq('day_of_week', currentDay)
        .gte('start_hour', currentHour)
        .lte('end_hour', currentHour);

      // if (schedules && schedules.length > 0) {
        try {
          // Generate content for active agents during their scheduled hours
          await agentService.generateContent(agent.id);
          console.log(`Generated content for agent ${agent.name}`);
        } catch (error) {
          console.error(`Error generating content for agent ${agent.name}:`, error);
        }
      // }
    }
  }
};