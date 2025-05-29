import { useState } from 'react';
import { AlertCircleIcon } from 'lucide-react';

const CapsuleFormInspirational = ({ data, onChange }) => {
  const [charCount, setCharCount] = useState(data.content?.length || 0);
  const maxChars = 1500;
  
  const handleContentChange = (e) => {
    const content = e.target.value;
    setCharCount(content.length);
    onChange({ content });
  };
  
  const handleSourceChange = (e) => {
    onChange({ source: e.target.value });
  };
  
  const inspirationalTemplates = [
    { 
      title: 'Motivational Quote', 
      content: '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
      source: 'Eleanor Roosevelt'
    },
    { 
      title: 'Personal Mantra', 
      content: 'I am capable, strong, and resilient. Every challenge I face is an opportunity to grow.',
      source: 'Personal mantra'
    },
    { 
      title: 'Poem Excerpt', 
      content: 'Two roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.',
      source: 'Robert Frost, "The Road Not Taken"'
    }
  ];
  
  const applyTemplate = (template) => {
    onChange({ 
      content: template.content,
      source: template.source
    });
    setCharCount(template.content.length);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex justify-between items-center">
          <label htmlFor="inspirational" className="block text-sm font-medium text-gray-700">
            Inspirational Content
          </label>
          <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        
        <textarea
          id="inspirational"
          value={data.content || ''}
          onChange={handleContentChange}
          rows={6}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
            charCount > maxChars ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter a quote, poem, passage, or other inspirational content..."
        ></textarea>
        
        {charCount > maxChars && (
          <p className="mt-1 text-xs text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Your content is too long. Please shorten it.
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
          Source (optional)
        </label>
        <input
          type="text"
          id="source"
          value={data.source || ''}
          onChange={handleSourceChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="Author, book, or personal reflection"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {inspirationalTemplates.map((template, index) => (
            <button
              key={index}
              type="button"
              onClick={() => applyTemplate(template)}
              className="p-3 border border-yellow-200 rounded-md bg-yellow-50 hover:bg-yellow-100 transition-colors duration-300 text-left"
            >
              <h5 className="font-medium text-yellow-800 text-sm mb-1">{template.title}</h5>
              <p className="text-xs text-yellow-700 line-clamp-2">{template.content}</p>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 mb-1">Why create an inspirational capsule?</h4>
        <ul className="text-xs text-yellow-700 space-y-1 list-disc pl-4">
          <li>Preserve the words that move you today for future reflection</li>
          <li>Create a gift of wisdom for your future self</li>
          <li>Capture your current perspective and values</li>
          <li>Share meaningful content that might provide comfort or guidance later</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormInspirational;