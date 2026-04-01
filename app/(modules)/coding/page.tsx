'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

type Language = 'blocks' | 'python' | 'javascript';
type Tab = 'learn' | 'practice' | 'create';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  starter: string;
  solution: string;
  expectedOutput: string;
}

export default function CodingModule() {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState('// Welcome to BrindaWorld Coding!\nconsole.log("Hello, Coder!");');
  const [output, setOutput] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  // Load user and progress on mount
  useEffect(() => {
    const loadUserAndProgress = async () => {
      const supabase = createClient();
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser({ id: authUser.id });
          setShowSignInPrompt(false);

          // Load saved progress
          try {
            const { data, error } = await supabase
              .from('assessments')
              .select('completed_exercises, code')
              .eq('user_id', authUser.id)
              .eq('module', 'coding')
              .order('created_at', { ascending: false })
              .limit(1)
              .single();

            if (data) {
              if (data.completed_exercises) setCompletedExercises(data.completed_exercises);
              if (data.code) setCode(data.code);
            }
          } catch (err) {
            // No saved progress found, continue with defaults
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

  // Save progress when exercises are completed
  const saveProgress = async (newCompletedExercises: string[], currentCode: string) => {
    if (!user) return;

    const supabase = createClient();
    try {
      await supabase.from('assessments').upsert(
        {
          user_id: user.id,
          module: 'coding',
          completed_exercises: newCompletedExercises,
          code: currentCode,
          progress: Math.round((newCompletedExercises.length / 5) * 100),
        },
        { onConflict: 'user_id,module' }
      );
    } catch (err) {
      console.error('Error saving coding progress:', err);
    }
  };

  const exercises: Exercise[] = [
    {
      id: 'hello-world',
      title: 'Hello World',
      description: 'Your first program! Print a greeting.',
      difficulty: 'beginner',
      starter: "// Write a program that prints 'Hello, World!'\nconsole.log();",
      solution: "console.log('Hello, World!');",
      expectedOutput: 'Hello, World!',
    },
    {
      id: 'variables',
      title: 'Variables & Strings',
      description: 'Learn how to store and use information in variables.',
      difficulty: 'beginner',
      starter: "const name = 'Your Name';\n// Print a message with the variable\nconsole.log();",
      solution: "const name = 'Your Name';\nconsole.log('My name is ' + name);",
      expectedOutput: 'My name is Your Name',
    },
    {
      id: 'if-else',
      title: 'If/Else Statements',
      description: 'Make decisions in your code with conditional logic.',
      difficulty: 'intermediate',
      starter: 'const age = 15;\nif (age >= 18) {\n  console.log();\n} else {\n  console.log();\n}',
      solution: "const age = 15;\nif (age >= 18) {\n  console.log('You are an adult');\n} else {\n  console.log('You are a teen');\n}",
      expectedOutput: 'You are a teen',
    },
    {
      id: 'loops',
      title: 'Loops',
      description: 'Repeat code multiple times with loops.',
      difficulty: 'intermediate',
      starter: 'for (let i = 0; i < 5; i++) {\n  console.log();\n}',
      solution: "for (let i = 0; i < 5; i++) {\n  console.log('Count: ' + (i + 1));\n}",
      expectedOutput: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5',
    },
    {
      id: 'functions',
      title: 'Functions',
      description: 'Create reusable blocks of code with functions.',
      difficulty: 'advanced',
      starter: 'function greet(name) {\n  return;\n}\nconsole.log(greet("Girl Coder"));',
      solution: "function greet(name) {\n  return 'Hello, ' + name + '!';\n}\nconsole.log(greet('Girl Coder'));",
      expectedOutput: 'Hello, Girl Coder!',
    },
  ];

  const runCode = () => {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.join(' ')),
      };

      // Simple eval with custom console - educational only
      new Function('console', code)(customConsole);
      setOutput(logs.join('\n') || '(no output)');

      // Check if exercise is completed
      if (activeTab === 'practice' && logs.join('\n') === exercises[selectedExercise].expectedOutput) {
        if (!completedExercises.includes(exercises[selectedExercise].id)) {
          const updated = [...completedExercises, exercises[selectedExercise].id];
          setCompletedExercises(updated);
          saveProgress(updated, code);
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const loadExercise = (index: number) => {
    setSelectedExercise(index);
    setCode(exercises[index].starter);
    setOutput('');
  };

  const showSolution = () => {
    setCode(exercises[selectedExercise].solution);
    setOutput('');
  };

  const currentExercise = exercises[selectedExercise];
  const progress = Math.round((completedExercises.length / exercises.length) * 100);

  const pythonCode = `# Welcome to Python!\nprint("Hello, Coder!")`;
  const blocksCode = `Start
    Print: "Hello, Coder!"
End`;

  const displayCode =
    language === 'python'
      ? pythonCode
      : language === 'blocks'
        ? blocksCode
        : code;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brinda-purple mb-2">💻 Coding Playground</h1>
          <p className="text-gray-700">Learn programming and build amazing applications with code.</p>
          {showSignInPrompt && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              💡 Sign in to save your progress and track completed exercises!
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['blocks', 'python', 'javascript'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                language === lang
                  ? 'bg-brinda-purple text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-brinda-purple'
              }`}
            >
              {lang === 'blocks' ? '🎨 Blocks' : lang === 'python' ? '🐍 Python' : 'JS JavaScript'}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['learn', 'practice', 'create'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition-all min-h-[44px] ${
                activeTab === tab
                  ? 'bg-brinda-purple text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab === 'learn' ? '📚 Learn' : tab === 'practice' ? '✏️ Practice' : '✨ Create'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-brinda-purple">Code Editor</h2>
              </CardHeader>
              <CardBody>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                    {language === 'blocks' ? '📦 Block Editor' : language === 'python' ? '🐍 Python' : '📝 JavaScript'}
                  </div>
                  {language === 'blocks' ? (
                    <pre className="text-green-400 p-4 font-mono text-sm overflow-x-auto">{blocksCode}</pre>
                  ) : (
                    <textarea
                      value={language === 'python' ? pythonCode : code}
                      onChange={(e) => !['blocks', 'python'].includes(language) && setCode(e.target.value)}
                      disabled={language === 'python' || language === 'blocks'}
                      className="w-full bg-gray-900 text-green-400 p-4 font-mono text-sm outline-none resize-none min-h-80 disabled:opacity-70"
                      spellCheck="false"
                    />
                  )}
                </div>
              </CardBody>
              <CardFooter className="flex gap-2">
                <Button onClick={runCode} variant="secondary" size="lg" className="flex-1">
                  ▶ Run Code
                </Button>
                {activeTab === 'practice' && (
                  <Button onClick={showSolution} variant="outline" size="lg">
                    💡 Hint
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Output</h3>
              </CardHeader>
              <CardBody>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm min-h-24 whitespace-pre-wrap">
                  {output || '(output will appear here)'}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Progress */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Progress</h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Exercises Completed</span>
                    <span className="font-bold text-brinda-purple">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-brinda-gold h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {completedExercises.length} of {exercises.length} exercises completed
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Exercises */}
            {activeTab !== 'create' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-brinda-purple">{activeTab === 'practice' ? 'Challenges' : 'Lessons'}</h3>
                </CardHeader>
                <CardBody className="space-y-2 max-h-96 overflow-y-auto">
                  {exercises.map((exercise, idx) => (
                    <button
                      key={exercise.id}
                      onClick={() => {
                        loadExercise(idx);
                        setActiveTab('practice');
                      }}
                      className={`w-full p-3 rounded-lg text-left transition-all min-h-[60px] ${
                        selectedExercise === idx && activeTab === 'practice'
                          ? 'bg-brinda-purple text-white'
                          : completedExercises.includes(exercise.id)
                            ? 'bg-green-100 border border-green-300 hover:bg-green-200'
                            : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-sm">{exercise.title}</p>
                          <p className="text-xs opacity-75">{exercise.description}</p>
                        </div>
                        {completedExercises.includes(exercise.id) && <span className="text-lg">✓</span>}
                      </div>
                    </button>
                  ))}
                </CardBody>
              </Card>
            )}

            {activeTab === 'create' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-brinda-purple">Your Project</h3>
                </CardHeader>
                <CardBody className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    Write any code you want! This is your creative space to experiment and build.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-900">
                      💡 Tip: Use console.log() to print messages and see what your code does!
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Exercise Details */}
            {activeTab === 'practice' && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-brinda-purple">Challenge</h3>
                </CardHeader>
                <CardBody className="space-y-2">
                  <p className="text-sm text-gray-700">{currentExercise.description}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <p className="text-xs font-bold text-yellow-900">Expected Output:</p>
                    <p className="text-xs text-yellow-800 font-mono">{currentExercise.expectedOutput}</p>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">Why Learn to Code?</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-bold text-brinda-purple mb-2">💡 Creative Expression</p>
                <p className="text-gray-700 text-sm">Build websites, games, apps, and tools that make a real impact.</p>
              </div>
              <div>
                <p className="font-bold text-brinda-purple mb-2">🧠 Problem Solving</p>
                <p className="text-gray-700 text-sm">Break down complex problems and find elegant solutions.</p>
              </div>
              <div>
                <p className="font-bold text-brinda-purple mb-2">🚀 Future Ready</p>
                <p className="text-gray-700 text-sm">Tech skills open doors to amazing careers in any industry.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
