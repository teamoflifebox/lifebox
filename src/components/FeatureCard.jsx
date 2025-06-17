import React from 'react';
import { Icon } from '@iconify/react'; // or use HeroIcons

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-5 shadow-md border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon icon={icon} className="text-blue-600 text-2xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
