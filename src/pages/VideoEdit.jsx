import React from 'react';
import ProjectCard from '../components/ProjectCard'; 
import { BookOpen, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function VideoEdit() {
    const navigate = useNavigate();

  return (
    <div>
        
        <ProjectCard 
          title="Create Video"
          description="Professional editing tools with AI-powered auto-cut and enhancement features."
          icon={Film}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          onClick={() => navigate('/video-editor/new')}
        />
      </div>

  )
}

export default VideoEdit
