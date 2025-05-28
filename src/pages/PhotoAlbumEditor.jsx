import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Download, Share2, ImagePlus, Plus } from 'lucide-react';
import AlbumCanvas from '../components/photoAlbum/AlbumCanvas';
import Toolbar from '../components/photoAlbum/ToolBar'
import PageLayouts from '../components/photoAlbum/PageLayouts';
import MediaLibrary from '../components/Shared/MediaLibrary';

// Default empty album with two pages
const createNewAlbum = () => ({
  id: `album-${Date.now()}`,
  name: 'Untitled Album',
  createdAt: new Date(),
  updatedAt: new Date(),
  pages: [
    { id: 'page-1', layout: 'single', images: [], backgroundColor: '#ffffff', decorations: [] },
    { id: 'page-2', layout: 'double', images: [], backgroundColor: '#ffffff', decorations: [] }
  ]
});

function PhotoAlbumEditor() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [activeTab, setActiveTab] = useState('layouts');
  const [album, setAlbum] = useState(createNewAlbum());
  const [currentPage, setCurrentPage] = useState(0);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSave = () => {
    console.log('Saving album:', album);
  };

  const handleAddPage = () => {
    const newPage = {
      id: `page-${album.pages.length + 1}`,
      layout: 'single',
      images: [],
      backgroundColor: '#ffffff',
      decorations: []
    };
    
    setAlbum(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      updatedAt: new Date()
    }));
  };

  const handlePageLayoutChange = (layout) => {
    setAlbum(prev => {
      const updatedPages = [...prev.pages];
      updatedPages[currentPage] = {
        ...updatedPages[currentPage],
        layout
      };
      return {
        ...prev,
        pages: updatedPages,
        updatedAt: new Date()
      };
    });
  };

  const handleAIGenerate = () => {
    alert("AI photo arrangement would be implemented here.");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-3 px-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            {album.name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {album.pages.length} pages • Last edited {album.updatedAt.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleSave} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-1" /> Save
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
            <Download className="h-4 w-4 mr-1" /> Export
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
            <Share2 className="h-4 w-4 mr-1" /> Share
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Toolbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onAddImage={() => setIsMediaLibraryOpen(true)}
          onAIGenerate={handleAIGenerate}
        />
        
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <AlbumCanvas 
              pages={album.pages}
              currentPageIndex={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {currentPage + 1} of {album.pages.length}
            </span>
            <button onClick={handleAddPage} className="inline-flex items-center px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
              <Plus className="h-4 w-4 mr-1" /> Add Page
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-y-auto">
          {activeTab === 'layouts' && (
            <PageLayouts onSelectLayout={handlePageLayoutChange} currentLayout={album.pages[currentPage]?.layout || 'single'} />
          )}
          {activeTab === 'media' && (
            <div className="p-4">
              <h3 className="font-medium text-slate-900 dark:text-white mb-3">Images on this page</h3>
              <button
                onClick={() => setIsMediaLibraryOpen(true)}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <ImagePlus className="h-5 w-5 mr-2 text-slate-400 dark:text-slate-500" /> Add Images
              </button>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {album.pages[currentPage]?.images.length === 0 ? (
                  <p className="col-span-2 text-center text-sm text-slate-500 dark:text-slate-400 py-4">
                    No images added yet
                  </p>
                ) : (
                  album.pages[currentPage]?.images.map((img, idx) => (
                    <div key={idx} className="bg-slate-100 dark:bg-slate-700 rounded-md h-16 w-full"></div>
                  ))
                )}
              </div>
            </div>
          )}
          {activeTab === 'decorations' && (
            <div className="p-4">
              <h3 className="font-medium text-slate-900 dark:text-white mu-3">Decorations</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Background Color
                </label>
                <input 
                  type="color" 
                  value={album.pages[currentPage]?.backgroundColor || '#ffffff'}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setAlbum(prev => {
                      const updatedPages = [...prev.pages];
                      updatedPages[currentPage] = {
                        ...updatedPages[currentPage],
                        backgroundColor: newColor
                      };
                      return {
                        ...prev,
                        pages: updatedPages,
                        updatedAt: new Date()
                      };
                    });
                  }}
                  className="h-8 w-8 rounded cursor-pointer"
                />
              </div>
            </div>
          )}
          {activeTab === 'ai' && (
            <div className="p-4">
              <h3 className="font-medium text-slate-900 dark:text-white mb-3">AI Assistant</h3>
              <button
                onClick={handleAIGenerate}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Generate Album Layout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Media Library Modal */}
      {isMediaLibraryOpen && (
        <MediaLibrary 
          onClose={() => setIsMediaLibraryOpen(false)} 
          onSelect={(selectedImages) => {
            setAlbum(prev => {
              const updatedPages = [...prev.pages];
              updatedPages[currentPage] = {
                ...updatedPages[currentPage],
                images: [...updatedPages[currentPage].images, ...selectedImages]
              };
              return {
                ...prev,
                pages: updatedPages,
                updatedAt: new Date()
              };
            });
            setIsMediaLibraryOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PhotoAlbumEditor;