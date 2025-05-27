import React from 'react';

function Terms() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <div className="prose text-gray-700">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to MyApp. By using our services, you agree to these Terms and Conditions. Please read them carefully.
          </p>
          <h2 className="text-xl font-semibold mb-4">2. User Responsibilities</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password. You agree to notify us
            immediately of any unauthorized use of your account.
          </p>
          <h2 className="text-xl font-semibold mb-4">3. Content Ownership</h2>
          <p className="mb-4">
            All content you upload (diaries, time capsules, library items) remains your property. By uploading, you grant
            MyApp a non-exclusive license to store and display your content as part of our services.
          </p>
          <h2 className="text-xl font-semibold mb-4">4. Prohibited Activities</h2>
          <p className="mb-4">
            You may not use MyApp for any illegal activities, including but not limited to uploading harmful content or
            violating others’ privacy.
          </p>
          <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate your account if you violate these terms.
          </p>
          <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            For questions about these terms, contact us at <a href="mailto:support@myapp.com" className="text-blue-600 hover:underline">support@myapp.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;