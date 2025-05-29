import { useState } from 'react';
import { ImageIcon, UploadIcon, AlertCircleIcon } from 'lucide-react';

const CapsuleFormPhotosVideos = ({ data, onChange }) => {
  const [error, setError] = useState('');
  
  const handleMediaUrlChange = (e) => {
    const url = e.target.value;
    onChange({ mediaUrl: url });
    
    // Validate the URL format
    if (url && !url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i)) {
      setError('Please enter a valid image or video URL (jpg, png, gif, webp, mp4, webm)');
    } else {
      setError('');
    }
  };
  
  const handleCaptionChange = (e) => {
    onChange({ caption: e.target.value });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image or Video URL
        </label>
        <div className="flex">
          <input
            type="text"
            id="mediaUrl"
            value={data.mediaUrl || ''}
            onChange={handleMediaUrlChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            {error}
          </p>
        )}
        
        <p className="mt-1 text-xs text-gray-500">
          Enter a URL to an image or video. For security, direct uploads are not supported.
        </p>
      </div>
      
      {data.mediaUrl && !error && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img 
            src={data.mediaUrl} 
            alt="Preview" 
            className="w-full h-auto"
            onError={() => setError('Unable to load image. Please check the URL.')}
          />
        </div>
      )}
      
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
          Caption (optional)
        </label>
        <textarea
          id="caption"
          value={data.caption || ''}
          onChange={handleCaptionChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Add a caption to your media..."
        ></textarea>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Tips for great visual memories:</h4>
        <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
          <li>Choose images that capture the essence of your current life</li>
          <li>Include context in the caption that might not be obvious from the image</li>
          <li>Consider side-by-side "before" images for transformation goals</li>
          <li>For videos, brief is often better - capture a meaningful moment</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormPhotosVideos;