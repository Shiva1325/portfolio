import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SkillsAndExperience from './Pages/SkillsAndExperience';
import Contact from './Pages/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/SkillsandExperience' element={<SkillsAndExperience />} />
          <Route path='/Contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
