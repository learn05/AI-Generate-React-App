import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
            
          <h1 className="text-2xl font-bold text-gray-800">AI Generator App</h1>

          <nav className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>

            <Link to="/imagegenerator" className="text-gray-600 hover:text-gray-900">Image Generator</Link>

            <Link to="/texttospeech" className="text-gray-600 hover:text-gray-900">Text to Speech</Link>

            <Link to="/texttotext" className="text-gray-600 hover:text-gray-900">Text to Text</Link>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
