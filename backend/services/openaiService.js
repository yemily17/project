import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
console.log(process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const openaiService = {
  generateContent: async (promptTemplate, variables) => {
    try {
      // In a real implementation, this would call the OpenAI API
      // For the MVP, we'll simulate a response
      
      console.log('Generating content with prompt template:', promptTemplate);
      console.log('Variables:', variables);
      const filledTemplate = promptTemplate.replace(/{{(.*?)}}/g, (_, key) => variables[key] || '');
      // Simulate a short delay for API response
      console.log("TEMPLATE IS "+promptTemplate);
      // Mock response based on prompt type
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: filledTemplate,
      });
      console.log(response.text);
      return response.text;
    } catch (error) {
      console.error('OpenAI content generation failed:', error);
      throw new Error('Failed to generate content: ' + (error.message || 'Unknown error'));
    }
  },
  
  generatePersona: async (template) => {
    try {
      // In a real implementation, this would call the OpenAI API
      // For the MVP, we'll return mock data
      
      console.log('Generating persona based on template:', template);
      
      // Simulate a short delay for API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        name: 'Alex Thompson',
        role: 'Product Enthusiast',
        bio: 'Tech enthusiast with a passion for innovative products. Always looking for the next big thing that will change how we interact with technology.',
        tone: 'enthusiastic',
        interests: ['technology', 'gadgets', 'productivity', 'design']
      };
    } catch (error) {
      console.error('OpenAI persona generation failed:', error);
      throw new Error('Failed to generate persona: ' + (error.message || 'Unknown error'));
    }
  }
};

// Helper functions for content simulation

function simulatePostGeneration(variables) {
  const topics = {
    technology: [
      "Just got my hands on the new smartphone and I'm blown away by the camera quality! The night mode is a game-changer for low-light photography. Anyone else using this feature?",
      "Working remotely has changed my productivity habits. I've been using this new task management app that uses AI to prioritize tasks and it's been a lifesaver. Curious if others have tried similar tools?",
      "The advancements in renewable energy tech are inspiring. I just installed solar panels and they're already paying off. The app that monitors energy production is surprisingly addictive to check!"
    ],
    health: [
      "Started a new morning routine that includes 10 minutes of meditation and it's making a huge difference in my stress levels. Anyone else have mindfulness practices they swear by?",
      "Found an amazing new trail for running near the city! The elevation changes are perfect for training and the views are incredible. I'll be going every weekend if anyone wants to join.",
      "Meal prepping has completely changed my relationship with food. I spend 2 hours on Sunday and eat healthy all week. Just discovered these containers that keep everything super fresh."
    ],
    business: [
      "Just finished reading that book everyone's been talking about on startup culture. Some interesting points about fostering innovation, but I think they missed some practical aspects of implementation.",
      "Attended a fascinating webinar on emerging market trends. The speaker highlighted opportunities in sustainable products that I hadn't considered before. Anyone else notice this shift?",
      "Remote work has opened up interesting possibilities for team structure. My company just implemented a 4-day work week and productivity has actually improved. Curious about others' experiences with alternative schedules."
    ]
  };
  
  // Select a relevant topic based on agent interests
  let topicCategory = 'technology';
  if (variables.context && variables.context.interests) {
    const availableCategories = Object.keys(topics);
    for (const interest of variables.context.interests) {
      if (availableCategories.includes(interest)) {
        topicCategory = interest;
        break;
      }
    }
  }
  
  // Select a random post from the topic category
  const postsInCategory = topics[topicCategory];
  const randomIndex = Math.floor(Math.random() * postsInCategory.length);
  
  return postsInCategory[randomIndex];
}

function simulateCommentGeneration(variables) {
  const comments = [
    "This is such a great point! I've been thinking about this a lot lately.",
    "Thanks for sharing your perspective. I hadn't considered that angle before.",
    "I've had a similar experience! It's interesting how common this is becoming.",
    "Have you tried the alternative approach? I found it worked better for my specific situation.",
    "This resonates with me so much. Especially the part about the learning curve.",
    "I'd be interested to hear more about how this worked out long-term for you.",
    "Great insights! Would you mind sharing any resources you found helpful?",
    "I've been on the fence about this, but your post is convincing me to give it a try.",
    "This is exactly the kind of discussion I was hoping to find. So helpful!",
    "I had the opposite experience actually, but I think it depends a lot on specific circumstances."
  ];
  
  const randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
}