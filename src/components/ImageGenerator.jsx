import React, { useState, useEffect } from 'react';

const translateText = async (text) => {
  try {
    const response = await fetch(`https://text.pollinations.ai/Translate this to English: ${encodeURIComponent(text)}`);
    const translatedText = await response.text();
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [translatedPrompt, setTranslatedPrompt] = useState('');
  const [translationStatus, setTranslationStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [models, setModels] = useState([]);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [showCustomDimensions, setShowCustomDimensions] = useState(false);
  const [settings, setSettings] = useState({
    model: 'flux',
    width: 1960,
    height: 1960,
    seed: '',
    enhance: false,
    transparent: false,
    nologo: false
  });

  const aspectRatios = {
    '1:1': { width: 1960, height: 1960 },
    '3:4': { width: 1470, height: 1960 },
    '4:3': { width: 1960, height: 1470 },
    '16:9': { width: 1960, height: 1102.5 },
    '9:16': { width: 1102.5, height: 1960 }
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('https://image.pollinations.ai/models');
        if (!response.ok) throw new Error('Failed to fetch models');
        const data = await response.json();
        setModels(data);
        if (!data.includes('flux')) {
          setSettings(prev => ({...prev, model: data[0]}));
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
    setSettings(prev => ({
      ...prev,
      width: aspectRatios[ratio].width,
      height: aspectRatios[ratio].height
    }));
    setShowCustomDimensions(false);
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslationStatus('Translating...');
    
    try {
      const translatedText = await translateText(prompt);
      setOriginalPrompt(prompt);
      setTranslatedPrompt(translatedText);
      setPrompt(translatedText);
      setTranslationStatus('Translated to English');
      
      const params = new URLSearchParams();
      params.append('prompt', translatedText);
      params.append('model', settings.model);
      params.append('width', settings.width);
      params.append('height', settings.height);
      params.append('nologo', 'true');
      params.append('safe', 'false');
      if (settings.seed) params.append('seed', settings.seed);
      if (settings.enhance) params.append('enhance', 'true');
      if (settings.transparent) params.append('transparent', 'true');

      const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(translatedText)}?${params.toString()}`);
      
      if (!response.ok) throw new Error('Failed to generate image');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setIsLoading(false);
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
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="pageTitle">AI Image Generator</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate (any language)..."
            rows={4}
          />
              {translationStatus && (
            <div className="text-sm text-gray-600">
              {translationStatus}
              {originalPrompt && (
                <div className="mt-1 space-y-1">
                  <div className="text-gray-500">
                    Original: {originalPrompt}
                  </div>
                  <div className="text-gray-700">
                    Translation: {translatedPrompt}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label>Aspect Ration</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(aspectRatios).map(ratio => (
              <button
                key={ratio}
                onClick={() => handleAspectRatioChange(ratio)}
                className={`px-4 py-2 rounded-md ${
                  aspectRatio === ratio 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {ratio}
              </button>
            ))}
            <button
              onClick={() => setShowCustomDimensions(!showCustomDimensions)}
              className={`px-4 py-2 rounded-md ${
                showCustomDimensions
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Custom
            </button>
          </div>

          {showCustomDimensions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label>Width</label>
                <input type="number" name="width" value={settings.width} onChange={handleSettingChange} />
              </div>
              <div className="space-y-2">
                <label>Height</label>
                <input type="number" name="height" value={settings.height} onChange={handleSettingChange} />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label>Model</label>
            <select name="model" value={settings.model} onChange={handleSettingChange} >
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label>Seed (optional)</label>
            <input type="number" name="seed" value={settings.seed} onChange={handleSettingChange} placeholder="Leave empty for random" />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="enhance" checked={settings.enhance} onChange={handleSettingChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">Enhance Prompt</label>
          </div>
        </div>

        <button
          onClick={generateImage}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
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
};

export default ImageGenerator;
