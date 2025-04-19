import React, { useState, useEffect } from 'react'; // Import useEffect
import { Save } from 'lucide-react'; // Import Save icon

interface PromptItem {
  id: string; // Keep UUID for frontend key, but DB might use its own ID
  name: string;
  description: string;
  contentType: string;
  dataEndpoint: string;
  jsonFormat: string;
}

const Prompts: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]); // Initialize empty, fetch will populate
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  // Fetch existing prompts on component mount
  useEffect(() => {
    const fetchPrompts = async () => {
      setIsLoading(true);
      setError(null);
      setPrompts([]); // Clear existing before fetch
      try {
        // TODO: Replace with actual API call
        console.log("Fetching prompts from API...");
        // const response = await fetch('/api/prompts'); // Example API endpoint
        // if (!response.ok) {
        //   throw new Error('Failed to fetch prompts');
        // }
        // const data = await response.json();
        // setPrompts(data.length > 0 ? data.map(p => ({...p, id: p.id || crypto.randomUUID() })) : [{ id: crypto.randomUUID(), name: '', description: '', contentType: '', dataEndpoint: '', jsonFormat: '' }]);

        // Placeholder: Simulate fetch delay and set initial state if fetch is empty
        await new Promise(resolve => setTimeout(resolve, 500));
        // Assuming fetch returns empty for now, set initial state
        setPrompts([{ id: crypto.randomUUID(), name: '', description: '', contentType: '', dataEndpoint: '', jsonFormat: '' }]);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Set initial empty prompt on error
        setPrompts([{ id: crypto.randomUUID(), name: '', description: '', contentType: '', dataEndpoint: '', jsonFormat: '' }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, []); // Empty dependency array means this runs once on mount

  const handleAddPrompt = () => {
    setPrompts([
      ...prompts,
      { id: crypto.randomUUID(), name: '', description: '', contentType: '', dataEndpoint: '', jsonFormat: '' }, // Added name
    ]);
  };

  // Updated to handle 'name' field as well
  const handleInputChange = (id: string, field: keyof Omit<PromptItem, 'id'>, value: string) => {
    setPrompts(prompts.map(prompt =>
      prompt.id === id ? { ...prompt, [field]: value } : prompt
    ));
  };

  const handleRemovePrompt = (id: string) => {
    // Prevent removing the last prompt if desired, or handle accordingly
    if (prompts.length > 1) {
       setPrompts(prompts.filter(prompt => prompt.id !== id));
    } else {
        // Optionally clear the fields of the last prompt instead of removing it
        setPrompts([{ id: crypto.randomUUID(), name: '', description: '', contentType: '', dataEndpoint: '', jsonFormat: '' }]); // Added missing name property
    }
  };


  // Function to handle saving prompts
  const handleSavePrompts = async () => {
      setIsLoading(true);
      setError(null);
      try {
          // TODO: Replace with actual API call to save prompts
          console.log("Saving prompts to API:", prompts);
          // const response = await fetch('/api/prompts', { // Example API endpoint
          //   method: 'POST', // or 'PUT'
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(prompts.map(({ id, ...rest }) => rest)), // Send without frontend ID
          // });
          // if (!response.ok) {
          //   throw new Error('Failed to save prompts');
          // }
          // const savedPrompts = await response.json();
          // Optionally update state with response from server (e.g., if IDs are generated/updated)
          // setPrompts(savedPrompts.map(p => ({...p, id: p.id || crypto.randomUUID() })));

          // Placeholder: Simulate save delay
          await new Promise(resolve => setTimeout(resolve, 500));
          alert('Prompts saved successfully (simulated)!'); // Replace with better feedback

      } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred while saving';
          setError(errorMsg);
          alert(`Error saving prompts: ${errorMsg}`); // Replace with better feedback
      } finally {
          setIsLoading(false);
      }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold">Prompt Configuration</h1>
        <div className="flex items-center space-x-3">
           <button
             onClick={handleAddPrompt}
             disabled={isLoading}
             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
           >
             Add New Prompt
           </button>
           <button
             onClick={handleSavePrompts}
             disabled={isLoading}
             className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
           >
             <Save className="h-4 w-4 mr-2" />
             {isLoading ? 'Saving...' : 'Save Prompts'}
           </button>
        </div>
      </div>

       {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      {isLoading && prompts.length === 0 && <div className="text-center p-4">Loading prompts...</div>}

      {!isLoading && prompts.length === 0 && !error && <div className="text-center p-4 text-gray-500">No prompts configured yet. Click 'Add New Prompt' to start.</div>}

      <div className="space-y-6">
        {prompts.map((prompt, index) => (
          <div key={prompt.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 relative border border-gray-200 dark:border-gray-700">
             {prompts.length > 1 && (
                 <button
                    onClick={() => handleRemovePrompt(prompt.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 focus:outline-none"
                    aria-label="Remove prompt"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                 </button>
             )}
            {/* Replaced h2 with input for Prompt Name */}
            <div className="mb-3">
               <label htmlFor={`name-${prompt.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sr-only">
                 Prompt Name
               </label>
               <input
                 type="text"
                 id={`name-${prompt.id}`}
                 name="name"
                 className="text-lg font-medium text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 w-full"
                 placeholder={`Prompt Name ${index + 1}`}
                 value={prompt.name}
                 onChange={(e) => handleInputChange(prompt.id, 'name', e.target.value)}
               />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prompt Description */}
              <div className="md:col-span-2">
                <label htmlFor={`description-${prompt.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prompt Description Text
                </label>
                <textarea
                  id={`description-${prompt.id}`}
                  name="description"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Enter the detailed prompt description..."
                  value={prompt.description}
                  onChange={(e) => handleInputChange(prompt.id, 'description', e.target.value)}
                />
              </div>

              {/* Content Type */}
              <div>
                <label htmlFor={`contentType-${prompt.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content Type
                </label>
                <input
                  type="text"
                  id={`contentType-${prompt.id}`}
                  name="contentType"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., application/json, text/plain"
                  value={prompt.contentType}
                  onChange={(e) => handleInputChange(prompt.id, 'contentType', e.target.value)}
                />
              </div>

              {/* Content Data Endpoint */}
              <div>
                <label htmlFor={`dataEndpoint-${prompt.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content Data Endpoint
                </label>
                <input
                  type="text"
                  id={`dataEndpoint-${prompt.id}`}
                  name="dataEndpoint"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., /api/data, https://example.com/data"
                  value={prompt.dataEndpoint}
                  onChange={(e) => handleInputChange(prompt.id, 'dataEndpoint', e.target.value)}
                />
              </div>

              {/* Content Data JSON Format */}
              <div className="md:col-span-2">
                <label htmlFor={`jsonFormat-${prompt.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content Data JSON Format
                </label>
                <textarea
                  id={`jsonFormat-${prompt.id}`}
                  name="jsonFormat"
                  rows={6}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white font-mono text-xs"
                  placeholder='Describe the expected JSON structure, e.g., {\n  "key": "value",\n  "items": []\n}'
                  value={prompt.jsonFormat}
                  onChange={(e) => handleInputChange(prompt.id, 'jsonFormat', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
       {/* Add save/submit logic here if needed */}
    </div>
  );
};

export default Prompts;