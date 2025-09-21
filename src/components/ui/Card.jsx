
import React from 'react';

const Card = ({ title, children }) => {
  return (
    <>
      <div className="border rounded p-4 shadow bg-white mb-4">
        {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
        {children}
      </div>
    </>
  );
};

export default Card;
