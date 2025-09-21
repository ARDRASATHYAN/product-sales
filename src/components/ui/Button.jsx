import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <>
      <button
        {...props}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
