import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Film, Clock, ArrowRight } from 'lucide-react';

const RecentProjectsList = ({ projects }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleProjectClick = (project) => {
    if (project.type === 'photo-album') {
      navigate(`/photo-album/edit/${project.id}`);
    } else {
      navigate(`/video-editor/edit/${project.id}`);
    }
  };

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {projects.length === 0 ? (
          <li className="py-10">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="h-12 w-12 text-slate-400 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-4">You don't have any recent projects</p>
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate('/photo-album/new')}
              >
                Create your first project
              </button>
            </div>
          </li>
        ) : (
          projects.map((project) => (
            <li 
              key={project.id}
              className="flex items-center py-4 px-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition"
              onClick={() => handleProjectClick(project)}
            >
              <div className="min-w-0 flex-1 flex items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-slate-200">
                  <img 
                    src={project.thumbnail} 
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 px-4">
                  <div className="flex items-center">
                    {project.type === 'photo-album' ? (
                      <BookOpen className="h-4 w-4 text-blue-500 mr-1" />
                    ) : (
                      <Film className="h-4 w-4 text-purple-500 mr-1" />
                    )}
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {project.type === 'photo-album' ? 'Album' : 'Video'}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {project.name}
                  </p>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last edited {formatDate(project.updatedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="ml-5 flex-shrink-0">
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </div>
            </li>
          ))
        )}
      </ul>
      {projects.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 flex items-center justify-center">
          <button 
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            onClick={() => navigate('/projects')}
          >
            View all projects
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentProjectsList;