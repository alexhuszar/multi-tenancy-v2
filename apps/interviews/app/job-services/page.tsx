import React, { useState } from 'react';
import { Header } from '../components/Header';
import ProgressOverview from '../components/ProgressOverview';
import TestCard from '../components/TestCard';
import EvaluationCriteria from '../components/CriteriaList';
import { tests, evaluationCriteria } from '../utils/data';
import { Test } from '../types';
import { Footer } from '../components/Footer';

const App: React.FC = () => {
  const [allTests, setAllTests] = useState<Test[]>(tests);
  const [showAllTests, setShowAllTests] = useState(false);

  const handleStartTest = (testId: number) => {
    setAllTests((prevTests) =>
      prevTests.map((test) =>
        test.id === testId ? { ...test, status: 'in-progress' as const } : test,
      ),
    );

    // In a real app, you would navigate to the test interface
    alert(
      `Starting Test ${testId}\n\nTimer will begin. Good luck!\n\nThis would navigate to the coding environment.`,
    );
  };

  const handleCompleteAll = () => {
    setAllTests((prevTests) =>
      prevTests.map((test) => ({ ...test, status: 'completed' as const })),
    );
  };

  const handleResetAll = () => {
    setAllTests((prevTests) =>
      prevTests.map((test) => ({ ...test, status: 'not-started' as const })),
    );
  };

  const handleStartAll = () => {
    setAllTests((prevTests) =>
      prevTests.map((test) => ({ ...test, status: 'in-progress' as const })),
    );
  };

  const displayedTests = showAllTests ? allTests : allTests.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <ProgressOverview tests={allTests} />

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={handleStartAll}
            className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-indigo-700"
          >
            Start All Tests
          </button>
          <button
            onClick={handleCompleteAll}
            className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-green-700"
          >
            Mark All Complete
          </button>
          <button
            onClick={handleResetAll}
            className="rounded-lg bg-gray-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-gray-700"
          >
            Reset All Tests
          </button>
          <button
            onClick={() => setShowAllTests(!showAllTests)}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
          >
            {showAllTests ? 'Show Less' : 'Show All Tests'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {displayedTests.map((test) => (
            <TestCard key={test.id} test={test} onStartTest={handleStartTest} />
          ))}
        </div>

        <EvaluationCriteria criteria={evaluationCriteria} />

        <Footer />
      </div>
    </div>
  );
};

export default App;
