import React, { useState } from 'react';
import { Scissors, Wand2, Sparkles, VolumeX, Volume2, Mic, Sliders } from 'lucide-react';

/**
 * @typedef {Object} ToolsPanelProps
 * @property {() => void} onAIAutoCut - Function to trigger AI auto-cut feature
 */

/**
 * ToolsPanel component for video editing tools and properties
 * @param {ToolsPanelProps} props - Component props
 * @returns {JSX.Element}
 */
function ToolsPanel({ onAIAutoCut }) {
  const [activeProperty, setActiveProperty] = useState(null);

  return (
    <div>
      <div className="w-64 border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col">
        <div className="p-3 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-2">Tools</h3>
          <div className="grid grid-cols-4 gap-2">
            <button className="flex flex-col items-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <Scissors className="h-5 w-5 mb-1" />
              <span className="text-xs">Cut</span>
            </button>
            <button className="flex flex-col items-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <Sliders className="h-5 w-5 mb-1" />
              <span className="text-xs">Adjust</span>
            </button>
            <button className="flex flex-col items-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <Wand2 className="h-5 w-5 mb-1" />
              <span className="text-xs">Effects</span>
            </button>
            <button
              onClick={onAIAutoCut}
              className="flex flex-col items-center p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            >
              <Sparkles className="h-5 w-5 mb-1" />
              <span className="text-xs">AI Cut</span>
            </button>
          </div>
        </div>

        <div className="p-3 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-2">Properties</h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveProperty(activeProperty === 'transform' ? null : 'transform')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded flex items-center justify-between
                ${activeProperty === 'transform' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}
              `}
            >
              <span>Transform & Position</span>
              <span>{activeProperty === 'transform' ? '−' : '+'}</span>
            </button>

            {activeProperty === 'transform' && (
              <div className="px-3 py-2 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Scale</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Rotation</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    defaultValue="0"
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">X Position</label>
                    <input
                      type="number"
                      defaultValue="0"
                      className="block w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Y Position</label>
                    <input
                      type="number"
                      defaultValue="0"
                      className="block w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveProperty(activeProperty === 'effects' ? null : 'effects')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded flex items-center justify-between
                ${activeProperty === 'effects' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}
              `}
            >
              <span>Effects & Filters</span>
              <span>{activeProperty === 'effects' ? '−' : '+'}</span>
            </button>

            {activeProperty === 'effects' && (
              <div className="px-3 py-2 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Brightness</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Contrast</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Saturation</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveProperty(activeProperty === 'audio' ? null : 'audio')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded flex items-center justify-between
                ${activeProperty === 'audio' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}
              `}
            >
              <span>Audio Controls</span>
              <span>{activeProperty === 'audio' ? '−' : '+'}</span>
            </button>

            {activeProperty === 'audio' && (
              <div className="px-3 py-2 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Volume</label>
                  <div className="flex items-center space-x-2">
                    <VolumeX className="h-3 w-3 text-slate-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="80"
                      className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <Volume2 className="h-3 w-3 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-700 dark:text-slate-300">Voice-over</div>
                  <button className="inline-flex items-center px-2 py-1 border border-slate-300 dark:border-slate-600 text-xs font-medium rounded shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Mic className="h-3 w-3 mr-1 text-red-500" />
                    Record
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Background Music</label>
                  <select className="block w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>None</option>
                    <option>Upbeat</option>
                    <option>Emotional</option>
                    <option>Cinematic</option>
                    <option>Add custom...</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-3">
          <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <Sparkles className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Editing Tips</h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                  <p>Use the AI Auto-Cut tool to automatically identify and keep only the best parts of your video.</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={onAIAutoCut}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Try AI Auto-Cut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsPanel;
