import React from 'react';

function SectionTitle({ title, subtitle, id }) {
  return (
    <div className="mb-8" id={id}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 text-base">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;