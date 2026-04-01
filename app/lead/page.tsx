'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/components/providers/AnalyticsProvider';

interface Competition {
  id: string;
  title: string;
  type: 'active' | 'upcoming';
  startDate: string;
  endDate: string;
  participants: number;
  prize: string;
  category: string;
  description: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  achievements: number;
  trend: 'up' | 'down' | 'stable';
  avatar: string;
}

const COMPETITIONS: Competition[] = [
  {
    id: 'chess-spring-2026',
    title: 'Spring Chess Championship',
    type: 'active',
    startDate: '2026-04-01',
    endDate: '2026-05-31',
    participants: 342,
    prize: 'Certificates + Scholarships',
    category: 'Chess',
    description: 'Compete in rapid and blitz chess tournaments',
  },
  {
    id: 'coding-challenge-2026',
    title: 'Code Quest: Algorithm Challenge',
    type: 'active',
    startDate: '2026-04-15',
    endDate: '2026-06-15',
    participants: 278,
    prize: 'Tech Internships',
    category: 'Coding',
    description: 'Solve algorithmic challenges and climb the rankings',
  },
  {
    id: 'world-quiz-2026',
    title: 'Global Geography Quiz Bowl',
    type: 'upcoming',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    participants: 0,
    prize: 'Travel Grants',
    category: 'Geography',
    description: 'Test your knowledge of world geography and cultures',
  },
  {
    id: 'stem-project-2026',
    title: 'STEM Innovation Project Fair',
    type: 'upcoming',
    startDate: '2026-06-01',
    endDate: '2026-07-31',
    participants: 0,
    prize: 'Lab Equipment + Mentorship',
    category: 'STEM',
    description: 'Build and present innovative projects solving real-world problems',
  },
];

const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Sarah Chen',
    points: 4850,
    achievements: 24,
    trend: 'up',
    avatar: '👩‍💻',
  },
  {
    rank: 2,
    name: 'Aisha Patel',
    points: 4620,
    achievements: 22,
    trend: 'down',
    avatar: '👩‍🎓',
  },
  {
    rank: 3,
    name: 'Maria Garcia',
    points: 4390,
    achievements: 20,
    trend: 'up',
    avatar: '👩‍🔬',
  },
  {
    rank: 4,
    name: 'Zoe Anderson',
    points: 3950,
    achievements: 18,
    trend: 'stable',
    avatar: '👩‍🎨',
  },
  {
    rank: 5,
    name: 'Emma Thompson',
    points: 3720,
    achievements: 17,
    trend: 'down',
    avatar: '👩‍🏫',
  },
];

export default function LeadPage() {
  const { trackPageView } = useAnalytics();
  const [activeTab, setActiveTab] = useState<'competitions' | 'leaderboard'>('competitions');

  useEffect(() => {
    trackPageView('/lead', 'lead');
  }, [trackPageView]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 sm:p-12 text-white space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold">Lead the Community</h1>
        <p className="text-lg text-pink-100 max-w-2xl">
          Compete in tournaments, climb the leaderboard, and earn badges to become a BrindaWorld leader.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('competitions')}
          className={`pb-4 px-1 font-medium transition-colors border-b-2 ${
            activeTab === 'competitions'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Competitions
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-4 px-1 font-medium transition-colors border-b-2 ${
            activeTab === 'leaderboard'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Leaderboard
        </button>
      </div>

      {/* Competitions Tab */}
      {activeTab === 'competitions' && (
        <div className="space-y-8">
          {/* Active Competitions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Competitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPETITIONS.filter((c) => c.type === 'active').map((comp) => (
                <div
                  key={comp.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-20 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      LIVE
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{comp.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{comp.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Participants</p>
                        <p className="font-bold text-gray-900">{comp.participants}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="font-bold text-gray-900">{comp.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Prize</p>
                        <p className="font-bold text-pink-600">See More</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
                        Join Now
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:border-pink-300 transition-colors font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Competitions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Competitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPETITIONS.filter((c) => c.type === 'upcoming').map((comp) => (
                <div
                  key={comp.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow opacity-75"
                >
                  <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-20 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      COMING SOON
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{comp.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{comp.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Starts</p>
                        <p className="font-bold text-gray-900">{comp.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Prize</p>
                        <p className="font-bold text-gray-900">{comp.prize}</p>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:border-pink-300 transition-colors font-medium">
                      Notify Me
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Points
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Achievements
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {LEADERBOARD.map((entry) => (
                    <tr key={entry.rank} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                          {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                          {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                          {entry.rank > 3 && (
                            <span className="font-bold text-gray-600">#{entry.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{entry.avatar}</span>
                          <span className="font-semibold text-gray-900">{entry.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-pink-600">{entry.points}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-gray-600">{entry.achievements}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {entry.trend === 'up' && (
                          <span className="text-green-600 font-semibold">↑</span>
                        )}
                        {entry.trend === 'down' && (
                          <span className="text-red-600 font-semibold">↓</span>
                        )}
                        {entry.trend === 'stable' && (
                          <span className="text-gray-600 font-semibold">→</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:border-pink-300 transition-colors font-medium">
            View Full Leaderboard
          </button>
        </div>
      )}
    </div>
  );
}
