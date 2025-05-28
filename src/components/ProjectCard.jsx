import React from 'react';
// import { DivideIcon as LucideIcon } from 'lucide-react';

const ProjectCard = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className={`${color} px-6 py-8 sm:p-10`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-blue-100">
              {description}
            </p>
          </div>
          <div className="ml-4 rounded-full bg-white bg-opacity-10 p-3 text-white">
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <div className="mt-6">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="absolute top-0 inset-x-0 h-3 flex items-center justify-center">
        <div className="h-full w-6/12 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
      </div>
    </div>
  );
};

export default ProjectCard;