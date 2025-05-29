import { useState } from 'react';
import { useCapsules } from '../components/CapsuleContext';
import CapsuleCard from './CapsuleCard';
import { TimerIcon, LockIcon, UnlockIcon } from 'lucide-react';
import EmptyState from './EmptyState';

const CapsuleList = ({ setView }) => {
  const { capsules, isCapsuleUnlocked } = useCapsules();
  const [filter, setFilter] = useState('all'); // 'all', 'locked', 'unlocked'
  
  const filteredCapsules = capsules.filter(capsule => {
    if (filter === 'all') return true;
    const isUnlocked = isCapsuleUnlocked(capsule.unlockDate);
    return (filter === 'unlocked' && isUnlocked) || (filter === 'locked' && !isUnlocked);
  });
  
  // Count by status
  const lockedCount = capsules.filter(c => !isCapsuleUnlocked(c.unlockDate)).length;
  const unlockedCount = capsules.length - lockedCount;
  
  if (capsules.length === 0) {
    return <EmptyState setView={setView} />;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-purple-900">
          My Time Capsules
        </h2>
        <button
          onClick={() => setView('create')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center hover:bg-purple-700 transition-colors duration-300"
        >
          <LockIcon className="h-4 w-4 mr-2" />
          Create New Capsule
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <TimerIcon className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-medium text-gray-900">Total Capsules</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900 mt-2">{capsules.length}</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <LockIcon className="h-6 w-6 text-teal-600" />
            <h3 className="text-lg font-medium text-gray-900">Locked</h3>
          </div>
          <p className="text-3xl font-bold text-teal-600 mt-2">{lockedCount}</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <UnlockIcon className="h-6 w-6 text-amber-600" />
            <h3 className="text-lg font-medium text-gray-900">Unlocked</h3>
          </div>
          <p className="text-3xl font-bold text-amber-600 mt-2">{unlockedCount}</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'all' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            filter === 'locked' 
              ? 'bg-teal-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <LockIcon className="h-3 w-3 mr-1" />
          Locked
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            filter === 'unlocked' 
              ? 'bg-amber-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <UnlockIcon className="h-3 w-3 mr-1" />
          Unlocked
        </button>
      </div>
      
      {/* Capsules */}
      {filteredCapsules.length === 0 ? (
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <p className="text-gray-600">No capsules match your current filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-2 text-purple-600 hover:text-purple-800"
          >
            View all capsules
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapsules.map(capsule => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CapsuleList;