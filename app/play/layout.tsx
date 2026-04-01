import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Play - BrindaWorld',
  description: 'Play interactive games and explore learning modules',
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BW</span>
              </div>
              <span className="font-bold text-lg text-gray-900">BrindaWorld</span>
            </Link>

            {/* Progress Indicator */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Your Journey
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                  style={{ width: '33%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Keep learning, keep growing
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Learn More
              </button>
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow">
                Save Progress
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
