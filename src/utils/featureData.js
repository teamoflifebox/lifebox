import { Users, BookText, Film, Clock, Image, Edit3 } from 'lucide-react';

export const features = [
  {
    title: 'Community',
    description: 'Connect with others, share ideas, and join local events.',
    icon: <Users className="text-blue-500 w-8 h-8" />,
    route: '/community',
  },
  {
    title: 'Dairy',
    description: 'Record your thoughts with voice, text, or translations.',
    icon: <BookText className="text-purple-500 w-8 h-8" />,
    route: '/dairy',
  },
  {
    title: 'Editing',
    description: 'Edit photos, videos, and create shared family memories.',
    icon: <Edit3 className="text-pink-500 w-8 h-8" />,
    route: '/editing',
  },
  {
    title: 'Library',
    description: 'Store and explore your photos, videos, and books.',
    icon: <Image className="text-yellow-500 w-8 h-8" />,
    route: '/library',
  },
  {
    title: 'Time Capsule',
    description: 'Create messages and media for the future.',
    icon: <Clock className="text-green-500 w-8 h-8" />,
    route: '/timecapsule',
  },
  {
    title: 'Memories',
    description: 'Create messages and media for the future.',
    icon: <Film className="text-red-500 w-8 h-8" />,
    route: '/memories',
  },
];
