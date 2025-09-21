import React from "react";


export default function DisplayGrid({ data, renderItem, emptyState}) {
  if (!data || !data.length) {
    return (
      emptyState || <div className="text-center text-gray-500">No data available.</div>
    );
  }

  return (
    <div
     className={`grid grid-cols-1 sm:grid-cols-3 gap-2`}
    >
      {data.map((item, index) => (
        <div key={index} className="bg-white shadow rounded p-4">
          {renderItem ? renderItem(item, index) : JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
}
