import { useState } from 'react';
import { AtSignIcon, AlertCircleIcon } from 'lucide-react';

const CapsuleFormLetters = ({ data, onChange }) => {
  const [charCount, setCharCount] = useState(data.content?.length || 0);
  const [recipient, setRecipient] = useState(data.recipient || '');
  const maxChars = 3000;
  
  const handleContentChange = (e) => {
    const content = e.target.value;
    setCharCount(content.length);
    onChange({ content });
  };
  
  const handleRecipientChange = (e) => {
    const recipientValue = e.target.value;
    setRecipient(recipientValue);
    onChange({ recipient: recipientValue });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
          Recipient
        </label>
        <div className="flex">
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-l-md px-3">
            <AtSignIcon className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={handleRecipientChange}
            className="flex-grow px-3 py-2 border-y border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Name or email of recipient"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          This is who your letter is addressed to. They will be notified when the capsule unlocks if you choose to share it.
        </p>
      </div>
      
      <div>
        <div className="mb-2 flex justify-between items-center">
          <label htmlFor="letter" className="block text-sm font-medium text-gray-700">
            Your Letter
          </label>
          <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        
        <textarea
          id="letter"
          value={data.content || ''}
          onChange={handleContentChange}
          rows={8}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
            charCount > maxChars ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Write your letter here..."
        ></textarea>
        
        {charCount > maxChars && (
          <p className="mt-1 text-xs text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Your letter is too long. Please shorten it.
          </p>
        )}
      </div>
      
      <div className="bg-pink-50 border border-pink-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-pink-800 mb-1">Tips for heartfelt letters:</h4>
        <ul className="text-xs text-pink-700 space-y-1 list-disc pl-4">
          <li>Speak from the heart with authentic emotions</li>
          <li>Share memories or experiences you've had together</li>
          <li>Express gratitude for their presence in your life</li>
          <li>Consider what you might want to say if you couldn't see them for a long time</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormLetters;