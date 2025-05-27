import React, { useState } from 'react';
import { Mail, Book, Camera, Film, Headphones, PenTool, BookOpen, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';

function Library() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const startTextToSpeech = async (text) => {
    setIsPlaying(true);
    setCurrentBook('Sample Book Title');
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentBook(null);
    }, 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          id="library"
          title="Memory Library"
          subtitle="Your personal collection of moments, memories, and books"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Mail}
            title="Time Capsule"
            description="Create digital time capsules with traditional letter options for future you"
            onClick={() => console.log('Time Capsule clicked')}
            className="border-t-4 border-blue-600"
          />

          <FeatureCard
            icon={Book}
            title="Diary"
            description="Record your daily thoughts and moments in a secure, private journal"
            onClick={() => console.log('Diary clicked')}
            className="border-t-4 border-green-600"
          />

          <FeatureCard
            icon={Camera}
            title="Photo Collections"
            description="Organize and browse your photos in beautiful collections"
            onClick={() => console.log('Photo Collections clicked')}
            className="border-t-4 border-orange-600"
          />

          <FeatureCard
            icon={Film}
            title="Video Memories"
            description="Store and revisit your favorite video moments with smart organization"
            onClick={() => console.log('Video Memories clicked')}
            className="border-t-4 border-purple-600"
          />
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Library</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="Read Books"
              description="Access our vast library of digital books and publications"
              onClick={() => console.log('Read Books clicked')}
              className="border-t-4 border-blue-600"
            />

            <FeatureCard
              icon={PenTool}
              title="Write & Publish"
              description="Create and publish your own books and stories"
              onClick={() => console.log('Write clicked')}
              className="border-t-4 border-green-600"
            />

            <FeatureCard
              icon={Headphones}
              title="Listen with AI"
              description="Convert any text to natural-sounding speech"
              onClick={() => startTextToSpeech('Sample text for speech synthesis')}
              className="border-t-4 border-purple-600"
            />

            <FeatureCard
              icon={Upload}
              title="Import Books"
              description="Import your existing digital books and documents"
              onClick={() => console.log('Import clicked')}
              className="border-t-4 border-orange-600"
            />
          </div>
        </div>

        {isPlaying && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-blue-600">
              Now playing: {currentBook}
            </p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recently Added</h3>
              <p className="text-gray-600 mb-6">
                You've added 24 new memories and 3 books this week. Here are some highlights from your recent additions.
              </p>
              <Link
                to="/library/recent"
                className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold uppercase tracking-wide"
              >
                View All
              </Link>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-3 p-4">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Library;