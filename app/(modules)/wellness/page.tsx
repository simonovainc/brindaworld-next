'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

type ViewMode = 'home' | 'mood' | 'breathing' | 'gratitude' | 'habits' | 'timer';

export default function WellnessModule() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<string[]>([]);
  const [gratitudeEntries, setGratitudeEntries] = useState<string[]>([]);
  const [currentGratitude, setCurrentGratitude] = useState('');
  const [completedHabits, setCompletedHabits] = useState<number[]>([]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const moods = [
    { emoji: '😄', label: 'Happy', color: 'bg-yellow-100 border-yellow-400' },
    { emoji: '😌', label: 'Calm', color: 'bg-green-100 border-green-400' },
    { emoji: '😴', label: 'Tired', color: 'bg-blue-100 border-blue-400' },
    { emoji: '😢', label: 'Sad', color: 'bg-indigo-100 border-indigo-400' },
    { emoji: '😤', label: 'Frustrated', color: 'bg-orange-100 border-orange-400' },
    { emoji: '😨', label: 'Anxious', color: 'bg-red-100 border-red-400' },
  ];

  const habits = [
    { id: 1, name: 'Drink 8 glasses of water', icon: '💧' },
    { id: 2, name: 'Get 8 hours of sleep', icon: '😴' },
    { id: 3, name: 'Exercise for 30 minutes', icon: '🏃‍♀️' },
    { id: 4, name: 'Eat fruits or vegetables', icon: '🥗' },
    { id: 5, name: 'Practice gratitude', icon: '🙏' },
  ];

  // Load user and wellness data on mount
  useEffect(() => {
    const loadUserAndProgress = async () => {
      const supabase = createClient();
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser({ id: authUser.id });
          setShowSignInPrompt(false);

          // Load saved mood logs
          try {
            const { data, error } = await supabase
              .from('mood_logs')
              .select('mood_history, gratitude_entries, completed_habits')
              .eq('user_id', authUser.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();

            if (data) {
              if (data.mood_history) setMoodHistory(data.mood_history);
              if (data.gratitude_entries) setGratitudeEntries(data.gratitude_entries);
              if (data.completed_habits) setCompletedHabits(data.completed_habits);
            }
          } catch (err) {
            // No saved wellness data found, continue with defaults
          }
        } else {
          setShowSignInPrompt(true);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };

    loadUserAndProgress();
  }, []);

  // Save wellness progress to Supabase
  const saveWellnessProgress = async (moods: string[], gratitude: string[], habits: number[]) => {
    if (!user) return;

    const supabase = createClient();
    try {
      await supabase.from('mood_logs').upsert(
        {
          user_id: user.id,
          mood_history: moods,
          gratitude_entries: gratitude,
          completed_habits: habits,
        },
        { onConflict: 'user_id' }
      );
    } catch (err) {
      console.error('Error saving wellness progress:', err);
    }
  };

  // Breathing exercise effect
  useEffect(() => {
    if (!breathingActive) return;

    const phases: Array<'inhale' | 'hold' | 'exhale'> = ['inhale', 'hold', 'exhale'];
    const durations = { inhale: 4000, hold: 4000, exhale: 4000 };

    let currentPhaseIndex = 0;

    const interval = setInterval(() => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      setBreathingPhase(phases[currentPhaseIndex]);
    }, durations[breathingPhase]);

    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || timerSeconds <= 0) {
      if (timerSeconds === 0) setTimerActive(false);
      return;
    }

    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const newMoodHistory = [mood, ...moodHistory.slice(0, 6)];
    setMoodHistory(newMoodHistory);
    saveWellnessProgress(newMoodHistory, gratitudeEntries, completedHabits);
    setTimeout(() => setViewMode('home'), 1500);
  };

  const addGratitude = () => {
    if (currentGratitude.trim()) {
      const newEntries = [currentGratitude, ...gratitudeEntries];
      setGratitudeEntries(newEntries);
      setCurrentGratitude('');
      saveWellnessProgress(moodHistory, newEntries, completedHabits);
    }
  };

  const toggleHabit = (habitId: number) => {
    let newHabits;
    if (completedHabits.includes(habitId)) {
      newHabits = completedHabits.filter((id) => id !== habitId);
    } else {
      newHabits = [...completedHabits, habitId];
    }
    setCompletedHabits(newHabits);
    saveWellnessProgress(moodHistory, gratitudeEntries, newHabits);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const breathingScale =
    breathingPhase === 'inhale' ? 'scale-125' : breathingPhase === 'hold' ? 'scale-125' : 'scale-100';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block bg-brinda-gold text-white px-3 py-1 rounded-full text-xs font-bold">
              WELLNESS BETA
            </span>
          </div>
          <h1 className="text-4xl font-bold text-brinda-purple mb-2">🌿 Wellness Zone</h1>
          <p className="text-gray-700">Take care of yourself. Mental and physical health matter.</p>
          {showSignInPrompt && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              💡 Sign in to save your mood logs, gratitude journal, and completed habits!
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        {viewMode !== 'home' && (
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { mode: 'home', label: 'Home', icon: '🏠' },
              { mode: 'mood', label: 'Mood Tracker', icon: '😊' },
              { mode: 'breathing', label: 'Breathing', icon: '🫁' },
              { mode: 'gratitude', label: 'Gratitude', icon: '🙏' },
              { mode: 'habits', label: 'Habits', icon: '✓' },
              { mode: 'timer', label: 'Timer', icon: '⏱️' },
            ].map((tab) => (
              <button
                key={tab.mode}
                onClick={() => setViewMode(tab.mode as ViewMode)}
                className={`px-4 py-2 rounded-lg font-bold transition-all min-h-[44px] whitespace-nowrap ${
                  viewMode === tab.mode
                    ? 'bg-brinda-purple text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Home Screen */}
        {viewMode === 'home' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Mood Tracker */}
              <Card hoverable onClick={() => setViewMode('mood')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">{moodHistory[0] ? moods.find((m) => m.label === moodHistory[0])?.emoji : '😊'}</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Mood Tracker</h3>
                  <p className="text-sm text-gray-600">How are you feeling today?</p>
                  {moodHistory.length > 0 && <p className="text-xs text-brinda-gold font-bold mt-2">Today: {moodHistory[0]}</p>}
                </CardBody>
              </Card>

              {/* Breathing Exercises */}
              <Card hoverable onClick={() => setViewMode('breathing')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">🫁</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Breathing Exercise</h3>
                  <p className="text-sm text-gray-600">Calm your mind & body</p>
                </CardBody>
              </Card>

              {/* Gratitude Journal */}
              <Card hoverable onClick={() => setViewMode('gratitude')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">🙏</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Gratitude Journal</h3>
                  <p className="text-sm text-gray-600">{gratitudeEntries.length} entries</p>
                </CardBody>
              </Card>

              {/* Healthy Habits */}
              <Card hoverable onClick={() => setViewMode('habits')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">✓</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Healthy Habits</h3>
                  <p className="text-sm text-gray-600">{completedHabits.length} completed today</p>
                </CardBody>
              </Card>

              {/* Mindfulness Timer */}
              <Card hoverable onClick={() => setViewMode('timer')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">⏱️</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Mindfulness Timer</h3>
                  <p className="text-sm text-gray-600">Meditation & focus</p>
                </CardBody>
              </Card>

              {/* Coming Soon */}
              <Card>
                <CardBody className="text-center opacity-60">
                  <div className="text-5xl mb-3">🎵</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Relaxation Sounds</h3>
                  <p className="text-sm text-gray-600">Coming Soon</p>
                </CardBody>
              </Card>
            </div>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-brinda-purple">Wellness Tips</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: '💤', title: 'Sleep', tip: 'Aim for 8 hours every night' },
                    { icon: '🍎', title: 'Nutrition', tip: 'Eat colorful foods for nutrients' },
                    { icon: '🏃‍♀️', title: 'Movement', tip: 'Move your body every day' },
                    { icon: '👥', title: 'Connection', tip: 'Spend time with loved ones' },
                    { icon: '📖', title: 'Learning', tip: 'Keep your mind engaged' },
                    { icon: '🌳', title: 'Nature', tip: 'Spend time outdoors' },
                  ].map((item) => (
                    <div key={item.title} className="p-3 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-lg">
                      <p className="text-2xl mb-1">{item.icon}</p>
                      <p className="font-bold text-brinda-purple text-sm">{item.title}</p>
                      <p className="text-xs text-gray-700">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Mood Tracker */}
        {viewMode === 'mood' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">How are you feeling?</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodSelect(mood.label)}
                    className={`p-4 rounded-lg border-2 transition-all min-h-[100px] ${mood.color}`}
                  >
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <p className="font-bold text-sm text-gray-800">{mood.label}</p>
                  </button>
                ))}
              </div>

              {moodHistory.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-brinda-purple mb-3">Mood History</h3>
                  <div className="flex flex-wrap gap-2">
                    {moodHistory.map((mood, idx) => (
                      <span key={idx} className="text-2xl">
                        {moods.find((m) => m.label === mood)?.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {/* Breathing Exercise */}
        {viewMode === 'breathing' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">Breathing Exercise</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <p className="text-gray-700 text-center">
                {!breathingActive
                  ? 'Deep breathing calms your nervous system. Take 5 minutes to breathe with intention.'
                  : breathingPhase === 'inhale'
                    ? 'Breathe in slowly through your nose...'
                    : breathingPhase === 'hold'
                      ? 'Hold your breath...'
                      : 'Exhale slowly through your mouth...'}
              </p>

              <div className="flex justify-center items-center h-64">
                <div
                  className={`w-32 h-32 bg-gradient-to-br from-brinda-purple to-brinda-gold rounded-full flex items-center justify-center transition-all duration-1000 ${
                    breathingActive ? breathingScale : 'scale-100'
                  }`}
                >
                  <div className="text-center text-white">
                    <p className="text-2xl font-bold">
                      {breathingPhase === 'inhale' ? '↓' : breathingPhase === 'hold' ? '◎' : '↑'}
                    </p>
                    <p className="text-sm font-bold capitalize">{breathingPhase}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setBreathingActive(!breathingActive)}
                  variant={breathingActive ? 'danger' : 'primary'}
                  size="lg"
                  className="px-8"
                >
                  {breathingActive ? 'Stop' : 'Start'} Exercise
                </Button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                Repeat this cycle 10 times for a full 5-minute breathing session
              </p>
            </CardBody>
          </Card>
        )}

        {/* Gratitude Journal */}
        {viewMode === 'gratitude' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">Gratitude Journal</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">What are you grateful for today?</label>
                <textarea
                  value={currentGratitude}
                  onChange={(e) => setCurrentGratitude(e.target.value)}
                  placeholder="Write anything you're thankful for..."
                  className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:border-brinda-purple focus:outline-none min-h-24"
                />
              </div>
              <Button onClick={addGratitude} variant="primary" size="lg" className="w-full">
                Save Entry
              </Button>

              {gratitudeEntries.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-bold text-brinda-purple mb-3">Previous Entries</h3>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {gratitudeEntries.map((entry, idx) => (
                      <div key={idx} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-gray-700 text-sm">{entry}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {/* Healthy Habits */}
        {viewMode === 'habits' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">Healthy Habits Checklist</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="space-y-2">
                {habits.map((habit) => (
                  <button
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left min-h-[50px] ${
                      completedHabits.includes(habit.id)
                        ? 'bg-green-100 border-green-400'
                        : 'bg-white border-gray-300 hover:border-brinda-purple'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{habit.icon}</span>
                      <span className="flex-1 font-medium">{habit.name}</span>
                      {completedHabits.includes(habit.id) && <span className="text-2xl">✓</span>}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-brinda-purple font-bold">
                  Today's Progress: {completedHabits.length} of {habits.length} habits completed
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className="bg-brinda-gold h-full rounded-full transition-all"
                    style={{ width: `${(completedHabits.length / habits.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Mindfulness Timer */}
        {viewMode === 'timer' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">Mindfulness Timer</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex justify-center items-center h-40 bg-gradient-to-br from-brinda-purple to-brinda-gold rounded-lg">
                <p className="text-6xl font-bold text-white font-mono">{formatTime(timerSeconds)}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600 text-center">Select a duration:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[300, 600, 900, 1200].map((seconds) => (
                    <button
                      key={seconds}
                      onClick={() => {
                        setTimerSeconds(seconds);
                        setTimerActive(false);
                      }}
                      className={`p-2 rounded-lg font-bold text-sm min-h-[44px] ${
                        timerSeconds === seconds
                          ? 'bg-brinda-purple text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {seconds === 300 ? '5m' : seconds === 600 ? '10m' : seconds === 900 ? '15m' : '20m'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setTimerActive(!timerActive)}
                  variant={timerActive ? 'danger' : 'primary'}
                  size="lg"
                  className="px-8"
                >
                  {timerActive ? 'Pause' : 'Start'} Timer
                </Button>
              </div>

              <p className="text-sm text-gray-600 text-center">
                Use this timer for meditation, journaling, or any mindful activity
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
