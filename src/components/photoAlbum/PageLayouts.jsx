import React from 'react';

function PageLayouts({ onSelectLayout, currentLayout }) {
  const layouts = [
    { id: 'single', name: 'Single Image', description: 'Full page with one large image' },
    { id: 'double', name: 'Two Images', description: 'Page split into two equal sections' },
    { id: 'triple', name: 'Three Images', description: 'One large, two small images' },
    { id: 'grid', name: 'Grid', description: 'Equal-sized grid of 4 images' },
    { id: 'collage', name: 'Collage', description: 'Overlapping images with different sizes' },
    { id: 'polaroid', name: 'Polaroid', description: 'Polaroid-style frames with captions' }
  ];

  return (
    <div className="p-4">
      <h3 className="font-medium text-slate-900 dark:text-white mb-3">Page Layouts</h3>
      <div className="space-y-3">
        {layouts.map((layout) => (
          <div 
            key={layout.id}
            onClick={() => onSelectLayout(layout.id)}
            className={`cursor-pointer border rounded-md p-3 transition
              ${currentLayout === layout.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}
            `}
          >
            <div className="flex justify-between items-center">
              <h4 className={`font-medium ${currentLayout === layout.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                {layout.name}
              </h4>
              {currentLayout === layout.id && (
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              )}
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {layout.description}
            </p>
            
            <div className={`mt-2 h-12 w-full border dark:border-slate-600 rounded bg-white dark:bg-slate-700 flex items-center justify-center
              ${currentLayout === layout.id ? 'border-blue-200 dark:border-blue-800' : ''}
            `}>
              {layout.id === 'single' && (
                <div className="w-10/12 h-8 bg-slate-200 dark:bg-slate-600 rounded"></div>
              )}
              {layout.id === 'double' && (
                <div className="flex w-10/12 h-8 space-x-2">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded"></div>
                  <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded"></div>
                </div>
              )}
              {layout.id === 'triple' && (
                <div className="flex w-10/12 h-8 space-x-2">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded"></div>
                  <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded"></div>
                  </div>
                </div>
              )}
              {layout.id === 'grid' && (
                <div className="grid grid-cols-2 gap-1 w-10/12 h-8">
                  <div className="bg-slate-200 dark:bg-slate-600 rounded"></div>
                  <div className="bg-slate-200 dark:bg-slate-600 rounded"></div>
                  <div className="bg-slate-200 dark:bg-slate-600 rounded"></div>
                  <div className="bg-slate-200 dark:bg-slate-600 rounded"></div>
                </div>
              )}
              {layout.id === 'collage' && (
                <div className="relative w-10/12 h-8">
                  <div className="absolute top-0 left-0 w-7 h-5 bg-slate-200 dark:bg-slate-600 rounded transform -rotate-3"></div>
                  <div className="absolute bottom-0 left-4 w-6 h-4 bg-slate-300 dark:bg-slate-500 rounded transform rotate-6"></div>
                  <div className="absolute top-1 right-3 w-5 h-5 bg-slate-300 dark:bg-slate-500 rounded"></div>
                </div>
              )}
              {layout.id === 'polaroid' && (
                <div className="flex w-10/12 h-8 space-x-2 justify-center">
                  <div className="w-5 h-7 bg-white border border-slate-200 dark:border-slate-600 rounded">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-600 rounded-t"></div>
                    <div className="w-full h-1 mt-1 bg-slate-300 dark:bg-slate-500 mx-auto"></div>
                  </div>
                  <div className="w-5 h-7 bg-white border border-slate-200 dark:border-slate-600 rounded transform rotate-3">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-600 rounded-t"></div>
                    <div className="w-full h-1 mt-1 bg-slate-300 dark:bg-slate-500 mx-auto"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageLayouts;