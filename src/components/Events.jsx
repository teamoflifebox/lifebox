import React, { useEffect, useState } from 'react';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch events from localStorage or backend
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Community Events</h1>
        {events.length === 0 ? (
          <p className="text-gray-600 text-center">No upcoming events.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                <p className="text-gray-500 text-xs">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-500 text-xs">Location: {event.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;