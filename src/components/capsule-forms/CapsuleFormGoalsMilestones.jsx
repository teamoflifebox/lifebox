import { useState } from 'react';
import { PlusIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';

const CapsuleFormGoalsMilestones = ({ data, onChange }) => {
  const [newMilestone, setNewMilestone] = useState('');
  
  const handleGoalChange = (e) => {
    onChange({ goal: e.target.value });
  };
  
  const handleAddMilestone = () => {
    if (!newMilestone.trim()) return;
    
    const milestones = data.milestones || [];
    onChange({ milestones: [...milestones, newMilestone.trim()] });
    setNewMilestone('');
  };
  
  const handleRemoveMilestone = (index) => {
    const milestones = [...(data.milestones || [])];
    milestones.splice(index, 1);
    onChange({ milestones });
  };
  
  const handleMilestoneKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMilestone();
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
          Your Goal
        </label>
        <textarea
          id="goal"
          value={data.goal || ''}
          onChange={handleGoalChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Describe your goal in detail..."
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Milestones
        </label>
        
        <div className="space-y-2 mb-4">
          {data.milestones?.map((milestone, index) => (
            <div 
              key={index} 
              className="flex items-center bg-teal-50 p-2 rounded-md border border-teal-100"
            >
              <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2">
                {index + 1}
              </div>
              <p className="flex-grow text-teal-800 text-sm">{milestone}</p>
              <button
                type="button"
                onClick={() => handleRemoveMilestone(index)}
                className="text-teal-500 hover:text-red-500 transition-colors duration-300"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {(!data.milestones || data.milestones.length === 0) && (
            <p className="text-sm text-gray-500 italic">
              Add milestones to track your progress toward this goal.
            </p>
          )}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            onKeyDown={handleMilestoneKeyDown}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Add a milestone..."
          />
          <button
            type="button"
            onClick={handleAddMilestone}
            disabled={!newMilestone.trim()}
            className={`px-3 py-2 rounded-r-md flex items-center ${
              newMilestone.trim()
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors duration-300`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {(!data.milestones || data.milestones.length < 2) && (
        <p className="text-xs text-amber-600 flex items-center">
          <AlertCircleIcon className="h-3 w-3 mr-1" />
          Add at least 2 milestones to track your progress effectively.
        </p>
      )}
      
      <div className="bg-teal-50 border border-teal-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-teal-800 mb-1">Tips for effective goals:</h4>
        <ul className="text-xs text-teal-700 space-y-1 list-disc pl-4">
          <li>Make your goal specific and measurable</li>
          <li>Break your goal into achievable milestones</li>
          <li>Set realistic timeframes for each milestone</li>
          <li>Include why this goal matters to you</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormGoalsMilestones;