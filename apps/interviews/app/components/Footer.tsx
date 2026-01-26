export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-gray-800">
            Fullstack Developer Interview
          </h3>
          <p className="text-sm text-gray-600">
            Node.js + React Position | Version 1.0
          </p>
        </div>
        <div className="flex gap-4">
          <button className="rounded-lg bg-gray-800 px-6 py-2 font-medium text-white transition duration-200 hover:bg-gray-900">
            Export Assessment
          </button>
          <button className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition duration-200 hover:bg-indigo-700">
            Start All Tests
          </button>
        </div>
      </div>
    </footer>
  );
};
