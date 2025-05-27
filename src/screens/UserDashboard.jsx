import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ diaries: 0, vaults: 0, libraryItems: 0 });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    const vaults = JSON.parse(localStorage.getItem('vaults')) || [];
    const libraryItems = JSON.parse(localStorage.getItem('libraryItems')) || [];
    setStats({
      diaries: diaries.length,
      vaults: vaults.length,
      libraryItems: libraryItems.length,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user?.name || 'User'}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Diaries</h2>
            <p className="text-2xl font-bold text-blue-600">{stats.diaries}</p>
            <Link to="/saved" className="mt-2 text-blue-600 hover:underline text-sm">
              View Diaries
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Vaults</h2>
            <p className="text-2xl font-bold text-blue-600">{stats.vaults}</p>
            <Link to="/community" className="mt-2 text-blue-600 hover:underline text-sm">
              View Vaults
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Library Items</h2>
            <p className="text-2xl font-bold text-blue-600">{stats.libraryItems}</p>
            <Link to="/library/recent" className="mt-2 text-blue-600 hover:underline text-sm">
              View Recent
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dairy"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Write Diary
            </Link>
            <Link
              to="/create-vault"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Create Vault
            </Link>
            <Link
              to="/timecapsule"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Create Time Capsule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;