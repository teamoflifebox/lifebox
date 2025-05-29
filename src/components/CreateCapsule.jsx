import { useState } from 'react';
import { useCapsules } from './CapsuleContext';
import { 
  MessageSquareIcon, 
  LockIcon,
  ImageIcon, 
  TargetIcon,
  MicIcon,
  MailIcon,
  BellIcon,
  BookOpenIcon,
  LightbulbIcon,
  ArrowLeftIcon,
  CalendarIcon,
  EyeIcon,
  EyeOffIcon,
  UsersIcon
} from 'lucide-react';
import CapsuleFormPrivateMessage from './capsule-forms/CapsuleFormPrivateMessage';
import CapsuleFormPhotosVideos from './capsule-forms/CapsuleFormPhotosVideos';
import CapsuleFormGoalsMilestones from './capsule-forms/CapsuleFormGoalsMilestones';
import CapsuleFormVoiceVideo from './capsule-forms/CapsuleFormVoiceVideo';
import CapsuleFormLetters from './capsule-forms/CapsuleFormLetters';
import CapsuleFormReminders from './capsule-forms/CapsuleFormReminders';
import CapsuleFormInspirational from './capsule-forms/CapsuleFormInspirational';
import CapsuleFormPrediction from './capsule-forms/CapsuleFormPrediction';
import DatePicker from './capsule-inputs/DatePicker';

const capsuleTypes = [
  {
    id: 'private-message',
    icon: MessageSquareIcon,
    label: 'Private Message',
    description: 'A message to your future self',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    component: CapsuleFormPrivateMessage
  },
  {
    id: 'photos-videos',
    icon: ImageIcon,
    label: 'Photos/Videos',
    description: 'Visual memories locked in time',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    component: CapsuleFormPhotosVideos
  },
  {
    id: 'goals-milestones',
    icon: TargetIcon,
    label: 'Goals & Milestones',
    description: 'Track progress toward your goals',
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    component: CapsuleFormGoalsMilestones
  },
  {
    id: 'voice-video',
    icon: MicIcon,
    label: 'Voice/Video Diary',
    description: 'Record yourself for the future',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    component: CapsuleFormVoiceVideo
  },
  {
    id: 'letters',
    icon: MailIcon,
    label: 'Letters to Loved Ones',
    description: 'Share thoughts with someone special',
    color: 'bg-pink-100 text-pink-800 border-pink-200',
    component: CapsuleFormLetters
  },
  {
    id: 'reminders',
    icon: BellIcon,
    label: 'Future Reminders',
    description: 'Reminders with emotional context',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    component: CapsuleFormReminders
  },
  {
    id: 'inspirational',
    icon: BookOpenIcon,
    label: 'Inspirational',
    description: 'Quotes, poems, or passages',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    component: CapsuleFormInspirational
  },
  {
    id: 'prediction',
    icon: LightbulbIcon,
    label: 'Prediction',
    description: 'What do you think will happen?',
    color: 'bg-green-100 text-green-800 border-green-200',
    component: CapsuleFormPrediction
  }
];

const privacyOptions = [
  { id: 'private', label: 'Only Me', icon: EyeOffIcon },
  { id: 'shared', label: 'Share with One Person', icon: UsersIcon },
  { id: 'public', label: 'Public on Unlock', icon: EyeIcon }
];

const CreateCapsule = ({ setView }) => {
  const [step, setStep] = useState('type'); // 'type', 'details', 'preview'
  const [selectedType, setSelectedType] = useState(null);
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    unlockDate: '',
    privacy: 'private',
    content: ''
  });
  const { addCapsule } = useCapsules();
  
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCapsuleData(prev => ({
      ...prev,
      type: type.id,
      typeLabel: type.label
    }));
    setStep('details');
  };
  
  const handleBack = () => {
    if (step === 'details') {
      setStep('type');
    } else if (step === 'preview') {
      setStep('details');
    }
  };
  
  const handleDataChange = (newData) => {
    setCapsuleData(prev => ({
      ...prev,
      ...newData
    }));
  };
  
  const handleContinue = () => {
    setStep('preview');
  };
  
  const handlePrivacyChange = (privacy) => {
    setCapsuleData(prev => ({
      ...prev,
      privacy
    }));
  };
  
  const handleCreateCapsule = () => {
    addCapsule(capsuleData);
    setView('list');
  };
  
  const isFormValid = () => {
    return (
      capsuleData.title?.trim() &&
      capsuleData.unlockDate &&
      (capsuleData.content?.trim() || 
       capsuleData.mediaUrl || 
       (capsuleData.goal?.trim() && capsuleData.milestones?.length))
    );
  };
  
  const SelectedFormComponent = selectedType ? selectedType.component : null;
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {step !== 'type' && (
        <button
          onClick={handleBack}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </button>
      )}
      
      {step === 'type' && (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-purple-900 mb-2">
              Choose a Time Capsule Type
            </h2>
            <p className="text-gray-600">
              Select the type of memory or message you want to preserve
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capsuleTypes.map((type) => {
              const TypeIcon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type)}
                  className={`p-6 rounded-lg border-2 hover:border-purple-300 hover:shadow-md transition-all duration-300 text-left ${type.color}`}
                >
                  <TypeIcon className="h-8 w-8 mb-3" />
                  <h3 className="font-medium text-lg mb-1">{type.label}</h3>
                  <p className="text-sm opacity-80">{type.description}</p>
                </button>
              );
            })}
          </div>
        </>
      )}
      
      {step === 'details' && selectedType && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-purple-900 mb-2">
              Create {selectedType.label} Capsule
            </h2>
            <p className="text-gray-600">{selectedType.description}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={capsuleData.title || ''}
                onChange={(e) => handleDataChange({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Give your time capsule a name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Setting
              </label>
              <div className="flex space-x-4">
                {privacyOptions.map((option) => {
                  const PrivacyIcon = option.icon;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handlePrivacyChange(option.id)}
                      className={`flex-1 py-2 px-3 rounded-md border flex items-center justify-center transition-all duration-300 ${
                        capsuleData.privacy === option.id
                          ? 'bg-purple-50 border-purple-300 text-purple-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <PrivacyIcon className="h-4 w-4 mr-2" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unlock Date
              </label>
              <DatePicker 
                selected={capsuleData.unlockDate}
                onChange={(date) => handleDataChange({ unlockDate: date })}
              />
            </div>
            
            {SelectedFormComponent && (
              <SelectedFormComponent 
                data={capsuleData}
                onChange={handleDataChange}
              />
            )}
            
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleContinue}
                disabled={!isFormValid()}
                className={`w-full py-3 rounded-md flex items-center justify-center ${
                  isFormValid()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors duration-300`}
              >
                Preview & Create
              </button>
            </div>
          </div>
        </div>
      )}
      
      {step === 'preview' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-purple-900 mb-2">
              Preview Your Time Capsule
            </h2>
            <p className="text-gray-600">
              Review your time capsule before locking it
            </p>
          </div>
          
          <div className="mb-6 p-6 border border-gray-200 rounded-lg">
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-900">{capsuleData.title}</h3>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>Unlocks on: {formatDate(capsuleData.unlockDate)}</span>
              </div>
            </div>
            
            <div>
              {selectedType.id === 'private-message' && (
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line font-serif">
                  {capsuleData.content}
                </div>
              )}
              
              {selectedType.id === 'photos-videos' && (
                <div>
                  {capsuleData.mediaUrl && (
                    <img 
                      src={capsuleData.mediaUrl} 
                      alt={capsuleData.title} 
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                  {capsuleData.caption && (
                    <p className="mt-4 text-gray-700 font-serif">{capsuleData.caption}</p>
                  )}
                </div>
              )}
              
              {selectedType.id === 'goals-milestones' && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Your Goal:</h4>
                  <p className="whitespace-pre-line text-gray-800 mb-4 font-serif">{capsuleData.goal}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Milestones:</h4>
                  <ul className="space-y-2">
                    {capsuleData.milestones?.map((milestone, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-800">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {['inspirational', 'prediction', 'letters', 'reminders'].includes(selectedType.id) && (
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line font-serif">
                  {capsuleData.content}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Edit
            </button>
            
            <button
              onClick={handleCreateCapsule}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center"
            >
              <LockIcon className="h-4 w-4 mr-2" />
              Lock Time Capsule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCapsule;