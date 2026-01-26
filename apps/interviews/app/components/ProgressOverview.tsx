import React from 'react';
import { Test } from '../types';

interface ProgressOverviewProps {
  tests: Test[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ tests }) => {
  const completedTests = tests.filter((t) => t.status === 'completed').length;
  const inProgressTests = tests.filter(
    (t) => t.status === 'in-progress',
  ).length;
  const overallProgress = Math.round((completedTests / tests.length) * 100);

  const getTestProgress = (testId: number) => {
    const test = tests.find((t) => t.id === testId);
    if (!test) return 0;

    switch (test.status) {
      case 'completed':
        return 100;
      case 'in-progress':
        return 50;
      default:
        return 0;
    }
  };

  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Assessment Progress
      </h2>

      <div className="mb-6">
        <div className="mb-1 flex justify-between">
          <span className="font-medium text-gray-700">Overall Completion</span>
          <span className="font-bold text-gray-700">{overallProgress}%</span>
        </div>
        <div className="h-4 w-full rounded-full bg-gray-200">
          <div
            className="progress-bar h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {tests.map((test) => {
          const progress = getTestProgress(test.id);
          const getColor = () => {
            switch (test.color) {
              case 'blue':
                return 'bg-blue-100 text-blue-800 border-blue-200';
              case 'green':
                return 'bg-green-100 text-green-800 border-green-200';
              case 'purple':
                return 'bg-purple-100 text-purple-800 border-purple-200';
              case 'yellow':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
              default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
            }
          };

          return (
            <div
              key={test.id}
              className={`rounded-lg border p-4 text-center ${getColor()}`}
            >
              <div className="mb-1 text-2xl font-bold">{test.id}</div>
              <div className="mb-2 text-sm font-medium">
                {test.title.split(':')[0]}
              </div>
              <div className="mb-2 h-2 w-full rounded-full bg-gray-300">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor:
                      test.color === 'blue'
                        ? '#3b82f6'
                        : test.color === 'green'
                          ? '#10b981'
                          : test.color === 'purple'
                            ? '#8b5cf6'
                            : '#f59e0b',
                  }}
                ></div>
              </div>
              <div className="text-xs">
                {progress === 100
                  ? 'Completed'
                  : progress > 0
                    ? 'In Progress'
                    : 'Not Started'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
            <span className="text-sm text-gray-600">
              Not Started:
              {tests.filter((t) => t.status === 'not-started').length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600">
              In Progress: {inProgressTests}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">
              Completed: {completedTests}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
