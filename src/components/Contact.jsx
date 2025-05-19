import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-8 bg-white text-center"
    >
      <h2 className="text-3xl sm:text-4xl mb-4 text-gray-800 font-bold">
        Contact Us
      </h2>
      <p className="mb-8 text-base sm:text-lg text-gray-600">
        Questions? Reach out to us!
      </p>
      <form className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Your Message"
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        ></textarea>
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;