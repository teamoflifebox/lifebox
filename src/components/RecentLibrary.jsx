import React, { useEffect, useState } from 'react';

function RecentLibrary() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch recent items from localStorage or backend
    const storedItems = JSON.parse(localStorage.getItem('libraryItems')) || [];
    setItems(storedItems.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)).slice(0, 10));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Recent Library Items</h1>
        {items.length === 0 ? (
          <p className="text-gray-600 text-center">No recent items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-2">Type: {item.type}</p>
                <p className="text-gray-500 text-xs">Added: {new Date(item.addedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentLibrary;