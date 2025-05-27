import React from 'react';
import { Scissors, Image, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';

function Editing() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          id="editing"
          title="Editing & Family Tools"
          subtitle="Enhance your memories and share them with loved ones"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Scissors}
            title="Video Trimming"
            description="Easily trim and edit your videos to capture the perfect moment"
            onClick={() => console.log('Video Trimming clicked')}
            className="border-t-4 border-blue-600"
          />

          <FeatureCard
            icon={Image}
            title="Photo Editing"
            description="Basic photo editing tools to enhance your visual memories"
            onClick={() => console.log('Photo Editing clicked')}
            className="border-t-4 border-green-600"
          />

          <FeatureCard
            icon={Users}
            title="Family Vault"
            description="Share and explore memories with your family members"
            onClick={() => console.log('Family Vault clicked')}
            className="border-t-4 border-orange-600"
          />

          <FeatureCard
            icon={Star}
            title="Memory Enhancer"
            description="AI-powered tools to improve and organize your memories"
            onClick={() => console.log('Memory Enhancer clicked')}
            className="border-t-4 border-purple-600"
          />
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Sharing</h3>
          <p className="text-gray-600 mb-6">
            Create a shared vault to collaborate on family memories. Add family members and start building your collective story.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/create-vault"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold uppercase tracking-wide"
            >
              Create Family Vault
            </Link>
            <Link
              to="/join-vault"
              className="bg-white text-blue-600 px-5 py-2.5 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors duration-200 font-semibold uppercase tracking-wide"
            >
              Join Existing Vault
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Editing;