'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/components/providers/AnalyticsProvider';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  progress: number;
  difficulty: string;
  estimatedHours: number;
  icon: string;
  color: string;
}

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'chess-mastery',
    title: 'Chess Mastery',
    description: 'Master chess strategy, tactics, and endgames in 8 comprehensive lessons',
    lessonCount: 8,
    progress: 42,
    difficulty: 'Intermediate',
    estimatedHours: 12,
    icon: '♟️',
    color: 'from-slate-500 to-slate-600',
  },
  {
    id: 'coding-foundations',
    title: 'Coding Foundations',
    description: 'Learn programming fundamentals across 10 hands-on lessons',
    lessonCount: 10,
    progress: 25,
    difficulty: 'Beginner',
    estimatedHours: 15,
    icon: '💻',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'world-explorer',
    title: 'World Explorer',
    description: 'Discover 6 world regions with geography, culture, and history',
    lessonCount: 6,
    progress: 60,
    difficulty: 'Intermediate',
    estimatedHours: 8,
    icon: '🌍',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'career-discovery',
    title: 'Career Discovery',
    description: 'Explore 12 different career paths and find your passion',
    lessonCount: 12,
    progress: 15,
    difficulty: 'Beginner',
    estimatedHours: 10,
    icon: '🚀',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function LearnPage() {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('/learn', 'learn');
  }, [trackPageView]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 sm:p-12 text-white space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold">Structured Learning Paths</h1>
        <p className="text-lg text-blue-100 max-w-2xl">
          Follow curriculum-based lessons with assessments. Earn certificates upon completion.
        </p>
      </div>

      {/* Filter and Sort */}
      <div className="flex gap-3 flex-wrap">
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-sm font-medium">
          All Levels
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-sm font-medium">
          Most Popular
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-sm font-medium">
          Recently Started
        </button>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEARNING_PATHS.map((path) => (
          <Link
            key={path.id}
            href={`/learn/${path.id}`}
            className="group"
          >
            <div className="h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300">
              {/* Header with Color */}
              <div
                className={`h-32 bg-gradient-to-br ${path.color} relative overflow-hidden flex items-end p-6`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 right-4 text-5xl">{path.icon}</div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {path.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Lessons</p>
                    <p className="font-bold text-gray-900">{path.lessonCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Hours</p>
                    <p className="font-bold text-gray-900">~{path.estimatedHours}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Level</p>
                    <p className="font-bold text-gray-900">{path.difficulty}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-blue-600">{path.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                    {path.progress === 0
                      ? 'Start Learning'
                      : path.progress === 100
                        ? 'View Certificate'
                        : 'Continue Learning'} →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Achievement Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Earn Certificates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Chess Master', 'Code Expert', 'World Scholar', 'Career Navigator'].map((cert) => (
            <div
              key={cert}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-semibold text-gray-900 text-center text-sm">{cert}</p>
              <p className="text-xs text-gray-500 mt-1">Complete all lessons</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
