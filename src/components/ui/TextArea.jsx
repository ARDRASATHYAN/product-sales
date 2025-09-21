import React from 'react';

const TextArea = ({label,error,...props}) => {
    return <div>
         <div className="flex flex-col gap-1 mb-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <textarea
          {...props}
         className={`border p-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        />
          {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>;
}



export default TextArea;