import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { features } from '../utils/featureData'; // create this

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
        Welcome to Lifebox NextGen
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Capture, create, and connect with your memories in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Home;
