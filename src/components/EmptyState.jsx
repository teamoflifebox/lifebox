import { TimerIcon, LockIcon } from 'lucide-react';

const EmptyState = ({ setView }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-purple-100 rounded-full opacity-30 animate-ping"></div>
        <TimerIcon className="h-16 w-16 text-purple-600 relative" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-purple-900 mb-3">
        Create Your First Time Capsule
      </h2>
      <p className="text-gray-600 max-w-lg mb-6">
        Preserve your thoughts, memories, and media to be unlocked at a future date. It's like sending a gift to your future self or loved ones.
      </p>
      <button
        onClick={() => setView('create')}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg flex items-center hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        <LockIcon className="h-5 w-5 mr-2" />
        Create My First Capsule
      </button>
    </div>
  );
};

export default EmptyState;