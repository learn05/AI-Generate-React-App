import React, { useState } from 'react';

const TextToText = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateText = async () => {
    setIsLoading(true);
    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://text.pollinations.ai/${encodedPrompt}`;
      const res = await fetch(url);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error('Error generating text:', error);
      setResponse('Failed to generate text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Text-to-Text Generation</h2>
      
      <div className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your text prompt here..."
        />
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        onClick={handleGenerateText}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Text'}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Generated Text:</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default TextToText;
