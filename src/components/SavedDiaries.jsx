import React, { useEffect, useState } from 'react';

function SavedDiaries() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch diaries from localStorage or backend
    const storedDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    setDiaries(storedDiaries);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Saved Diaries</h1>
        {diaries.length === 0 ? (
          <p className="text-gray-600 text-center">No saved diaries yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diaries.map((diary) => (
              <div
                key={diary.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{diary.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {diary.content.length > 100 ? diary.content.slice(0, 97) + '...' : diary.content}
                </p>
                <p className="text-gray-500 text-xs">Saved on: {new Date(diary.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedDiaries;