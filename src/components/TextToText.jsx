import React, { useState } from 'react';

const TextToText = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerateText = async () => {
    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://text.pollinations.ai/${encodedPrompt}`;
      const res = await fetch(url);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error('Error generating text:', error);
      setResponse('Failed to generate text. Please try again.');
    }
  };

  return (
    <div className="text-to-text-container">
      <h2>Text-to-Text Generation</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <button onClick={handleGenerateText}>Generate Text</button>
      <div className="response">
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default TextToText;
