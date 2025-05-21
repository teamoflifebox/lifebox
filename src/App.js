import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import DiaryIntro from './components/DiaryIntro';
import MemoriesIntro from './components/MemoriesIntro';
import Dashboard from './components/Dashboard'
import UserDetailsForm from "./components/UserDashboard";
import SpecialDaysForm from "./components/SpecialDaysForm";
import CreateFamily from "./components/CreateFamily";
import HeritageForm from "./components/HeritageForm";
import Help from "./components/Help";
import Support from "./components/Support";


function App() {

  return (
   <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/help" element={<Help />} />
          <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diary-info" element={<DiaryIntro />} />
        <Route path="/memories-info" element={<MemoriesIntro />} />
        <Route path="/user-dashboard" element={<UserDetailsForm />} />
        <Route path="/special-days" element={<SpecialDaysForm />} />
        <Route path="/create-family" element={<CreateFamily />} />
        <Route path="/heritage-family" element={< HeritageForm/>} />


      </Routes>
    </Router>

  )
}

export default App
