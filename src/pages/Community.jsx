import React from 'react';
import { MapPin, UserPlus, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';

function Community() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          id="community"
          title="Community Features"
          subtitle="Connect and share with others around you"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={MapPin}
            title="Nearby Idea Sharing"
            description="Discover and share memory ideas with others in your area"
            onClick={() => console.log('Nearby Idea Sharing clicked')}
            className="border-t-4 border-blue-600"
          />

          <FeatureCard
            icon={UserPlus}
            title="Add Family or Nearby Members"
            description="Connect with family and friends to build shared memories together"
            onClick={() => console.log('Add Members clicked')}
            className="border-t-4 border-green-600"
          />

          <FeatureCard
            icon={Share2}
            title="Feed Sharing"
            description="Share selected memories to your personal feed for friends to see"
            onClick={() => console.log('Feed Sharing clicked')}
            className="border-t-4 border-orange-600"
          />
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Community Events</h3>
              <p className="mb-6 text-gray-100">
                Join local memory-making events and connect with others who share your interests.
              </p>
              <Link
                to="/events"
                className="inline-block bg-white text-blue-600 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold uppercase tracking-wide"
              >
                Explore Events
              </Link>
            </div>
            <div className="md:w-1/2 p-8">
              <h4 className="font-semibold text-gray-900 mb-4">Upcoming Near You</h4>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-600 mr-3"></div>
                  <span className="text-gray-700 text-sm">Photography Walk - Central Park</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-600 mr-3"></div>
                  <span className="text-gray-700 text-sm">Family History Workshop</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mr-3"></div>
                  <span className="text-gray-700 text-sm">Digital Scrapbooking Class</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;