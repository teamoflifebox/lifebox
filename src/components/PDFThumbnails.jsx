import React from 'react';

const PDFThumbnails = ({ pages, currentPage, onPageSelect }) => {
  return (
    <div className="w-20 sm:w-28 bg-gray-200 dark:bg-gray-800 rounded-lg p-2 overflow-y-auto flex flex-col items-center gap-2">
      {pages.map((page) => (
        <div 
          key={page}
          className={`w-full aspect-[3/4] bg-white dark:bg-gray-700 rounded overflow-hidden cursor-pointer transition-all ${
            currentPage === page 
              ? 'ring-2 ring-amber-500 transform scale-105' 
              : 'hover:ring-1 hover:ring-gray-400 dark:hover:ring-gray-500'
          }`}
          onClick={() => onPageSelect(page)}
        >
          {/* Mock thumbnail content */}
          <div className="w-full h-full p-1 flex flex-col items-center">
            <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 mb-1 rounded-sm"></div>
            <div className="w-full flex-1 flex flex-col gap-0.5">
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
              <div className="w-3/4 h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
              <div className="w-1/2 h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            </div>
            <div className="text-[8px] text-gray-500 dark:text-gray-400 mt-auto">
              {page}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PDFThumbnails;