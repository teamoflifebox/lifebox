import React from "react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-r from-cyan-50 to-gray-100 py-20 px-4 sm:px-8 text-center font-sans"
    >
      <h2 className="text-4xl sm:text-5xl mb-12 bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent font-extrabold">
        Pricing Plans
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 max-w-[1100px] mx-auto">
        {/* Basic Plan */}
        <article className="bg-white/90 p-10 rounded-2xl shadow-xl transition-all duration-400 backdrop-blur-md border border-black/5 hover:-translate-y-3 hover:shadow-[0_12px_30px_rgba(0,188,212,0.3)] relative">
          <h3 className="text-2xl mb-4 text-gray-800 font-semibold">Basic</h3>
          <p className="text-lg mb-6 text-gray-600 font-bold">$10/month</p>
          <ul className="space-y-2 text-gray-700 text-base">
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Access to tutorials
            </li>
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Community support
            </li>
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Basic tools
            </li>
          </ul>
          <button className="mt-6 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-medium transition duration-300">
            Choose Basic
          </button>
        </article>

        {/* Pro Plan - Highlighted */}
        <article className="bg-white p-10 rounded-2xl shadow-2xl border-4 border-cyan-400 scale-105 transition-transform duration-300">
          <h3 className="text-2xl mb-4 text-gray-800 font-semibold">Pro</h3>
          <p className="text-lg mb-6 text-gray-600 font-bold">$30/month</p>
          <ul className="space-y-2 text-gray-700 text-base">
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              All Basic features
            </li>
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Advanced tools
            </li>
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Priority support
            </li>
          </ul>
          <button className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition duration-300">
            Choose Pro
          </button>
        </article>

        {/* Enterprise Plan */}
        <article className="bg-white/90 p-10 rounded-2xl shadow-xl transition-all duration-400 backdrop-blur-md border border-black/5 hover:-translate-y-3 hover:shadow-[0_12px_30px_rgba(0,188,212,0.3)] relative">
          <h3 className="text-2xl mb-4 text-gray-800 font-semibold">Enterprise</h3>
          <p className="text-lg mb-6 text-gray-600 font-bold">Contact us</p>
          <ul className="space-y-2 text-gray-700 text-base">
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Custom solutions
            </li>
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Dedicated support
            </li>
            <li className="flex items-center justify-center gap-2 before:content-['✓'] before:text-cyan-500 before:font-bold">
              Consulting services
            </li>
          </ul>
          <button className="mt-6 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-medium transition duration-300">
            Contact Sales
          </button>
        </article>
      </div>
    </section>
  );
};

export default Pricing;
