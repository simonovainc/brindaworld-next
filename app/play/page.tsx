'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/components/providers/AnalyticsProvider';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const MODULES: Module[] = [
  {
    id: 'chess',
    name: 'Chess Mastery',
    description: 'Learn strategy, tactics, and become a chess champion',
    icon: '♟️',
    color: 'from-slate-500 to-slate-600',
    progress: 45,
    difficulty: 'intermediate',
  },
  {
    id: 'coding',
    name: 'Coding Foundations',
    description: 'Master programming and build amazing projects',
    icon: '💻',
    color: 'from-blue-500 to-blue-600',
    progress: 28,
    difficulty: 'beginner',
  },
  {
    id: 'world-explorer',
    name: 'World Explorer',
    description: 'Discover geography, cultures, and global connections',
    icon: '🌍',
    color: 'from-green-500 to-green-600',
    progress: 62,
    difficulty: 'intermediate',
  },
  {
    id: 'career-discovery',
    name: 'Career Discovery',
    description: 'Explore 100+ careers and find your path',
    icon: '🚀',
    color: 'from-orange-500 to-orange-600',
    progress: 15,
    difficulty: 'beginner',
  },
  {
    id: 'stem-challenge',
    name: 'STEM Challenge',
    description: 'Solve real-world problems with science and technology',
    icon: '🔬',
    color: 'from-purple-500 to-purple-600',
    progress: 38,
    difficulty: 'advanced',
  },
  {
    id: 'leadership-lab',
    name: 'Leadership Lab',
    description: 'Develop leadership skills and inspire others',
    icon: '👑',
    color: 'from-pink-500 to-pink-600',
    progress: 52,
    difficulty: 'intermediate',
  },
];

export default function PlayPage() {
  const { trackPageView, trackModuleStart } = useAnalytics();
  const [modules, setModules] = useState<Module[]>(MODULES);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'not-started'>('all');

  useEffect(() => {
    trackPageView('/play', 'play');
  }, [trackPageView]);

  const filteredModules = modules.filter((module) => {
    if (filter === 'in-progress') return module.progress > 0 && module.progress < 100;
    if (filter === 'not-started') return module.progress === 0;
    return true;
  });

  const handleModuleClick = (module: Module) => {
    trackModuleStart(module.id);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Choose Your Adventure
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pick any module and start playing! Each one is designed to challenge and inspire you.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 flex-wrap">
        {['all', 'in-progress', 'not-started'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === tab
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
            }`}
          >
            {tab === 'all' && 'All Modules'}
            {tab === 'in-progress' && 'In Progress'}
            {tab === 'not-started' && 'Not Started'}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Link
            key={module.id}
            href={`/play/${module.id}`}
            onClick={() => handleModuleClick(module)}
            className="group"
          >
            <div className="h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              {/* Color Header */}
              <div
                className={`h-24 bg-gradient-to-br ${module.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 right-4 text-4xl">{module.icon}</div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {module.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {module.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-purple-600">{module.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between pt-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      module.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-700'
                        : module.difficulty === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {module.difficulty.charAt(0).toUpperCase() +
                      module.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {module.progress === 100 ? '✓ Completed' : 'Start Playing →'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No modules found with that filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
          >
            Show all modules
          </button>
        </div>
      )}
    </div>
  );
}
