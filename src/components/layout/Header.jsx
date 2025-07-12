import { Link } from 'react-router-dom';

function Header({ darkMode, setDarkMode }) {
  return (
    <header>
      <div className="container">
        <div className="flex justify-between items-center">
            
          <h1 className="siteTitle">AI Generator App</h1>

          <nav className="space-x-4">
            <Link to="/" className="headerLink">Home</Link>

            <Link to="/imagegenerator" className="headerLink">Image Generator</Link>

            <Link to="/texttospeech" className="headerLink">Text to Speech</Link>

            <Link to="/texttotext" className="headerLink">Text to Text</Link>
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;
