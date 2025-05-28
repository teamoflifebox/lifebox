import React from 'react';
import { Book, Camera, Edit, Users, Clock } from 'lucide-react';
import LinkCard from '../components/LinkCards';

function Home() {
  const links = [
    {
      to: '/community',
      title: 'Community',
      description: 'Connect with others, share ideas, and join local events.',
      icon: Users,
    },
    {
      to: '/dairy',
      title: 'Dairy',
      description: 'Record your thoughts with voice, text, or translations.',
      icon: Book,
    },
    {
      to: '/editing',
      title: 'Editing',
      description: 'Edit photos, videos, and create shared family memories.',
      icon: Edit,
    },
    {
      to: '/library',
      title: 'Library',
      description: 'Store and explore your photos, videos, and books.',
      icon: Camera,
    },
    {
      to: '/timecapsule',
      title: 'Time Capsule',
      description: 'Create messages and media for the future.',
      icon: Clock,
    },
    {
      to: '/memories',
      title: 'Memories',
      description: 'Create messages and media for the future.',
      icon: Clock,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Welcome to Lifebox NextGen</h1>
        <p className="text-gray-600 text-lg text-center mb-12">
          Capture, create, and connect with your memories in one place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <LinkCard
              key={link.to}
              to={link.to}
              title={link.title}
              description={link.description}
              icon={link.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;