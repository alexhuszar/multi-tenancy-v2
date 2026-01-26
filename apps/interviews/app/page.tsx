import Link from 'next/link';
import { tests } from './utils';

export default function Index() {
  return (
    <>
      <div className="mb-10 text-center md:mb-16">
        <h1 className="mb-3 text-3xl font-bold text-gray-800 md:text-4xl">
          Technical Interview Preparation
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Browse through our curated collection of interview questions to help
          you prepare for your next technical interview.
        </p>
      </div>

      <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Questions
            </h2>
            <p className="mt-1 text-gray-600">
              Select a question to begin your practice
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2">
            <span className="font-bold text-blue-700">{tests.length}</span>
            <span className="ml-2 text-blue-600">Total Questions</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Interview Questions
          </h2>
        </div>

        <ul className="divide-y divide-gray-100">
          {tests.map((item, index) => (
            <li
              key={item.id}
              className="transition-colors duration-150 hover:bg-gray-50"
            >
              <Link href={`/interviews/${item.id}`} className="block">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <span className="font-semibold text-blue-700">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="mb-1 font-medium text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Practice this question to improve your interview
                            skills
                          </p>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <span className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                            Practice Now
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                          <span>Difficulty</span>
                          <span className="font-medium text-blue-600">
                            Medium
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            style={{
                              width: `${Math.min(100, 30 + ((index * 10) % 70))}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-medium text-gray-800">{tests.length}</span>{' '}
            interview questions
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5">
          <h3 className="mb-2 font-semibold text-gray-800">Tips for Success</h3>
          <p className="text-sm text-gray-600">
            Practice consistently, understand the problem before coding, and
            communicate your thought process clearly.
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-5">
          <h3 className="mb-2 font-semibold text-gray-800">Time Management</h3>
          <p className="text-sm text-gray-600">
            Allocate time for each question based on difficulty. Start with
            easier ones to build confidence.
          </p>
        </div>

        <div className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-white p-5">
          <h3 className="mb-2 font-semibold text-gray-800">Track Progress</h3>
          <p className="text-sm text-gray-600">
            Keep notes on questions you've practiced and revisit challenging
            ones regularly.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        <p>
          Select any question above to begin your interview preparation journey.
        </p>
        <p className="mt-1">Good luck with your interviews!</p>
      </div>
    </>
  );
}
