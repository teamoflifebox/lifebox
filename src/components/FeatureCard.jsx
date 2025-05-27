import React from 'react';

function FeatureCard({ icon: Icon, title, description, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
          <Icon size={24} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;