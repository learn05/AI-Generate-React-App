import React, { useState, useEffect } from 'react';
// import './ImageGenerator.css';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [models, setModels] = useState([]);
  const [settings, setSettings] = useState({
    model: 'flux',
    width: 512,
    height: 512,
    seed: '',
    enhance: false,
    transparent: false
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('https://image.pollinations.ai/models');
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await response.json();
        setModels(data);
        // Set default model to first available model if flux isn't available
        if (!data.includes('flux')) {
          setSettings(prev => ({...prev, model: data[0]}));
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      params.append('prompt', prompt);
      params.append('model', settings.model);
      params.append('width', settings.width);
      params.append('height', settings.height);
      if (settings.seed) params.append('seed', settings.seed);
      if (settings.enhance) params.append('enhance', 'true');
      if (settings.transparent) params.append('transparent', 'true');

      const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Image Generator</h2>
      <div className="space-y-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <select 
              name="model" 
              value={settings.model} 
              onChange={handleSettingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {models.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Width</label>
            <input 
              type="number" 
              name="width" 
              value={settings.width} 
              onChange={handleSettingChange}
              min="256"
              max="1024"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Height</label>
            <input 
              type="number" 
              name="height" 
              value={settings.height} 
              onChange={handleSettingChange}
              min="256"
              max="1024"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Seed (optional)</label>
            <input 
              type="number" 
              name="seed" 
              value={settings.seed} 
              onChange={handleSettingChange}
              placeholder="Leave empty for random"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              name="enhance" 
              checked={settings.enhance} 
              onChange={handleSettingChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">Enhance Prompt</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              name="transparent" 
              checked={settings.transparent} 
              onChange={handleSettingChange}
              disabled={settings.model !== 'gptimage'}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
            />
            <label className="text-sm text-gray-700">Transparent BG</label>
          </div>
        </div>

        <button 
          onClick={generateImage} 
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Generated Image</h3>
            <img 
              src={imageUrl} 
              alt="Generated from prompt" 
              className="w-full rounded-lg shadow-sm"
            />
            <a 
              href={imageUrl} 
              download="generated-image.png" 
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;
