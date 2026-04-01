import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Lead - BrindaWorld',
  description: 'Join competitions, climb the leaderboard, and lead the community',
};

export default function LeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BW</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Leadership Hub</span>
            </Link>

            <nav className="hidden sm:flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">
                Leaderboard
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">
                Achievements
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-pink-600 transition-colors">
                Community
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar - Leaderboard & Achievements */}
        <aside className="lg:col-span-1">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 sticky top-24">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Your Ranking</h4>
                <div className="text-3xl font-bold text-pink-600">#42</div>
                <p className="text-sm text-gray-500 mt-1">+3 positions this month</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Total Points</h4>
                <div className="text-3xl font-bold text-orange-500">2,485</div>
                <p className="text-sm text-gray-500 mt-1">From competitions & achievements</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Badges Earned</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-2xl">🥇</span>
                  <span className="text-2xl">🏆</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">🎯</span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium text-sm">
                View Full Profile
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {children}
        </main>
      </div>
    </div>
  );
}
