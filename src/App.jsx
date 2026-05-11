import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'; // Fortement recommandé
import Home from './pages/Home';
import CvAntiAts from './pages/CvAntiAts';
import Spontanee from './pages/Spontanee';
import Recherche from './pages/Recherche';
import Contact from './pages/contact';
import Dossier from './pages/Dossier';
import About from './pages/about'; // N'oublie pas d'importer ta nouvelle page About
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Force le retour en haut à chaque clic sur le footer */}
      <div className="grid-bg"></div>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Les chemins ici doivent matcher EXACTEMENT le footer */}
          <Route path="/CvAntiAts" element={<CvAntiAts />} />
          <Route path="/Spontanee" element={<Spontanee />} />
          <Route path="/Recherche" element={<Recherche />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dossier" element={<Dossier />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;