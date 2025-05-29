import { useState } from 'react';
import { AlertCircleIcon } from 'lucide-react';

const CapsuleFormPrivateMessage = ({ data, onChange }) => {
  const [charCount, setCharCount] = useState(data.content?.length || 0);
  const maxChars = 2000;
  
  const handleContentChange = (e) => {
    const content = e.target.value;
    setCharCount(content.length);
    onChange({ content });
  };
  
  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message to Your Future Self
        </label>
        <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
          {charCount}/{maxChars}
        </span>
      </div>
      
      <textarea
        id="message"
        value={data.content || ''}
        onChange={handleContentChange}
        rows={8}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
          charCount > maxChars ? 'border-red-300' : 'border-gray-300'
        }`}
        placeholder="What would you like to tell your future self?"
      ></textarea>
      
      {charCount > maxChars && (
        <p className="mt-1 text-xs text-red-500 flex items-center">
          <AlertCircleIcon className="h-3 w-3 mr-1" />
          Your message is too long. Please shorten it.
        </p>
      )}
      
      <div className="mt-4 bg-purple-50 border border-purple-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-purple-800 mb-1">Tips for a meaningful message:</h4>
        <ul className="text-xs text-purple-700 space-y-1 list-disc pl-4">
          <li>Reflect on your current goals and aspirations</li>
          <li>Share your thoughts about your present circumstances</li>
          <li>Ask questions to your future self</li>
          <li>Include things you might forget over time</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormPrivateMessage;