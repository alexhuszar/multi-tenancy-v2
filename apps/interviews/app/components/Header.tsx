import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="mb-10">
      <h1 className="mb-2 text-4xl font-bold text-gray-800">
        Fullstack Developer Interview Assessment
      </h1>
      <p className="mb-4 text-gray-600">
        Node.js + React Position | 4 Test Groups | Estimated time: 3-4 hours
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2">
          <span className="font-medium text-blue-800">
            Technical Implementation
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2">
          <span className="font-medium text-green-800">Backend API</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2">
          <span className="font-medium text-purple-800">Frontend UI</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2">
          <span className="font-medium text-yellow-800">Advanced Features</span>
        </div>
      </div>
    </header>
  );
};
