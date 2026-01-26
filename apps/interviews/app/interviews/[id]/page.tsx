import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { tests } from '../../utils/data';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = tests.find((item) => item.id === id);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">Test not found!</div>
      </div>
    );
  }

  const colors = {
    badge: `bg-${data.color}-100 text-${data.color}-800`,
    hintBg: `bg-${data.color}-50`,
    hintText: `text-${data.color}-800`,
    icon: `text-${data.color}-600`,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="overflow-hidden bg-white transition-all duration-300">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {data.title}
                </h2>
                <p className="text-gray-600">{data.subtitle}</p>
              </div>
              <div
                className={`${colors.badge} whitespace-nowrap rounded-full px-4 py-2 font-bold`}
              >
                {data.time}
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-medium text-gray-700">Requirements:</span>
              </div>
              <div className="space-y-4">
                {data.requirements.map((req, idx) => (
                  <div key={req.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      {req.title}
                      <span className="text-sm font-normal text-gray-500">
                        ({req.description})
                      </span>
                    </div>
                    <ol className="ml-6 mt-2 list-disc space-y-2 text-sm text-gray-600 marker:font-medium marker:text-gray-500">
                      {req.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <span className="block pl-4 -indent-4">{item}</span>
                        </li>
                      ))}
                    </ol>

                    {req.codeHint && (
                      <div className={`mt-3 rounded-lg p-4 ${colors.hintBg}`}>
                        <div className="mb-2 flex items-center gap-2">
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
                          <span className={`font-medium ${colors.hintText}`}>
                            UI Components Needed
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          {req.uiHint}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
