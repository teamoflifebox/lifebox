import React from 'react';
import { Users, Star, PlusCircle, BookOpen, Film, Clock, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import ProjectCard from '../components/dashboard/ProjectCard';
import RecentProjectsList from '../components/dashboard/RecentProjectsList';

function Editing() {
  const navigate = useNavigate();

  const recentProjects = [
    {
      id: '1',
      name: 'Summer Vacation Album',
      type: 'photo-album',
      updatedAt: new Date(2025, 3, 15),
      thumbnail:
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      name: 'Birthday Celebration',
      type: 'video',
      updatedAt: new Date(2025, 3, 10),
      thumbnail:
        'https://images.pexels.com/photos/7194915/pexels-photo-7194915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      name: 'Family Reunion 2025',
      type: 'photo-album',
      updatedAt: new Date(2025, 3, 5),
      thumbnail:
        'https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Integrated Dashboard code */}
        <div className="space-y-6 md:space-y-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Welcome to Lifebox NextGen</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate('/photo-album/new')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                New Project
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ProjectCard
              title="Create Photo Album"
              description="Design interactive, turnable digital photo albums that simulate a real photobook."
              icon={BookOpen}
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              onClick={() => navigate('/photo-album/new')}
            />
            <ProjectCard
              title="Create Video"
              description="Professional editing tools with AI-powered auto-cut and enhancement features."
              icon={Film}
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              onClick={() => navigate('/video-editor/new')}
            />
          </div>

          <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-2" />
                <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white">Recent Projects</h3>
              </div>
            </div>
            <RecentProjectsList projects={recentProjects} />
          </div>

          <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-amber-500 mr-2" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Featured Templates</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Travel Journal',
                  type: 'photo-album',
                  image:
                    'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                },
                {
                  title: 'Wedding Highlights',
                  type: 'video',
                  image:
                    'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                },
                {
                  title: 'Birthday Memories',
                  type: 'photo-album',
                  image:
                    'https://images.pexels.com/photos/1405761/pexels-photo-1405761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                },
              ].map((template, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer transition transform hover:scale-[1.02]"
                >
                  <div className="h-36 w-full bg-cover bg-center" style={{ backgroundImage: `url(${template.image})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white font-medium">{template.title}</div>
                    <div className="text-slate-300 text-sm">
                      {template.type === 'photo-album' ? 'Photo Album Template' : 'Video Template'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* End of Dashboard code */}

        <SectionTitle
          id="editing"
          title="Editing & Family Tools"
          subtitle="Enhance your memories and share them with loved ones"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Users}
            title="Family Vault"
            description="Share and explore memories with your family members"
            to="/family-vault"
            className="border-t-4 border-orange-600"
          />
          <FeatureCard
            icon={Star}
            title="Memory Enhancer"
            description="AI-powered tools to improve and organize your memories"
            to="/memory-enhancer"
            className="border-t-4 border-purple-600"
          />
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Sharing</h3>
          <p className="text-gray-600 mb-6">
            Create a shared vault to collaborate on family memories. Add family members and start building your collective story.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/create-vault"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold uppercase tracking-wide"
            >
              Create Family Vault
            </Link>
            <Link
              to="/join-vault"
              className="bg-white text-blue-600 px-5 py-2.5 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors duration-200 font-semibold uppercase tracking-wide"
            >
              Join Existing Vault
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Editing;