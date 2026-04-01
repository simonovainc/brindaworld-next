'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type ViewMode = 'intro' | 'quiz' | 'results' | 'scenarios' | 'skills' | 'leaders';

interface Leader {
  name: string;
  icon: string;
  title: string;
  country: string;
  achievement: string;
  quote: string;
}

interface Scenario {
  id: string;
  situation: string;
  choices: Array<{ text: string; style: string; outcome: string }>;
}

export default function LeadershipModule() {
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, number>>({});
  const [goalsFormData, setGoalsFormData] = useState({ goal: '', steps: '', timeline: '' });

  const leadershipQuestions = [
    {
      question: 'When making a group decision, you tend to:',
      answers: [
        { text: 'Listen to everyone and find common ground', style: 'Democratic' },
        { text: 'Take charge and guide the direction', style: 'Directive' },
        { text: 'Support others in deciding', style: 'Supportive' },
        { text: 'Encourage creative thinking and new ideas', style: 'Visionary' },
      ],
    },
    {
      question: 'When facing a challenge, you:',
      answers: [
        { text: 'Consult with your team for input', style: 'Democratic' },
        { text: 'Quickly make the tough call', style: 'Directive' },
        { text: 'Focus on team morale and confidence', style: 'Supportive' },
        { text: 'See it as an opportunity to innovate', style: 'Visionary' },
      ],
    },
    {
      question: 'Your team works best when you:',
      answers: [
        { text: 'Value everyone\'s voice equally', style: 'Democratic' },
        { text: 'Set clear expectations and goals', style: 'Directive' },
        { text: 'Show genuine care for their growth', style: 'Supportive' },
        { text: 'Inspire them with a compelling vision', style: 'Visionary' },
      ],
    },
    {
      question: 'When someone disagrees with you, you:',
      answers: [
        { text: 'Welcome the different perspective', style: 'Democratic' },
        { text: 'Stand firm if you\'re confident', style: 'Directive' },
        { text: 'Ensure they feel heard and valued', style: 'Supportive' },
        { text: 'Explore how it could lead to something better', style: 'Visionary' },
      ],
    },
    {
      question: 'Your leadership strength is:',
      answers: [
        { text: 'Building consensus and unity', style: 'Democratic' },
        { text: 'Results and decisive action', style: 'Directive' },
        { text: 'Developing people and relationships', style: 'Supportive' },
        { text: 'Creating exciting futures', style: 'Visionary' },
      ],
    },
  ];

  const scenarios: Scenario[] = [
    {
      id: 'conflict',
      situation: 'Two of your team members are disagreeing on the project direction. How do you handle it?',
      choices: [
        {
          text: 'Bring them together to discuss and find a middle ground',
          style: 'Democratic',
          outcome: 'Both feel heard, and the team finds a creative compromise.',
        },
        {
          text: 'Make a decision based on what\'s best for the project',
          style: 'Directive',
          outcome: 'The project moves forward quickly with clear direction.',
        },
        {
          text: 'Help them understand each other\'s perspectives and feelings',
          style: 'Supportive',
          outcome: 'Relationship strengthens, and they respect each other more.',
        },
        {
          text: 'Challenge them to combine both ideas into something better',
          style: 'Visionary',
          outcome: 'Innovation emerges from the conflict.',
        },
      ],
    },
    {
      id: 'failure',
      situation: 'Your team made a mistake that cost time. A team member is upset and discouraged. What do you do?',
      choices: [
        {
          text: 'Have a team meeting to discuss what went wrong together',
          style: 'Democratic',
          outcome: 'Everyone learns and takes responsibility collectively.',
        },
        {
          text: 'Focus on fixing the problem immediately',
          style: 'Directive',
          outcome: 'The issue is resolved quickly and efficiently.',
        },
        {
          text: 'Reassure them and help them believe in themselves again',
          style: 'Supportive',
          outcome: 'The person feels supported and regains confidence.',
        },
        {
          text: 'Show how this failure is a stepping stone to something great',
          style: 'Visionary',
          outcome: 'The team sees opportunity and grows from the experience.',
        },
      ],
    },
    {
      id: 'expansion',
      situation: 'Your organization is growing rapidly. How do you lead through this change?',
      choices: [
        {
          text: 'Involve everyone in planning the growth',
          style: 'Democratic',
          outcome: 'Everyone feels ownership and buy-in for the changes.',
        },
        {
          text: 'Set clear systems and processes to manage the growth',
          style: 'Directive',
          outcome: 'Structure and efficiency increase significantly.',
        },
        {
          text: 'Support your team through the transition period',
          style: 'Supportive',
          outcome: 'Team morale stays high despite changes.',
        },
        {
          text: 'Paint an exciting vision of what you\'ll achieve together',
          style: 'Visionary',
          outcome: 'Team is energized and motivated by the mission.',
        },
      ],
    },
    {
      id: 'innovation',
      situation: 'Someone suggests a radical new idea that excites you but scares others. Your response:',
      choices: [
        {
          text: 'Let\'s discuss this as a group to ease concerns',
          style: 'Democratic',
          outcome: 'Team feels included and gradually embraces the idea.',
        },
        {
          text: 'Let\'s test it with a small pilot project first',
          style: 'Directive',
          outcome: 'Risk is minimized while moving forward.',
        },
        {
          text: 'I\'ll support whoever wants to champion this idea',
          style: 'Supportive',
          outcome: 'A brave team member steps up with confidence.',
        },
        {
          text: 'This could revolutionize what we do. Let\'s go for it!',
          style: 'Visionary',
          outcome: 'The team catches your enthusiasm and takes the leap.',
        },
      ],
    },
    {
      id: 'recognition',
      situation: 'Someone on your team did exceptional work but is quite quiet. How do you recognize them?',
      choices: [
        {
          text: 'Celebrate them in front of the whole team',
          style: 'Democratic',
          outcome: 'Everyone appreciates their contribution.',
        },
        {
          text: 'Give them a specific reward or promotion',
          style: 'Directive',
          outcome: 'They feel valued with concrete recognition.',
        },
        {
          text: 'Have a personal conversation about their great work',
          style: 'Supportive',
          outcome: 'They feel truly seen and understood.',
        },
        {
          text: 'Show them how their work is advancing our vision',
          style: 'Visionary',
          outcome: 'They connect their work to something bigger.',
        },
      ],
    },
  ];

  const leaders: Leader[] = [
    {
      name: 'Malala Yousafzai',
      icon: '👩‍🎓',
      title: 'Education Activist',
      country: 'Pakistan',
      achievement: 'Fought for girls\' education globally, youngest Nobel Peace Prize winner',
      quote: '"We realize the importance of our voices only when we are silenced."',
    },
    {
      name: 'Jacinda Ardern',
      icon: '👩‍⚖️',
      title: 'Former Prime Minister',
      country: 'New Zealand',
      achievement: 'Led with empathy, compassion, and decisive action during crises',
      quote: '"Be kind, be thoughtful, and take care of your community."',
    },
    {
      name: 'Wangari Maathai',
      icon: '♻️',
      title: 'Environmental Activist',
      country: 'Kenya',
      achievement: 'Founded Green Belt Movement, won Nobel Peace Prize for environmental work',
      quote: '"You cannot protect the environment unless you empower people."',
    },
    {
      name: 'Sheryl Sandberg',
      icon: '💼',
      title: 'Business Leader',
      country: 'USA',
      achievement: 'COO of Meta, advocated for women in leadership and lean in movement',
      quote: '"If you want to be heard, you have to speak up."',
    },
    {
      name: 'Ellen Johnson Sirleaf',
      icon: '👩‍⚖️',
      title: 'President',
      country: 'Liberia',
      achievement: 'First elected female president in Africa, led post-conflict reconciliation',
      quote: '"The future will not belong to those who sit on the sidelines."',
    },
  ];

  const calculateQuizResult = () => {
    const styleCounts: Record<string, number> = {};
    quizAnswers.forEach((style) => {
      styleCounts[style] = (styleCounts[style] || 0) + 1;
    });
    const topStyle = Object.entries(styleCounts).sort(([, a], [, b]) => b - a)[0]?.[0];
    return topStyle || 'Democratic';
  };

  const handleScenarioChoice = (choiceIndex: number) => {
    setScenarioAnswers({
      ...scenarioAnswers,
      [selectedScenario]: choiceIndex,
    });
    if (selectedScenario < scenarios.length - 1) {
      setSelectedScenario(selectedScenario + 1);
    } else {
      setViewMode('skills');
    }
  };

  const leadershipStyle = calculateQuizResult();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block bg-brinda-gold text-white px-3 py-1 rounded-full text-xs font-bold">
              EARLY ACCESS
            </span>
          </div>
          <h1 className="text-4xl font-bold text-brinda-purple mb-2">👑 Leadership Academy</h1>
          <p className="text-gray-700">Discover and develop your natural leadership style.</p>
        </div>

        {/* Navigation Tabs */}
        {viewMode !== 'intro' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {['intro', 'quiz', 'scenarios', 'skills', 'leaders'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as ViewMode)}
                className={`px-4 py-2 rounded-lg font-bold transition-all min-h-[44px] ${
                  viewMode === mode
                    ? 'bg-brinda-purple text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {mode === 'intro'
                  ? 'Home'
                  : mode === 'quiz'
                    ? 'Quiz'
                    : mode === 'scenarios'
                      ? 'Scenarios'
                      : mode === 'skills'
                        ? 'Goals'
                        : 'Leaders'}
              </button>
            ))}
          </div>
        )}

        {/* Intro Screen */}
        {viewMode === 'intro' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-brinda-purple">What is Leadership?</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <p className="text-gray-700">
                    Leadership isn't about having a fancy title. It's about inspiring others, making tough decisions, and creating positive change.
                  </p>
                  <p className="text-gray-700">
                    Every person is a leader in some way. In this module, you'll discover your leadership style and learn practical skills to lead with confidence.
                  </p>
                  <Button onClick={() => setViewMode('quiz')} variant="primary" size="lg" className="w-full">
                    Discover Your Style
                  </Button>
                </CardBody>
              </Card>

              <Card className="lg:col-span-1">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-brinda-purple">4 Leadership Styles</h2>
                </CardHeader>
                <CardBody className="space-y-3">
                  {[
                    { icon: '🤝', title: 'Democratic', desc: 'Listens and builds consensus' },
                    { icon: '🎯', title: 'Directive', desc: 'Clear vision and direction' },
                    { icon: '💙', title: 'Supportive', desc: 'Develops and cares for people' },
                    { icon: '🚀', title: 'Visionary', desc: 'Inspires with big dreams' },
                  ].map((style) => (
                    <div key={style.title} className="flex items-start gap-3">
                      <span className="text-2xl">{style.icon}</span>
                      <div>
                        <p className="font-bold text-brinda-purple">{style.title}</p>
                        <p className="text-sm text-gray-600">{style.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable onClick={() => setViewMode('scenarios')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">🎭</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Leadership Scenarios</h3>
                  <p className="text-sm text-gray-600">Explore real situations and leadership choices</p>
                </CardBody>
              </Card>

              <Card hoverable onClick={() => setViewMode('skills')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">🎯</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Set Your Goals</h3>
                  <p className="text-sm text-gray-600">Create your personal leadership plan</p>
                </CardBody>
              </Card>

              <Card hoverable onClick={() => setViewMode('leaders')}>
                <CardBody className="text-center cursor-pointer">
                  <div className="text-5xl mb-3">👩</div>
                  <h3 className="font-bold text-brinda-purple mb-2">Inspiring Leaders</h3>
                  <p className="text-sm text-gray-600">Meet women transforming the world</p>
                </CardBody>
              </Card>
            </div>
          </>
        )}

        {/* Quiz Screen */}
        {viewMode === 'quiz' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">
                Question {quizAnswers.length + 1} of {leadershipQuestions.length}
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                <div
                  className="bg-brinda-gold h-full rounded-full transition-all"
                  style={{ width: `${((quizAnswers.length + 1) / leadershipQuestions.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">{leadershipQuestions[quizAnswers.length].question}</h3>
              <div className="space-y-3">
                {leadershipQuestions[quizAnswers.length].answers.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const newAnswers = [...quizAnswers, answer.style];
                      setQuizAnswers(newAnswers);
                      if (newAnswers.length >= leadershipQuestions.length) {
                        setViewMode('results');
                      }
                    }}
                    className="w-full p-4 rounded-lg bg-white border-2 border-gray-300 hover:border-brinda-purple hover:bg-purple-50 transition-all text-left font-medium min-h-[50px]"
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Results Screen */}
        {viewMode === 'results' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">Your Leadership Style</h2>
            </CardHeader>
            <CardBody className="space-y-6 text-center">
              <div>
                <div className="text-7xl mb-4">
                  {leadershipStyle === 'Democratic'
                    ? '🤝'
                    : leadershipStyle === 'Directive'
                      ? '🎯'
                      : leadershipStyle === 'Supportive'
                        ? '💙'
                        : '🚀'}
                </div>
                <h3 className="text-4xl font-bold text-brinda-purple mb-3">{leadershipStyle}</h3>
                <p className="text-gray-700 mb-6">
                  {leadershipStyle === 'Democratic'
                    ? 'You bring people together and value diverse perspectives. Your strength is building consensus and creating inclusive teams.'
                    : leadershipStyle === 'Directive'
                      ? 'You are decisive and goal-oriented. Your strength is providing clear direction and achieving results.'
                      : leadershipStyle === 'Supportive'
                        ? 'You care deeply about people\'s growth. Your strength is developing talent and building strong relationships.'
                        : 'You inspire with vision and possibilities. Your strength is motivating others toward exciting futures.'}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  💡 Most effective leaders use different styles in different situations. Learn to flex your style!
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={() => setViewMode('scenarios')} variant="primary" size="lg" className="w-full">
                  Try Leadership Scenarios
                </Button>
                <Button onClick={() => setViewMode('skills')} variant="secondary" size="lg" className="w-full">
                  Set Leadership Goals
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Scenarios Screen */}
        {viewMode === 'scenarios' && (
          <>
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <h2 className="text-2xl font-bold text-brinda-purple">
                  Leadership Scenario {selectedScenario + 1} of {scenarios.length}
                </h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <p className="text-lg font-bold text-gray-800">{scenarios[selectedScenario].situation}</p>
                <div className="space-y-3">
                  {scenarios[selectedScenario].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScenarioChoice(idx)}
                      className="w-full p-4 rounded-lg bg-white border-2 border-gray-300 hover:border-brinda-purple hover:bg-purple-50 transition-all text-left min-h-[60px]"
                    >
                      <p className="font-medium text-gray-800">{choice.text}</p>
                      <p className="text-xs text-brinda-purple font-bold mt-1">{choice.style} Style</p>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Show outcome if answered */}
            {scenarioAnswers[selectedScenario] !== undefined && (
              <Card className="max-w-3xl mx-auto mt-6">
                <CardBody className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-bold text-green-900 mb-2">✓ Great Choice!</p>
                  <p className="text-gray-800">
                    {scenarios[selectedScenario].choices[scenarioAnswers[selectedScenario]].outcome}
                  </p>
                </CardBody>
              </Card>
            )}
          </>
        )}

        {/* Skills/Goals Screen */}
        {viewMode === 'skills' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">Communication Skills Workshop</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <h3 className="font-bold text-brinda-purple mb-3">Communication Essentials</h3>
                <div className="space-y-2">
                  {[
                    { icon: '👂', skill: 'Active Listening', desc: 'Hear what others are really saying' },
                    { icon: '🗣️', skill: 'Clear Speaking', desc: 'Express your thoughts concisely' },
                    { icon: '💬', skill: 'Feedback', desc: 'Give and receive constructive feedback' },
                    { icon: '🤝', skill: 'Empathy', desc: 'Understand others\' perspectives' },
                  ].map((item) => (
                    <div key={item.skill} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-brinda-purple">{item.skill}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-brinda-purple mb-4">Set Your Leadership Goal</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">My Goal:</label>
                    <textarea
                      value={goalsFormData.goal}
                      onChange={(e) => setGoalsFormData({ ...goalsFormData, goal: e.target.value })}
                      placeholder="e.g., Learn to speak up in meetings..."
                      className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:border-brinda-purple focus:outline-none"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Steps to Take:</label>
                    <textarea
                      value={goalsFormData.steps}
                      onChange={(e) => setGoalsFormData({ ...goalsFormData, steps: e.target.value })}
                      placeholder="e.g., 1. Practice speaking in small groups..."
                      className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:border-brinda-purple focus:outline-none"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Timeline:</label>
                    <input
                      type="text"
                      value={goalsFormData.timeline}
                      onChange={(e) => setGoalsFormData({ ...goalsFormData, timeline: e.target.value })}
                      placeholder="e.g., 3 months"
                      className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:border-brinda-purple focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="primary" size="lg" className="w-full">
                Save My Leadership Plan
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Leaders Screen */}
        {viewMode === 'leaders' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader) => (
              <Card key={leader.name} hoverable>
                <CardBody className="space-y-4">
                  <div className="text-5xl text-center">{leader.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-brinda-purple">{leader.name}</h3>
                    <p className="text-sm text-brinda-gold font-bold">{leader.title}</p>
                    <p className="text-xs text-gray-600">{leader.country}</p>
                  </div>
                  <p className="text-sm text-gray-700">{leader.achievement}</p>
                  <p className="italic text-brinda-purple font-semibold text-sm">"{leader.quote}"</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
