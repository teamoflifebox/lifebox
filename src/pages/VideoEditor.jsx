import React, { useState } from 'react';
import { Play, Pause, Save, Download } from 'lucide-react';
import Timeline from '../components/videoEditor/TimeLine';
import MediaPanel from '../components/videoEditor/MediaPanel';
import PreviewPlayer from '../components/videoEditor/PreviewPlayer';
import ToolsPanel from '../components/videoEditor/ToolsPanel';
import { createNewProject } from '../components/types/video';

// Sample media items
const sampleClips = [
  {
    id: 'clip1',
    name: 'Beach Sunset',
    type: 'video',
    duration: 15.4,
    src: 'https://images.pexels.com/photos/1000654/pexels-photo-1000654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/1000654/pexels-photo-1000654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'clip2',
    name: 'Mountain View',
    type: 'video',
    duration: 12.2,
    src: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'clip3',
    name: 'City Timelapse',
    type: 'video',
    duration: 8.7,
    src: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'audio1',
    name: 'Upbeat Music',
    type: 'audio',
    duration: 120,
    src: '',
    thumbnail: '',
  },
  {
    id: 'audio2',
    name: 'Ambient Sounds',
    type: 'audio',
    duration: 60,
    src: '',
    thumbnail: '',
  },
];

/**
 * VideoEditor component
 * @returns {JSX.Element}
 */
function VideoEditor() {
  const [project, setProject] = useState(createNewProject());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState('media');

  const handleAddClip = (clip) => {
    setProject((prev) => {
      const updatedClips = [...prev.clips, clip];
      const totalDuration = updatedClips.reduce((total, clip) => total + clip.duration, 0);

      return {
        ...prev,
        clips: updatedClips,
        duration: totalDuration,
        updatedAt: new Date(),
      };
    });
  };

  const handleRemoveClip = (clipId) => {
    setProject((prev) => {
      const updatedClips = prev.clips.filter((clip) => clip.id !== clipId);
      const totalDuration = updatedClips.reduce((total, clip) => total + clip.duration, 0);

      return {
        ...prev,
        clips: updatedClips,
        duration: totalDuration,
        updatedAt: new Date(),
      };
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleAIAutoCut = () => {
    alert('AI auto-cut would be implemented here with a real service integration.');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-3 px-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {project.duration.toFixed(1)}s • Last edited {project.updatedAt.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </button>
          <button
            className="inline-flex items-center px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Top section: Preview and tools */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel - Media library/Effects */}
          <div className="w-56 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col">
            <div className="border-b border-slate-200 dark:border-slate-700 p-3">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('media')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded ${
                    activeTab === 'media'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Media
                </button>
                <button
                  onClick={() => setActiveTab('effects')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded ${
                    activeTab === 'effects'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Effects
                </button>
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded ${
                    activeTab === 'text'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Text
                </button>
              </div>
            </div>

            {activeTab === 'media' && <MediaPanel mediaItems={sampleClips} onAddClip={handleAddClip} />}

            {activeTab === 'effects' && (
              <div className="p-3 overflow-y-auto flex-1">
                <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-2">Transitions</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['Fade', 'Dissolve', 'Wipe', 'Slide', 'Zoom', 'None'].map((effect) => (
                    <div
                      key={effect}
                      className="bg-slate-100 dark:bg-slate-700 rounded-md py-2 text-center text-xs font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      {effect}
                    </div>
                  ))}
                </div>

                <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-2">Filters</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Vintage', 'Black & White', 'Sepia', 'Vibrant', 'Cool', 'Warm', 'Dramatic', 'Muted'].map((filter) => (
                    <div
                      key={filter}
                      className="bg-slate-100 dark:bg-slate-700 rounded-md py-2 text-center text-xs font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      {filter}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="p-3 overflow-y-auto flex-1">
                <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-2">Text Styles</h3>
                <div className="space-y-2 mb-4">
                  {['Title', 'Subtitle', 'Lower Third', 'Caption', 'Quote'].map((style) => (
                    <div
                      key={style}
                      className="bg-slate-100 dark:bg-slate-700 rounded-md py-2 text-center text-sm font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      {style}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Font Family</label>
                    <select className="block w-full pl-3 pr-10 py-1.5 text-xs border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                      <option>Sans Serif</option>
                      <option>Serif</option>
                      <option>Monospace</option>
                      <option>Handwritten</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Color</label>
                      <input type="color" className="h-6 w-full rounded cursor-pointer" defaultValue="#ffffff" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Size</label>
                      <select className="block w-full pl-3 pr-10 py-1.5 text-xs border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main preview area */}
          <div className="flex-1 bg-slate-900 p-4 flex flex-col items-center justify-center">
            <PreviewPlayer isPlaying={isPlaying} currentTime={currentTime} clips={project.clips} />

            <div className="mt-4 flex items-center space-x-3">
              <button
                onClick={handlePlayPause}
                className="p-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              <div className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(project.duration)}
              </div>
            </div>
          </div>

          {/* Right panel - Tools and properties */}
          <ToolsPanel onAIAutoCut={handleAIAutoCut} />
        </div>

        {/* Bottom section: Timeline */}
        <div className="h-48 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <Timeline
            clips={project.clips}
            currentTime={currentTime}
            duration={project.duration}
            onTimeUpdate={handleTimeUpdate}
            onRemoveClip={handleRemoveClip}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Helper function to format time in mm:ss format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default VideoEditor;
