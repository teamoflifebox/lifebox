import { useState } from 'react';
import { 
  CalendarIcon, 
  LockIcon, 
  UnlockIcon, 
  MessageSquareIcon, 
  ImageIcon, 
  TargetIcon,
  MicIcon,
  MailIcon,
  BellIcon,
  BookOpenIcon,
  LightbulbIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  UsersIcon
} from 'lucide-react';
import { useCapsules } from '../components/CapsuleContext';
import CapsuleViewer from './CapsuleViewer';

const typeIcons = {
  'private-message': MessageSquareIcon,
  'photos-videos': ImageIcon,
  'goals-milestones': TargetIcon,
  'voice-video': MicIcon,
  'letters': MailIcon,
  'reminders': BellIcon,
  'inspirational': BookOpenIcon,
  'prediction': LightbulbIcon
};

const typeColors = {
  'private-message': 'bg-purple-100 text-purple-800',
  'photos-videos': 'bg-blue-100 text-blue-800',
  'goals-milestones': 'bg-teal-100 text-teal-800',
  'voice-video': 'bg-indigo-100 text-indigo-800',
  'letters': 'bg-pink-100 text-pink-800',
  'reminders': 'bg-orange-100 text-orange-800',
  'inspirational': 'bg-yellow-100 text-yellow-800',
  'prediction': 'bg-green-100 text-green-800'
};

const privacyIcons = {
  'private': EyeOffIcon,
  'shared': UsersIcon,
  'public': EyeIcon
};

const CapsuleCard = ({ capsule }) => {
  const [showViewer, setShowViewer] = useState(false);
  const { getRemainingTime, isCapsuleUnlocked, deleteCapsule } = useCapsules();
  
  const TypeIcon = typeIcons[capsule.type];
  const PrivacyIcon = privacyIcons[capsule.privacy];
  const { timeString } = getRemainingTime(capsule.unlockDate);
  const isUnlocked = isCapsuleUnlocked(capsule.unlockDate);
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this time capsule?')) {
      deleteCapsule(capsule.id);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <>
      <div 
        className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1 ${
          isUnlocked ? 'ring-2 ring-amber-300' : ''
        }`}
        onClick={() => isUnlocked && setShowViewer(true)}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`px-3 py-1 rounded-full text-xs flex items-center ${typeColors[capsule.type]}`}>
              <TypeIcon className="h-3 w-3 mr-1" />
              {capsule.typeLabel}
            </div>
            
            <div className="flex space-x-2">
              <div className="text-gray-500 flex items-center text-xs">
                <PrivacyIcon className="h-3 w-3 mr-1" />
                {capsule.privacy}
              </div>
              
              <button 
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">{capsule.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Unlocks: {formatDate(capsule.unlockDate)}</span>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            {isUnlocked ? (
              <div className="flex items-center text-amber-600">
                <UnlockIcon className="h-5 w-5 mr-1" />
                <span className="font-medium">Unlocked</span>
              </div>
            ) : (
              <div className="flex items-center text-teal-600">
                <LockIcon className="h-5 w-5 mr-1" />
                <span className="font-medium">{timeString}</span>
              </div>
            )}
            
            {isUnlocked && (
              <button 
                className="px-3 py-1 bg-amber-600 text-white rounded-md text-sm hover:bg-amber-700 transition-colors duration-300"
                onClick={() => setShowViewer(true)}
              >
                Open
              </button>
            )}
          </div>
        </div>
      </div>
      
      {showViewer && (
        <CapsuleViewer 
          capsule={capsule} 
          onClose={() => setShowViewer(false)} 
        />
      )}
    </>
  );
};

export default CapsuleCard;