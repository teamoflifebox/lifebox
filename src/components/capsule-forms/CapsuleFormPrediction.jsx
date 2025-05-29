import { useState } from 'react';
import { AlertCircleIcon } from 'lucide-react';

const CapsuleFormPrediction = ({ data, onChange }) => {
  const [charCount, setCharCount] = useState(data.content?.length || 0);
  const maxChars = 2000;
  
  const handleContentChange = (e) => {
    const content = e.target.value;
    setCharCount(content.length);
    onChange({ content });
  };
  
  const predictionTemplates = [
    { 
      title: 'Technology', 
      content: 'I think the next big technological advancement will be...'
    },
    { 
      title: 'Personal Growth', 
      content: 'In the future, I believe I will have changed in these ways...'
    },
    { 
      title: 'World Events', 
      content: 'My prediction for what will happen in the world by the time this capsule opens...'
    }
  ];
  
  const applyTemplate = (template) => {
    onChange({ content: template.content });
    setCharCount(template.content.length);
  };
  
  const handleConfidenceChange = (confidence) => {
    onChange({ confidence });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex justify-between items-center">
          <label htmlFor="prediction" className="block text-sm font-medium text-gray-700">
            Your Prediction
          </label>
          <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        
        <textarea
          id="prediction"
          value={data.content || ''}
          onChange={handleContentChange}
          rows={6}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            charCount > maxChars ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="What do you predict will happen by the time this capsule is opened?"
        ></textarea>
        
        {charCount > maxChars && (
          <p className="mt-1 text-xs text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Your prediction is too long. Please shorten it.
          </p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confidence Level
        </label>
        <div className="flex space-x-2">
          {['Just Guessing', 'Somewhat Sure', 'Confident', 'Absolutely Certain'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleConfidenceChange(level.toLowerCase().replace(' ', '-'))}
              className={`flex-1 py-2 px-3 rounded-md border transition-all duration-300 text-sm ${
                data.confidence === level.toLowerCase().replace(' ', '-')
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Prediction Starters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {predictionTemplates.map((template, index) => (
            <button
              key={index}
              type="button"
              onClick={() => applyTemplate(template)}
              className="p-3 border border-green-200 rounded-md bg-green-50 hover:bg-green-100 transition-colors duration-300 text-left"
            >
              <h5 className="font-medium text-green-800 text-sm mb-1">{template.title}</h5>
              <p className="text-xs text-green-700 line-clamp-2">{template.content}</p>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-green-800 mb-1">Tips for interesting predictions:</h4>
        <ul className="text-xs text-green-700 space-y-1 list-disc pl-4">
          <li>Be specific rather than general</li>
          <li>Include your reasoning behind the prediction</li>
          <li>Consider technology, society, personal life, or world events</li>
          <li>Think about how you'll feel reading this prediction when the capsule opens</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormPrediction;