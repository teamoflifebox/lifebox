import { useState } from 'react';
import { AlertCircleIcon } from 'lucide-react';

const CapsuleFormReminders = ({ data, onChange }) => {
  const [charCount, setCharCount] = useState(data.content?.length || 0);
  const maxChars = 1000;
  
  const handleContentChange = (e) => {
    const content = e.target.value;
    setCharCount(content.length);
    onChange({ content });
  };
  
  const handleImportanceChange = (importance) => {
    onChange({ importance });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reminder Importance
        </label>
        <div className="flex space-x-2">
          {['Low', 'Medium', 'High', 'Critical'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleImportanceChange(level.toLowerCase())}
              className={`flex-1 py-2 px-3 rounded-md border transition-all duration-300 ${
                data.importance === level.toLowerCase()
                  ? `bg-orange-${level === 'Low' ? '100' : level === 'Medium' ? '200' : level === 'High' ? '300' : '400'} border-orange-${level === 'Low' ? '200' : level === 'Medium' ? '300' : level === 'High' ? '400' : '500'} text-orange-${level === 'Low' ? '700' : level === 'Medium' ? '800' : level === 'High' ? '900' : '900'}`
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <div className="mb-2 flex justify-between items-center">
          <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">
            Reminder Content
          </label>
          <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        
        <textarea
          id="reminder"
          value={data.content || ''}
          onChange={handleContentChange}
          rows={6}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
            charCount > maxChars ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="What would you like to remind your future self about?"
        ></textarea>
        
        {charCount > maxChars && (
          <p className="mt-1 text-xs text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Your reminder is too long. Please shorten it.
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">
          Emotional Context (optional)
        </label>
        <input
          type="text"
          id="context"
          value={data.emotionalContext || ''}
          onChange={(e) => onChange({ emotionalContext: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="How do you feel about this reminder?"
        />
      </div>
      
      <div className="bg-orange-50 border border-orange-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-orange-800 mb-1">Tips for effective reminders:</h4>
        <ul className="text-xs text-orange-700 space-y-1 list-disc pl-4">
          <li>Be specific about what you want to remember</li>
          <li>Include why this is important to you</li>
          <li>Add emotional context to help your future self connect with the reminder</li>
          <li>Consider whether this reminder will still be relevant at the unlock date</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormReminders;