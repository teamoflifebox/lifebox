import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateVault() {
  const [vaultName, setVaultName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!vaultName.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Placeholder: Save vault to localStorage or backend
    const vault = { id: Date.now(), name: vaultName, description, createdAt: new Date() };
    const storedVaults = JSON.parse(localStorage.getItem('vaults')) || [];
    localStorage.setItem('vaults', JSON.stringify([...storedVaults, vault]));
    setSuccess('Vault created successfully!');
    setTimeout(() => {
      navigate('/community');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Create a Vault</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="vault-name" className="block text-sm font-semibold text-gray-700 mb-2">
              Vault Name
            </label>
            <input
              id="vault-name"
              type="text"
              placeholder="Enter vault name"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your vault"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-gray-50 min-h-[100px]"
            />
          </div>
          {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm font-medium text-center">{success}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold uppercase tracking-wide hover:bg-blue-700 transition-colors duration-200 active:scale-95"
          >
            Create Vault
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVault;