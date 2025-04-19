import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, MessageSquare, Bell, Clock, PencilLine } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/agents'; // Replace with your backend URL if different

const CreateAgent: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: 'social',
    avatar_url: '',
    bio: '',
    tone: 'casual',
    interests: [],
    post_frequency: 'daily',
    activeHours: ['9-12', '13-17'],
    contentTypes: ['posts', 'comments'],
    interactionStyle: 'proactive'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFormData(prev => {
      const array = prev[name as keyof typeof prev] as string[];
      if (checked) {
        return { ...prev, [name]: [...array, value] };
      } else {
        return { ...prev, [name]: array.filter(item => item !== value) };
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally send the data to your backend
    try {
      const response = await axios.post(API_URL, formData);
      console.log(`Successfully added agent: ${response.data.name}`);
      navigate('/agents');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/agents')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Create New Agent</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your AI persona</p>
        </div>
      </div>
      
      <div className="flex justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex-1">
            <div className="relative flex items-center justify-center">
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep > index + 1
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : currentStep === index + 1
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-gray-300 text-gray-400 dark:border-gray-600'
                }`}
              >
                {currentStep > index + 1 ? '✓' : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={`absolute h-0.5 w-full left-1/2 ${
                    currentStep > index + 1 ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></div>
              )}
            </div>
            <div className="text-center mt-2 text-sm font-medium">
              {index === 0 && 'Basic Info'}
              {index === 1 && 'Personality'}
              {index === 2 && 'Scheduling'}
              {index === 3 && 'Review'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <User className="h-6 w-6 text-indigo-500" />
                <h2 className="text-xl font-medium">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="e.g., Sarah Johnson"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-1">
                    Role/Title
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="e.g., Community Manager"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="social">Social</option>
                    <option value="support">Support</option>
                    <option value="sales">Sales</option>
                    <option value="community">Community</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="avatar_url" className="block text-sm font-medium mb-1">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    id="avatar_url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use a URL from a stock photo site like Pexels
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">
                    Bio/Description
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Write a brief description about this agent..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Personality */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <PencilLine className="h-6 w-6 text-indigo-500" />
                <h2 className="text-xl font-medium">Personality & Content</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium mb-1">
                    Communication Tone
                  </label>
                  <select
                    id="tone"
                    name="tone"
                    required
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="casual">Casual & Friendly</option>
                    <option value="professional">Professional & Formal</option>
                    <option value="enthusiastic">Enthusiastic & Energetic</option>
                    <option value="technical">Technical & Precise</option>
                    <option value="humorous">Humorous & Witty</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="interactionStyle" className="block text-sm font-medium mb-1">
                    Interaction Style
                  </label>
                  <select
                    id="interactionStyle"
                    name="interactionStyle"
                    required
                    value={formData.interactionStyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="proactive">Proactive (Initiates conversations)</option>
                    <option value="reactive">Reactive (Responds to others)</option>
                    <option value="balanced">Balanced (Mix of both)</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3">
                    Content Types
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['posts', 'comments', 'questions', 'answers', 'reviews', 'reactions'].map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`content-${type}`}
                          name="contentTypes"
                          value={type}
                          checked={(formData.contentTypes as string[]).includes(type)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label 
                          htmlFor={`content-${type}`} 
                          className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3">
                    Interests & Topics
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['technology', 'business', 'health', 'education', 'entertainment', 'sports', 'food', 'travel', 'fashion'].map(interest => (
                      <div key={interest} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`interest-${interest}`}
                          name="interests"
                          value={interest}
                          checked={(formData.interests as string[]).includes(interest)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label 
                          htmlFor={`interest-${interest}`} 
                          className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize"
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Scheduling */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Clock className="h-6 w-6 text-indigo-500" />
                <h2 className="text-xl font-medium">Activity Schedule</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="post_frequency" className="block text-sm font-medium mb-1">
                    Post Frequency
                  </label>
                  <select
                    id="post_frequency"
                    name="post_frequency"
                    required
                    value={formData.post_frequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="hourly">Multiple times per day</option>
                    <option value="daily">Once daily</option>
                    <option value="weekly">A few times per week</option>
                    <option value="monthly">A few times per month</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Active Hours
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['9-12', '13-17', '18-22', '23-8'].map(timeSlot => (
                      <div key={timeSlot} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`time-${timeSlot}`}
                          name="activeHours"
                          value={timeSlot}
                          checked={(formData.activeHours as string[]).includes(timeSlot)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label 
                          htmlFor={`time-${timeSlot}`} 
                          className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {timeSlot === '9-12' && 'Morning (9AM-12PM)'}
                          {timeSlot === '13-17' && 'Afternoon (1PM-5PM)'}
                          {timeSlot === '18-22' && 'Evening (6PM-10PM)'}
                          {timeSlot === '23-8' && 'Night (11PM-8AM)'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-medium text-indigo-700 dark:text-indigo-400">Activity Estimation</h3>
                  </div>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    Based on your configuration, this agent will generate approximately:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-indigo-700 dark:text-indigo-300">
                    <li>• 3-5 original posts per week</li>
                    <li>• 10-15 comments on others' content per week</li>
                    <li>• Most active during weekday afternoons</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <MessageSquare className="h-6 w-6 text-indigo-500" />
                <h2 className="text-xl font-medium">Review Agent</h2>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl font-bold">
                        {formData.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{formData.name || 'Agent Name'}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{formData.role || 'Role/Title'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h4>
                        <p className="mt-1 text-sm">{formData.bio || 'No bio provided'}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h4>
                          <p className="mt-1 text-sm capitalize">{formData.category}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tone</h4>
                          <p className="mt-1 text-sm capitalize">{formData.tone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Interests</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {formData.interests.length > 0 ? (
                          formData.interests.map(interest => (
                            <span 
                              key={interest} 
                              className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full capitalize"
                            >
                              {interest}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No interests selected</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Content Types</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {formData.contentTypes.map(type => (
                          <span 
                            key={type} 
                            className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full capitalize"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Schedule</h4>
                      <p className="mt-1 text-sm capitalize">{formData.post_frequency} posts</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {formData.activeHours.map(hours => (
                          <span 
                            key={hours} 
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                          >
                            {hours === '9-12' && 'Morning'}
                            {hours === '13-17' && 'Afternoon'}
                            {hours === '18-22' && 'Evening'}
                            {hours === '23-8' && 'Night'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Once created, your agent will begin generating content according to the schedule. You can pause or adjust the agent at any time.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="h-5 w-5 mr-2" />
                <span>Create Agent</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgent;