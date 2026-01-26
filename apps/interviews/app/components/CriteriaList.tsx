import React from 'react';
import { Criteria } from '../types';

interface CriteriaListProps {
  criteria: Criteria[];
}

const CriteriaList: React.FC<CriteriaListProps> = ({ criteria }) => {
  return (
    <div className="mt-12 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Evaluation Criteria
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {criteria.map((criterion, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 transition-all duration-300 hover:shadow-md`}
          >
            <div className="mb-3 flex items-center gap-3">
              <div>
                <h3 className="font-bold text-gray-800">{criterion.title}</h3>
                <p className="text-sm font-semibold text-gray-600">
                  {criterion.percentage}% weight
                </p>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              {criterion.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaList;
