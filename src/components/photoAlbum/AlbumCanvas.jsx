import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Assuming albumTypes.js is in the same directory
import '../../components/types/album'; // JSDoc types are available globally

/**
 * @param {{pages: Page[], currentPageIndex: number, onPageChange: (index: number) => void}} props
 */
const AlbumCanvas = ({ pages, currentPageIndex, onPageChange }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);

  const goToPreviousPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      setFlipDirection('left');
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
        onPageChange(currentPageIndex - 1);
      }, 500);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1 && !isFlipping) {
      setFlipDirection('right');
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
        onPageChange(currentPageIndex + 1);
      }, 500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPreviousPage();
      else if (e.key === 'ArrowRight') goToNextPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, pages.length, isFlipping]);

  const currentPage = pages[currentPageIndex];

  return (
    <div className="relative flex justify-center items-center">
      <div
        className={`relative w-[800px] h-[500px] bg-white shadow-2xl rounded-sm transform perspective-1000
          ${isFlipping && flipDirection === 'left' ? 'animate-page-flip-left' : ''}
          ${isFlipping && flipDirection === 'right' ? 'animate-page-flip-right' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Album spine */}
        <div
          className="absolute left-1/2 top-0 h-full w-4 -ml-2 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 z-10"
          style={{ transform: 'translateZ(1px)' }}
        ></div>

        {/* Page content */}
        <div
          className="w-full h-full rounded-sm overflow-hidden flex"
          style={{ backgroundColor: currentPage?.backgroundColor || '#ffffff' }}
        >
          {currentPage?.layout === 'single' ? (
            <div className="w-full h-full p-8 flex items-center justify-center">
              {currentPage.images.length === 0 ? (
                <div className="w-full h-full border-2 border-solid border-slate-300 dark:border-slate-600 rounded-md flex items-center justify-center">
                  <p className="text-slate-400 dark:text-slate-500 text-center">
                    Add images to this page<br />from the media panel
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {currentPage.images.map((image) => (
                    <div
                      key={image.id}
                      className="absolute border-2 border-solid border-slate-300 dark:border-slate-600"
                      style={{
                        left: `${image.x}px`,
                        top: `${image.y}px`,
                        width: `${image.width}px`,
                        height: `${image.height}px`,
                        transform: `rotate(${image.rotation}deg)`,
                        zIndex: image.zIndex || 0,
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.caption || 'Album image'}
                        className="w-full h-full object-cover"
                      />
                      {image.caption && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-1">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                  {currentPage.decorations.map((decoration) => (
                    <div
                      key={decoration.id}
                      className="absolute border-2 border-solid border-slate-300 dark:border-slate-600"
                      style={{
                        left: `${decoration.x}px`,
                        top: `${decoration.y}px`,
                        width: `${decoration.width}px`,
                        height: `${decoration.height}px`,
                        transform: `rotate(${decoration.rotation}deg)`,
                        zIndex: decoration.zIndex,
                      }}
                    >
                      {decoration.type === 'text' ? (
                        <span className="text-slate-600 dark:text-slate-400">
                          {decoration.content}
                        </span>
                      ) : (
                        <img
                          src={decoration.content}
                          alt={decoration.type}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex">
              <div className="w-1/2 h-full p-4 border-r-2 border-solid border-slate-200 dark:border-slate-600">
                <div className="w-full h-full border-2 border-solid border-slate-300 dark:border-slate-600 rounded-md flex items-center justify-center">
                  {currentPage.images
                    .filter((_, idx) => idx % 2 === 0)
                    .map((image) => (
                      <div
                        key={image.id}
                        className="absolute border-2 border-solid border-slate-300 dark:border-slate-600"
                        style={{
                          left: `${image.x}px`,
                          top: `${image.y}px`,
                          width: `${image.width}px`,
                          height: `${image.height}px`,
                          transform: `rotate(${image.rotation}deg)`,
                          zIndex: image.zIndex || 0,
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.caption || 'Album image'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  <p className="text-slate-400 dark:text-slate-500 text-center">Left page</p>
                </div>
              </div>
              <div className="w-1/2 h-full p-4">
                <div className="w-full h-full border-2 border-solid border-slate-300 dark:border-slate-600 rounded-md flex items-center justify-center">
                  {currentPage.images
                    .filter((_, idx) => idx % 2 === 1)
                    .map((image) => (
                      <div
                        key={image.id}
                        className="absolute border-2 border-solid border-slate-300 dark:border-slate-600"
                        style={{
                          left: `${image.x}px`,
                          top: `${image.y}px`,
                          width: `${image.width}px`,
                          height: `${image.height}px`,
                          transform: `rotate(${image.rotation}deg)`,
                          zIndex: image.zIndex || 0,
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.caption || 'Album image'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  <p className="text-slate-400 dark:text-slate-500 text-center">Right page</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page number */}
        <div className="absolute bottom-2 right-4 text-xs text-slate-400">
          {currentPageIndex + 1}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPageIndex === 0 || isFlipping}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full
          ${currentPageIndex === 0 || isFlipping ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'}`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNextPage}
        disabled={currentPageIndex === pages.length - 1 || isFlipping}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full
          ${currentPageIndex === pages.length - 1 || isFlipping ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'}`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AlbumCanvas;