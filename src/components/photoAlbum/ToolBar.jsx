import React from 'react';
import { Layout, Image, PaintBucket, Sparkles } from 'lucide-react';

/**
 * @param {{ 
 *   activeTab: 'layouts' | 'media' | 'decorations' | 'ai', 
 *   setActiveTab: (tab: 'layouts' | 'media' | 'decorations' | 'ai') => void, 
 *   onAddImage: () => void, 
 *   onAIGenerate: () => void 
 * }} props
 */
function ToolBar({ activeTab, setActiveTab, onAddImage, onAIGenerate }) {
  const tools = [
    { id: 'layouts', name: 'Layouts', icon: Layout },
    { id: 'media', name: 'Media', icon: Image },
    { id: 'decorations', name: 'Decorations', icon: PaintBucket },
    { id: 'ai', name: 'AI Assistant', icon: Sparkles },
  ];

  return (
    <div className="w-16 border-r-2 border-solid border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 flex flex-col items-center py-4">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTab === tool.id;

        return (
          <button
            key={tool.id}
            className={`w-12 h-12 flex flex-col items-center justify-center rounded-md mb-2 text-xs border-2 border-solid
              ${isActive
                ? 'bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-700'
                : 'text-slate-600 border-slate-200 hover:bg-slate-100 dark:text-slate-400 dark:border-slate-600 dark:hover:bg-slate-700'}
            `}
            onClick={() => {
              setActiveTab(tool.id);
              if (tool.id === 'media') {
                // Optional: trigger media library
                // onAddImage();
              } else if (tool.id === 'ai') {
                // Optional: trigger AI generation
                // onAIGenerate();
              }
            }}
          >
            <Icon
              className={`h-5 w-5 mb-1 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}
            />
            <span>{tool.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ToolBar;