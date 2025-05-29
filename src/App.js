<<<<<<< HEAD
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";
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
import Memories from "./pages/Memories";
import About from "./components/About";
import { BookIcon } from 'lucide-react';


=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Community from './pages/Community';
import Dairy from './pages/Dairy';
import Editing from './pages/Editing';
import Library from './pages/Library';
import TimeCapsule from './pages/TimeCapsule';
import ProtectedRoute from './components/ProtectedRoute';
import SavedDiaries from './components/SavedDiaries';
import Events from './components/Events';
import CreateVault from './screens/CreateVault';
import JoinVault from './screens/JoinVault';
import RecentLibrary from './components/RecentLibrary';
import UserDashboard from './screens/UserDashboard';
import Terms from './components/Terms';
import PhotoAlbumEditor from './pages/PhotoAlbumEditor';
import Memories from './pages/Memories';
import VideoEditor from './pages/VideoEditor';
>>>>>>> a7bcf048ec8201e63658cf4c745f86cc2091d6f1

// Error Boundary component to catch runtime errors
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
          <p className="text-red-500 mt-2">{this.state.error?.message}</p>
          <pre className="mt-4 text-sm text-gray-600 bg-gray-100 p-4 rounded">
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
<<<<<<< HEAD
    <div>
       
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/editing" element={<Editing />} />
          <Route path="/library" element={<Library />} />
          <Route path="/timecapsule" element={<TimeCapsule />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/saved" element={<SavedDiaries />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-vault" element={<CreateVault />} />
          <Route path="/join-vault" element={<JoinVault />} />
          <Route path="/library/recent" element={<RecentLibrary />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/terms" element={<Terms />} />
          {/* Protected Routes can be nested inside here if needed */}
          <Route element={<ProtectedRoute />} />
        </Routes>
        {/* <Footer /> */}
=======
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<Terms />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/community" element={<Community />} />
              <Route path="/dairy" element={<Dairy />} />
              <Route path="/editing" element={<Editing />} />
              <Route path="/memories" element={<Memories />} />
              <Route path="/library" element={<Library />} />
              <Route path="/timecapsule" element={<TimeCapsule />} />
              <Route path="/saved" element={<SavedDiaries />} />
              <Route path="/events" element={<Events />} />
              <Route path="/create-vault" element={<CreateVault />} />
              <Route path="/join-vault" element={<JoinVault />} />
              <Route path="/library/recent" element={<RecentLibrary />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/photo-album/new" element={<PhotoAlbumEditor />} />
              <Route
                path="/video-editor/new"
                element={
                  <ErrorBoundary>
                    <VideoEditor />
                  </ErrorBoundary>
                }
              />
            </Route>
          </Routes>
        </main>
        <Footer />
>>>>>>> a7bcf048ec8201e63658cf4c745f86cc2091d6f1
      </Router>
    </div>
  );
}

export default App;
