import React, { useState } from 'react';
// import './TextToSpeech.css';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    voice: 'nova',
    model: 'openai-audio'
  });

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      params.append('model', settings.model);
      params.append('voice', settings.voice);

      const response = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(text)}?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to generate audio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `ai-voice-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Text to Speech</h2>
      <div className="space-y-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          rows={4}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Voice</label>
          <select 
            value={settings.voice}
            onChange={(e) => setSettings({...settings, voice: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
        </div>

        <button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Speech'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {audioUrl && (
          <div className="mt-6 space-y-4">
            <audio 
              controls 
              src={audioUrl} 
              className="w-full"
            />
            <button
              onClick={handleDownload}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Download Audio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextToSpeech;
