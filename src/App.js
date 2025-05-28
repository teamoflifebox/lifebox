import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Community from "./pages/Community";
import Dairy from "./pages/Dairy";
import Editing from "./pages/Editing";
import Library from "./pages/Library";
import TimeCapsule from "./pages/TimeCapsule";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedDiaries from "./components/SavedDiaries";
import Events from "./components/Events";
import CreateVault from "./screens/CreateVault";
import JoinVault from "./screens/JoinVault";
import RecentLibrary from "./components/RecentLibrary";
import UserDashboard from "./screens/UserDashboard";
import Terms from "./components/Terms";
import VideoEdit from "./pages/VideoEdit";
import PhotoAlbumEditor from "./pages/PhotoAlbumEditor";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dairy" element={<Dairy />} />\
          <Route path="/editing" element={<Editing />} />
          <Route path="/library" element={<Library />} />
          <Route path="/timecapsule" element={<TimeCapsule />} />
          <Route path="/saved" element={<SavedDiaries />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-vault" element={<CreateVault />} />
          <Route path="/join-vault" element={<JoinVault />} />
          <Route path="/library/recent" element={<RecentLibrary />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route element={<ProtectedRoute />} />
          <Route path="/video-trimming" element={<VideoEdit />} /> 
          <Route path="/photo-album/new" element={<PhotoAlbumEditor />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
