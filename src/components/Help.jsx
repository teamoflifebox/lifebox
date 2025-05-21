import React, { useState } from 'react';
import backgroundImg from '../assets/image.png';

const faqs = [
  {
    question: 'What is LifeBox?',
    answer:
      'LifeBox is your digital space to store memories, documents, and life events securely in one place.',
  },
  {
    question: 'How do I create a family tree?',
    answer:
      'Go to the "Heritage Family" section and click "Create Family". Fill out the form to begin building your digital family tree.',
  },
  {
    question: 'Can I recover deleted data?',
    answer:
      'Yes, we maintain a 30-day recycle bin for accidentally deleted items. Visit "Settings > Trash" to restore them.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use end-to-end encryption and secure cloud storage to protect your data at all times.',
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 h-[90vh] flex flex-col justify-center overflow-hidden">
        <h1 className="sr-only">Help Center</h1> {/* Hides visually but accessible */}
        <div className="space-y-5 overflow-y-auto px-2">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-xl p-5 shadow-md backdrop-blur-sm transition hover:shadow-lg cursor-pointer"
              onClick={() => toggleAccordion(idx)}
            >
              <h2 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                {item.question}
                <span className="text-blue-700 font-bold">
                  {openIndex === idx ? '-' : '+'}
                </span>
              </h2>
              {openIndex === idx && (
                <p className="text-gray-700 mt-2">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
