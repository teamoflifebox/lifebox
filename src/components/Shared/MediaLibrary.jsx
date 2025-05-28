import React, { useState } from 'react';
import { X, Upload, Search, Plus, ExternalLink } from 'lucide-react';

/**
 * @param {{ onClose: () => void, onSelect: (selectedImages: any[]) => void }} props
 */
function MediaLibrary({ onClose, onSelect }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeTab, setActiveTab] = useState('lifebox');

  // Sample media data for demo
  const sampleMedia = [
    { id: '1', src: 'https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Beach Sunset' },
    { id: '2', src: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Mountain View' },
    { id: '3', src: 'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'City Lights' },
    { id: '4', src: 'https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Forest Path' },
    { id: '5', src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Lake Reflection' },
    { id: '6', src: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Summer Beach' },
    { id: '7', src: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Autumn Leaves' },
    { id: '8', src: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Winter Snow' },
  ];

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleSelect = () => {
    const selectedMediaItems = sampleMedia.filter((media) => selectedImages.includes(media.id));
    onSelect(selectedMediaItems);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col border-2 border-solid border-slate-200 dark:border-slate-600">
        <div className="px-6 py-4 border-b-2 border-solid border-slate-200 dark:border-slate-600 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Media Library</h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="border-b-2 border-solid border-slate-200 dark:border-slate-600">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('lifebox')}
              className={`py-3 px-4 text-sm font-medium border-b-2 border-solid
                ${activeTab === 'lifebox'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
            >
              Lifebox Library
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-3 px-4 text-sm font-medium border-b-2 border-solid
                ${activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
            >
              Upload
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`py-3 px-4 text-sm font-medium border-b-2 border-solid
                ${activeTab === 'stock'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
            >
              Stock Photos
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-b-2 border-solid border-slate-200 dark:border-slate-600 flex items-center justify-between">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search media..."
              className="block w-full pl-10 pr-3 py-2 border-2 border-solid border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {activeTab === 'upload' ? (
            <button className="inline-flex items-center px-4 py-2 border-2 border-solid border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </button>
          ) : (
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <span>{selectedImages.length} selected</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'upload' ? (
            <div className="border-2 border-solid border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Drop files to upload</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Or click to browse from your computer
              </p>
              <button className="inline-flex items-center px-4 py-2 border-2 border-solid border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Select Files
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Supported formats: JPG, PNG, GIF, MP4, MOV
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sampleMedia.map((media) => (
                <div
                  key={media.id}
                  onClick={() => toggleImageSelection(media.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 border-solid
                    ${selectedImages.includes(media.id) ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}
                >
                  <img
                    src={media.src}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div
                      className={`h-8 w-8 rounded-full border-2 border-solid
                        ${selectedImages.includes(media.id)
                          ? 'bg-blue-500 border-blue-600'
                          : 'bg-white bg-opacity-30 border-white'}`}
                      style={{ borderColor: selectedImages.includes(media.id) ? '#3b82f6' : '#ffffff' }}
                    >
                      {selectedImages.includes(media.id) ? (
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <Plus className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>

                  {selectedImages.includes(media.id) && (
                    <div className="absolute top-2 right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-solid border-blue-600">
                      {selectedImages.indexOf(media.id) + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t-2 border-solid border-slate-200 dark:border-slate-600 flex items-center justify-between">
          {activeTab === 'stock' && (
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center"
            >
              Photos provided by Pexels
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}

          <div className="flex space-x-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 border-2 border-solid border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              disabled={selectedImages.length === 0}
              className={`px-4 py-2 border-2 border-solid border-transparent text-sm font-medium rounded-md shadow-sm text-white
                ${selectedImages.length === 0
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              Add Selected ({selectedImages.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaLibrary;
