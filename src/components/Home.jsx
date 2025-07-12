import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to AI Generator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Generator</h2>
            <p className="text-gray-600 mb-6">Transform your ideas into images using AI</p>
            <Link  to="/imagegenerator"  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors" >
              Generate Image
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text to Speech</h2>
            <p className="text-gray-600 mb-6">Convert text into natural-sounding speech</p>
            <Link 
              to="/texttospeech" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Speech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
