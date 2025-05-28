import React, { useState } from 'react';
import { Search, Film, Music, Upload } from 'lucide-react';

/**
 * @typedef {Object} VideoClip
 * @property {string} id - Unique identifier for the clip
 * @property {string} name - Name of the clip
 * @property {'video' | 'audio'} type - Type of media
 * @property {number} duration - Duration in seconds
 * @property {string} [thumbnail] - Optional thumbnail URL for video clips
 */

/**
 * @param {{ mediaItems: VideoClip[], onAddClip: (clip: VideoClip) => void }} props
 */
function MediaPanel({ mediaItems, onAddClip }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = mediaItems.filter((item) => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b-2 border-solid border-slate-200 dark:border-slate-600">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search media..."
            className="block w-full pl-10 pr-3 py-1.5 text-xs border-2 border-solid border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-2 flex space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1 px-2 text-xs font-medium rounded border-2 border-solid
              ${filter === 'all'
                ? 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-white dark:border-slate-600'
                : 'text-slate-600 border-slate-200 dark:text-slate-400 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`flex-1 py-1 px-2 text-xs font-medium rounded flex items-center justify-center border-2 border-solid
              ${filter === 'video'
                ? 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-white dark:border-slate-600'
                : 'text-slate-600 border-slate-200 dark:text-slate-400 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
          >
            <Film className="h-3 w-3 mr-1" />
            Video
          </button>
          <button
            onClick={() => setFilter('audio')}
            className={`flex-1 py-1 px-2 text-xs font-medium rounded flex items-center justify-center border-2 border-solid
              ${filter === 'audio'
                ? 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-white dark:border-slate-600'
                : 'text-slate-600 border-slate-200 dark:text-slate-400 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
          >
            <Music className="h-3 w-3 mr-1" />
            Audio
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-medium text-slate-900 dark:text-white">Media Library</h3>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <Upload className="h-3 w-3 inline mr-1" />
            Upload
          </button>
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-32 border-2 border-solid border-slate-200 dark:border-slate-600 rounded-md">
            <Search className="h-8 w-8 text-slate-400 dark:text-slate-500 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {searchTerm ? 'No matches found' : 'No media available'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group p-2 border-2 border-solid border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-grab flex"
                onClick={() => onAddClip(item)}
                draggable
              >
                {item.type === 'video' ? (
                  <div className="w-14 h-10 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden flex-shrink-0 border-2 border-solid border-slate-300 dark:border-slate-600">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-14 h-10 bg-purple-100 dark:bg-purple-900/30 rounded overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-solid border-purple-200 dark:border-purple-800">
                    <Music className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                  </div>
                )}

                <div className="ml-2 flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <span className="mr-2">{item.duration.toFixed(1)}s</span>
                    {item.type === 'video' ? (
                      <Film className="h-3 w-3 text-blue-500" />
                    ) : (
                      <Music className="h-3 w-3 text-purple-500" />
                    )}
                  </div>
                </div>

                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 py-1 px-2 border-2 border-solid border-blue-200 dark:border-blue-700 rounded">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaPanel;
