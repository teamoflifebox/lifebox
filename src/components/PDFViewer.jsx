import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Minus, Search, BookmarkIcon, RotateCw, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import PDFControls from './PDFControls';
import PDFThumbnails from './PDFThumbnails';
import { useBooks } from '../context/BooksContext';

const PDFViewer = ({ book, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(book.totalPages || 1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { updateBookProgress, addBookmark } = useBooks();
  const containerRef = useRef(null);
  
  const mockPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  useEffect(() => {
    const newProgress = Math.round((currentPage / totalPages) * 100);
    updateBookProgress(book.id, newProgress);
    
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentPage, totalPages, book.id, updateBookProgress]);
  
  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };
  
  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };
  
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') handleNextPage();
    if (e.key === 'ArrowLeft') handlePrevPage();
    if (e.key === '+') handleZoomIn();
    if (e.key === '-') handleZoomOut();
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, totalPages, zoom]);
  
  const handleAddBookmark = () => {
    addBookmark(book.id, currentPage, '');
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]" ref={containerRef}>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </button>
        
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search in document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button 
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setIsSearchOpen(false)}
              >
                ✕
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          
          <button 
            onClick={handleRotate}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCw className="h-5 w-5" />
          </button>
          
          <button 
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 rounded-full ${showThumbnails ? 'bg-amber-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'} transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          
          <button 
            onClick={handleFullscreen}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 gap-4 overflow-hidden">
        {showThumbnails && (
          <PDFThumbnails 
            pages={mockPages} 
            currentPage={currentPage}
            onPageSelect={setCurrentPage}
          />
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-t-lg p-2 flex justify-between items-center">
            <h2 className="font-bold text-gray-900 dark:text-white truncate max-w-md">
              {book.title}
            </h2>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <span>{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
          </div>
          
          <div className="flex-1 bg-gray-300 dark:bg-gray-900 overflow-auto p-4 flex justify-center">
            <div 
              className="bg-white dark:bg-gray-800 shadow-lg rounded transition-all duration-200 overflow-hidden"
              style={{ 
                width: `${zoom}%`, 
                maxWidth: '100%',
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'top center'
              }}
            >
              <div className="p-8 min-h-[800px] flex flex-col">
                <h1 className="text-3xl font-bold mb-6">Chapter {currentPage}: {book.title}</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                  
                  <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                  
                  <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                  
                  <h2>Section {currentPage}.1</h2>
                  
                  <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                  
                  <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                </div>
              </div>
            </div>
          </div>
          
          <PDFControls 
            currentPage={currentPage}
            totalPages={totalPages}
            zoom={zoom}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onPageChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
            onBookmark={handleAddBookmark}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;