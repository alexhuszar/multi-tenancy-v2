import React, { useState } from 'react';
import { Test } from '../types';

interface TestCardProps {
  test: Test;
  onStartTest: (testId: number) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, onStartTest }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusText = () => {
    switch (test.status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  const getColorClasses = () => {
    switch (test.color) {
      case 'blue':
        return {
          border: 'border-blue-500',
          bg: 'from-blue-50 to-white',
          badge: 'bg-blue-100 text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700',
          hintBg: 'bg-blue-50',
          hintText: 'text-blue-800',
          icon: 'text-blue-600',
        };
      case 'green':
        return {
          border: 'border-green-500',
          bg: 'from-green-50 to-white',
          badge: 'bg-green-100 text-green-800',
          button: 'bg-green-600 hover:bg-green-700',
          hintBg: 'bg-green-50',
          hintText: 'text-green-800',
          icon: 'text-green-600',
        };
      case 'purple':
        return {
          border: 'border-purple-500',
          bg: 'from-purple-50 to-white',
          badge: 'bg-purple-100 text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700',
          hintBg: 'bg-purple-50',
          hintText: 'text-purple-800',
          icon: 'text-purple-600',
        };
      case 'yellow':
        return {
          border: 'border-yellow-500',
          bg: 'from-yellow-50 to-white',
          badge: 'bg-yellow-100 text-yellow-800',
          button: 'bg-yellow-600 hover:bg-yellow-700',
          hintBg: 'bg-yellow-50',
          hintText: 'text-yellow-800',
          icon: 'text-yellow-600',
        };
      default:
        return {
          border: 'border-gray-500',
          bg: 'from-gray-50 to-white',
          badge: 'bg-gray-100 text-gray-800',
          button: 'bg-gray-600 hover:bg-gray-700',
          hintBg: 'bg-gray-50',
          hintText: 'text-gray-800',
          icon: 'text-gray-600',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div
      className={`overflow-hidden rounded-xl border-l-4 bg-white shadow-md ${colors.border} transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`bg-gradient-to-r ${colors.bg} p-6`}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{test.title}</h2>
            <p className="text-gray-600">{test.subtitle}</p>
          </div>
          <div
            className={`${colors.badge} whitespace-nowrap rounded-full px-4 py-2 font-bold`}
          >
            {test.time}
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-medium text-gray-700">Requirements:</span>
          </div>
          <div className="space-y-4">
            {test.requirements.map((req, idx) => (
              <div key={req.id} className="border-l-2 border-gray-200 pl-4">
                <div
                  className="flex cursor-pointer items-center gap-2 font-medium text-gray-800 hover:text-gray-900"
                  onClick={() =>
                    setExpanded(expanded === (idx === 0) ? false : idx === 0)
                  }
                >
                  {req.title}
                  <span className="text-sm font-normal text-gray-500">
                    ({req.description})
                  </span>
                </div>
                <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-600">
                  {req.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {req.codeHint && (
                  <div className={`mt-3 rounded-lg p-4 ${colors.hintBg}`}>
                    <div className="mb-2 flex items-center gap-2">
                      •
                      <span className={`font-medium ${colors.hintText}`}>
                        Code Hint
                      </span>
                    </div>
                    <pre className="code-block overflow-x-auto rounded bg-gray-800 p-4 text-sm text-gray-100">
                      {req.codeHint}
                    </pre>
                  </div>
                )}

                {req.uiHint && (
                  <div className={`mt-3 rounded-lg p-4 ${colors.hintBg}`}>
                    <div className="mb-2 flex items-center gap-2">
                      •
                      <span className={`font-medium ${colors.hintText}`}>
                        UI Components Needed
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">{req.uiHint}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${
                test.status === 'completed'
                  ? 'text-green-600'
                  : test.status === 'in-progress'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
              }`}
            >
              {getStatusText()}
            </span>
          </div>
          <button
            onClick={() => onStartTest(test.id)}
            className={`${colors.button} flex items-center gap-2 rounded-lg px-6 py-2 font-medium text-white transition duration-200`}
          >
            •{test.status === 'not-started' ? 'Start Test' : 'Continue Test'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
