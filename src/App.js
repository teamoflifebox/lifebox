import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'


import Navbar from './components/Navbar';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import DiaryIntro from './components/DiaryIntro';
import MemoriesIntro from './components/MemoriesIntro';
import Dashboard from './components/Dashboard'


function App() {

  return (
   <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diary-info" element={<DiaryIntro />} />
        <Route path="/memories-info" element={<MemoriesIntro />} />
      </Routes>
    </Router>

  )
}

export default App
