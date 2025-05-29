import { 
  XIcon, 
  MessageSquareIcon, 
  ImageIcon, 
  TargetIcon,
  MicIcon,
  MailIcon,
  BellIcon,
  BookOpenIcon,
  LightbulbIcon,
  CalendarIcon
} from 'lucide-react';

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

const CapsuleViewer = ({ capsule, onClose }) => {
  const TypeIcon = typeIcons[capsule.type];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const renderContent = () => {
    switch (capsule.type) {
      case 'private-message':
      case 'inspirational':
      case 'prediction':
      case 'letters':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-serif">
            <p className="whitespace-pre-line text-gray-800">{capsule.content}</p>
          </div>
        );
        
      case 'photos-videos':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            {capsule.mediaUrl && (
              <img 
                src={capsule.mediaUrl} 
                alt={capsule.title} 
                className="w-full h-auto rounded-lg"
              />
            )}
            {capsule.caption && (
              <p className="mt-4 text-gray-700 font-serif">{capsule.caption}</p>
            )}
          </div>
        );
        
      case 'goals-milestones':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Your Goal:</h4>
            <p className="whitespace-pre-line text-gray-800 mb-4 font-serif">{capsule.goal}</p>
            
            <h4 className="font-medium text-gray-900 mb-2">Milestones:</h4>
            <ul className="space-y-2">
              {capsule.milestones?.map((milestone, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-800">{milestone}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-serif">
            <p className="whitespace-pre-line text-gray-800">{capsule.content}</p>
          </div>
        );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <TypeIcon className="h-5 w-5 text-purple-700" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">{capsule.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Created: {formatDate(capsule.createdAt)} • Unlocked: {formatDate(capsule.unlockDate)}</span>
          </div>
          
          {renderContent()}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 italic">
              This time capsule was opened after being locked for{' '}
              {Math.round((new Date(capsule.unlockDate) - new Date(capsule.createdAt)) / (1000 * 60 * 60 * 24))} days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleViewer;