import React from 'react';
import { Link } from 'react-router-dom';

function LinkCard({ to, title, description, icon: Icon }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-blue-600"
    >
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
          <Icon size={24} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}

export default LinkCard;