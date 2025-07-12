import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ImageGenerator from './components/ImageGenerator';
import TextToSpeech from './components/TextToSpeech';
import TextToText from './components/TextToText';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/imagegenerator" element={<ImageGenerator />} />
              <Route path="/texttospeech" element={<TextToSpeech />} />
              <Route path="/texttotext" element={<TextToText />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
