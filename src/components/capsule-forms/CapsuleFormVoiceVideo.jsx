import { useState } from 'react';
import { MicIcon, VideoIcon, AlertCircleIcon } from 'lucide-react';

const CapsuleFormVoiceVideo = ({ data, onChange }) => {
  const [error, setError] = useState('');
  
  const handleMediaUrlChange = (e) => {
    const url = e.target.value;
    onChange({ mediaUrl: url });
    
    // Validate the URL format
    if (url && !url.match(/^https?:\/\/.+\.(mp3|wav|ogg|mp4|webm)$/i)) {
      setError('Please enter a valid audio or video URL (mp3, wav, ogg, mp4, webm)');
    } else {
      setError('');
    }
  };
  
  const handleTranscriptChange = (e) => {
    onChange({ transcript: e.target.value });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Audio or Video URL
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
            placeholder="https://example.com/recording.mp3"
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            {error}
          </p>
        )}
        
        <p className="mt-1 text-xs text-gray-500">
          Enter a URL to an audio or video file. For security, direct uploads are not supported.
        </p>
      </div>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => onChange({ content: 'Audio diary entry placeholder' })}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-md text-indigo-700 hover:bg-indigo-100 transition-colors duration-300"
        >
          <MicIcon className="h-5 w-5 mr-2" />
          Audio Diary
        </button>
        
        <button
          type="button"
          onClick={() => onChange({ content: 'Video diary entry placeholder' })}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-md text-indigo-700 hover:bg-indigo-100 transition-colors duration-300"
        >
          <VideoIcon className="h-5 w-5 mr-2" />
          Video Diary
        </button>
      </div>
      
      <div>
        <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-1">
          Transcript or Notes (optional)
        </label>
        <textarea
          id="transcript"
          value={data.transcript || ''}
          onChange={handleTranscriptChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Add a transcript or notes about this recording..."
        ></textarea>
      </div>
      
      <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-md">
        <h4 className="text-sm font-medium text-indigo-800 mb-1">Tips for meaningful recordings:</h4>
        <ul className="text-xs text-indigo-700 space-y-1 list-disc pl-4">
          <li>Speak naturally, as if you're talking to your future self</li>
          <li>Share your current thoughts, feelings, and daily life</li>
          <li>Include details about your surroundings or the current date</li>
          <li>Ask questions to your future self to reflect on later</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsuleFormVoiceVideo;