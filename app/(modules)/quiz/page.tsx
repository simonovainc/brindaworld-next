'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type QuizStage = 'career-selection' | 'quiz' | 'results' | 'spotlight';

interface Career {
  id: string;
  title: string;
  icon: string;
  description: string;
  dayInLife: string;
  womanRole: string;
  skillsNeeded: string[];
  educationPath: string;
  quote: string;
}

interface QuizQuestion {
  question: string;
  answers: Array<{ text: string; careers: string[] }>;
}

export default function SheCanbequiz() {
  const [stage, setStage] = useState<QuizStage>('career-selection');
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [dreamBoard, setDreamBoard] = useState<string[]>([]);

  const careers: Record<string, Career> = {
    doctor: {
      id: 'doctor',
      title: 'Doctor',
      icon: '👨‍⚕️',
      description: 'Provide healthcare and save lives',
      dayInLife: 'A doctor's day involves seeing patients, diagnosing conditions, and prescribing treatments. Dr. Fauci revolutionized public health globally.',
      womanRole: 'Dr. Mae Jemison was the first African American woman to travel to space. She was also a physician.',
      skillsNeeded: ['Communication', 'Problem-solving', 'Empathy', 'Attention to detail'],
      educationPath: 'Bachelor\'s degree (pre-med), Medical School (MD), Residency (3-7 years)',
      quote: '"Diversity is what makes us strong."',
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      icon: '👩‍🔧',
      description: 'Design and build the future',
      dayInLife: 'Engineers solve real-world problems by designing everything from bridges to smartphones.',
      womanRole: 'Hedy Lamarr invented frequency-hopping technology, the foundation of WiFi and Bluetooth.',
      skillsNeeded: ['Math', 'Problem-solving', 'Creativity', 'Technical thinking'],
      educationPath: 'Bachelor\'s in Engineering, Internships, Professional certification optional',
      quote: '"I am not beautiful because I look like a movie star. I am beautiful because I am unique."',
    },
    astronaut: {
      id: 'astronaut',
      title: 'Astronaut',
      icon: '👩‍🚀',
      description: 'Explore space and discover new worlds',
      dayInLife: 'Astronauts undergo rigorous training, conduct experiments in space, and represent humanity.',
      womanRole: 'Sally Ride was the first American woman in space and pioneered STEM education.',
      skillsNeeded: ['Physics', 'Courage', 'Teamwork', 'Problem-solving'],
      educationPath: 'Bachelor\'s degree, NASA training program, 2-7 years training',
      quote: '"You can\'t be what you can\'t see."',
    },
    artist: {
      id: 'artist',
      title: 'Artist',
      icon: '👩‍🎨',
      description: 'Express creativity and inspire others',
      dayInLife: 'Artists create paintings, sculptures, or digital art that moves people emotionally.',
      womanRole: 'Frida Kahlo\'s powerful self-portraits challenged conventions and inspired generations.',
      skillsNeeded: ['Creativity', 'Observation', 'Persistence', 'Emotional expression'],
      educationPath: 'Art degree or self-taught portfolio, gallery exhibitions, online presence',
      quote: '"My body is my journal, and my tattoos are my story."',
    },
    lawyer: {
      id: 'lawyer',
      title: 'Lawyer',
      icon: '👩‍⚖️',
      description: 'Fight for justice and rights',
      dayInLife: 'Lawyers research cases, argue in court, and protect people\'s rights.',
      womanRole: 'Ruth Bader Ginsburg fought for equal rights and served on the Supreme Court.',
      skillsNeeded: ['Critical thinking', 'Research', 'Communication', 'Ethics'],
      educationPath: 'Bachelor\'s degree, Law School (JD), Bar exam',
      quote: '"Women belong in all places where decisions are being made."',
    },
    scientist: {
      id: 'scientist',
      title: 'Scientist',
      icon: '👩‍🔬',
      description: 'Conduct groundbreaking research',
      dayInLife: 'Scientists design experiments, analyze data, and make discoveries that change the world.',
      womanRole: 'Marie Curie won two Nobel Prizes for her work in radioactivity.',
      skillsNeeded: ['Analysis', 'Curiosity', 'Patience', 'Collaboration'],
      educationPath: 'Bachelor\'s in Sciences, Master\'s, PhD, Research positions',
      quote: '"Nothing in life is to be feared, it is only to be understood."',
    },
    teacher: {
      id: 'teacher',
      title: 'Teacher',
      icon: '👩‍🏫',
      description: 'Inspire and teach the next generation',
      dayInLife: 'Teachers plan lessons, engage students, and shape future leaders.',
      womanRole: 'Malala Yousafzai promotes education worldwide and fights for girls\' rights.',
      skillsNeeded: ['Patience', 'Communication', 'Leadership', 'Creativity'],
      educationPath: 'Bachelor\'s in Education or subject, Teaching certification',
      quote: '"Education is the most powerful weapon."',
    },
    chef: {
      id: 'chef',
      title: 'Chef',
      icon: '👩‍🍳',
      description: 'Create culinary art and nourish people',
      dayInLife: 'Chefs develop recipes, manage kitchens, and create unforgettable dining experiences.',
      womanRole: 'Alice Waters revolutionized farm-to-table cooking and food education.',
      skillsNeeded: ['Creativity', 'Organization', 'Leadership', 'Taste'],
      educationPath: 'Culinary school, apprenticeships, restaurant experience',
      quote: '"Cooking is like love. It should be entered into with abandon or not at all."',
    },
    athlete: {
      id: 'athlete',
      title: 'Athlete',
      icon: '⛹️‍♀️',
      description: 'Excel in sports and inspire millions',
      dayInLife: 'Athletes train daily, compete, and represent their nations on global stages.',
      womanRole: 'Serena Williams is the greatest tennis player ever and advocates for equality.',
      skillsNeeded: ['Discipline', 'Determination', 'Teamwork', 'Physical fitness'],
      educationPath: 'Sports training, college scholarships, professional leagues',
      quote: '"I really think a champion is defined not by their wins and losses, but how they can inspire others to be better."',
    },
    pilot: {
      id: 'pilot',
      title: 'Pilot',
      icon: '👩‍✈️',
      description: 'Command the skies and explore',
      dayInLife: 'Pilots fly aircraft, navigate routes, and ensure passenger safety.',
      womanRole: 'Amelia Earhart was a pioneering pilot who pushed the boundaries of flight.',
      skillsNeeded: ['Precision', 'Quick thinking', 'Communication', 'Leadership'],
      educationPath: 'Commercial pilot license, Flight training, Airlines hiring',
      quote: '"The most difficult thing is the decision to act, the rest is merely tenacity."',
    },
    entrepreneur: {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      icon: '👩‍💼',
      description: 'Start and run your own business',
      dayInLife: 'Entrepreneurs create businesses, innovate, and build teams around their vision.',
      womanRole: 'Oprah Winfrey built a media empire from nothing through hard work.',
      skillsNeeded: ['Leadership', 'Innovation', 'Risk management', 'Communication'],
      educationPath: 'Business degree optional, Business plan, Funding, Execution',
      quote: '"The biggest adventure you can ever take is to live the life of your dreams."',
    },
    military: {
      id: 'military',
      title: 'Military Officer',
      icon: '👩‍✈️',
      description: 'Serve your country with honor',
      dayInLife: 'Military officers lead teams, make strategic decisions, and protect national security.',
      womanRole: 'General Maria Ramirez leads military operations with exceptional leadership.',
      skillsNeeded: ['Leadership', 'Discipline', 'Strategy', 'Courage'],
      educationPath: 'Military Academy or Officer Training School, Commissions',
      quote: '"Serve with honor, lead with integrity."',
    },
  };

  const quizQuestions: QuizQuestion[] = [
    {
      question: 'What energizes you most?',
      answers: [
        { text: 'Helping others', careers: ['doctor', 'teacher', 'lawyer'] },
        { text: 'Creating things', careers: ['engineer', 'artist', 'entrepreneur'] },
        { text: 'Exploring and discovering', careers: ['scientist', 'astronaut', 'pilot'] },
        { text: 'Leading and organizing', careers: ['entrepreneur', 'military', 'teacher'] },
      ],
    },
    {
      question: 'What is your strongest skill?',
      answers: [
        { text: 'Analytical thinking', careers: ['scientist', 'engineer', 'lawyer'] },
        { text: 'Creative expression', careers: ['artist', 'chef', 'entrepreneur'] },
        { text: 'Communication', careers: ['teacher', 'lawyer', 'military'] },
        { text: 'Physical ability', careers: ['athlete', 'astronaut', 'pilot'] },
      ],
    },
    {
      question: 'What kind of environment do you prefer?',
      answers: [
        { text: 'Indoor, controlled', careers: ['scientist', 'lawyer', 'engineer'] },
        { text: 'Outdoor, active', careers: ['athlete', 'pilot', 'astronaut'] },
        { text: 'Interactive with people', careers: ['teacher', 'doctor', 'entrepreneur'] },
        { text: 'Creative studio', careers: ['artist', 'chef', 'engineer'] },
      ],
    },
    {
      question: 'What impact do you want to have?',
      answers: [
        { text: 'Personal impact on individuals', careers: ['doctor', 'teacher', 'lawyer'] },
        { text: 'Global/societal impact', careers: ['scientist', 'entrepreneur', 'military'] },
        { text: 'Emotional/cultural impact', careers: ['artist', 'chef', 'athlete'] },
        { text: 'Technological impact', careers: ['engineer', 'scientist', 'entrepreneur'] },
      ],
    },
    {
      question: 'How do you handle pressure?',
      answers: [
        { text: 'Thrive under pressure', careers: ['athlete', 'pilot', 'military'] },
        { text: 'Need time to analyze', careers: ['scientist', 'engineer', 'lawyer'] },
        { text: 'Adapt and improvise', careers: ['entrepreneur', 'chef', 'artist'] },
        { text: 'Support others through it', careers: ['teacher', 'doctor', 'lawyer'] },
      ],
    },
    {
      question: 'What motivates you most?',
      answers: [
        { text: 'Making a difference', careers: ['teacher', 'doctor', 'lawyer'] },
        { text: 'Personal success', careers: ['entrepreneur', 'athlete', 'pilot'] },
        { text: 'Continuous learning', careers: ['scientist', 'engineer', 'teacher'] },
        { text: 'Creative fulfillment', careers: ['artist', 'chef', 'entrepreneur'] },
      ],
    },
    {
      question: 'How do you prefer to work?',
      answers: [
        { text: 'Independently', careers: ['artist', 'entrepreneur', 'pilot'] },
        { text: 'In teams', careers: ['doctor', 'engineer', 'military'] },
        { text: 'With the public', careers: ['teacher', 'chef', 'athlete'] },
        { text: 'Behind the scenes', careers: ['scientist', 'engineer', 'lawyer'] },
      ],
    },
    {
      question: 'What does success look like for you?',
      answers: [
        { text: 'Helping others succeed', careers: ['teacher', 'doctor', 'lawyer'] },
        { text: 'Building something great', careers: ['entrepreneur', 'engineer', 'artist'] },
        { text: 'Being recognized', careers: ['athlete', 'pilot', 'chef'] },
        { text: 'Making a scientific breakthrough', careers: ['scientist', 'engineer', 'entrepreneur'] },
      ],
    },
    {
      question: 'What is your biggest strength?',
      answers: [
        { text: 'Empathy', careers: ['doctor', 'teacher', 'lawyer'] },
        { text: 'Problem-solving', careers: ['engineer', 'scientist', 'entrepreneur'] },
        { text: 'Leadership', careers: ['military', 'entrepreneur', 'athlete'] },
        { text: 'Artistic expression', careers: ['artist', 'chef', 'athlete'] },
      ],
    },
    {
      question: 'What excites you most about the future?',
      answers: [
        { text: 'Technological innovation', careers: ['engineer', 'scientist', 'pilot'] },
        { text: 'Making my own path', careers: ['entrepreneur', 'artist', 'athlete'] },
        { text: 'Improving society', careers: ['doctor', 'teacher', 'lawyer'] },
        { text: 'Exploring new frontiers', careers: ['astronaut', 'pilot', 'scientist'] },
      ],
    },
  ];

  const handleQuizAnswer = (careerIds: string[]) => {
    const newAnswers = [...quizAnswers, ...careerIds];
    setQuizAnswers(newAnswers);

    const newScores = { ...scores };
    careerIds.forEach((id) => {
      newScores[id] = (newScores[id] || 0) + 1;
    });
    setScores(newScores);

    if (quizAnswers.length + 1 >= quizQuestions.length) {
      setStage('results');
    }
  };

  const topThreeCareers = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, 3)
    .map(([id]) => id);

  const resetQuiz = () => {
    setStage('career-selection');
    setQuizAnswers([]);
    setScores({});
    setSelectedCareers([]);
  };

  const toggleDreamBoard = (careerId: string) => {
    if (dreamBoard.includes(careerId)) {
      setDreamBoard(dreamBoard.filter((c) => c !== careerId));
    } else {
      setDreamBoard([...dreamBoard, careerId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brinda-purple mb-2">She Can Be - Career Quiz</h1>
          <p className="text-gray-700">Discover which career paths match your interests and talents.</p>
        </div>

        {stage === 'career-selection' && (
          <>
            <div className="mb-8 space-y-4">
              <Button
                onClick={() => {
                  setQuizAnswers([]);
                  setScores({});
                  setStage('quiz');
                }}
                variant="primary"
                size="lg"
                className="w-full md:w-auto"
              >
                Start Career Quiz
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(careers).map((career) => (
                <Card key={career.id} hoverable>
                  <CardBody className="text-center">
                    <div className="text-5xl mb-3">{career.icon}</div>
                    <h3 className="text-lg font-bold text-brinda-purple mb-2">{career.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{career.description}</p>
                    <Button
                      onClick={() => {
                        setSelectedCareers([career.id]);
                        setStage('spotlight');
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )}

        {stage === 'quiz' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold text-brinda-purple">
                Question {quizAnswers.length + 1} of {quizQuestions.length}
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                <div
                  className="bg-brinda-gold h-full rounded-full transition-all"
                  style={{ width: `${((quizAnswers.length + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">{quizQuestions[quizAnswers.length].question}</h3>
              <div className="space-y-3">
                {quizQuestions[quizAnswers.length].answers.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(answer.careers)}
                    className="w-full p-4 rounded-lg bg-white border-2 border-gray-300 hover:border-brinda-purple hover:bg-purple-50 transition-all text-left font-medium min-h-[50px]"
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {stage === 'results' && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-3xl font-bold text-brinda-purple">Your Career Matches</h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <p className="text-gray-700">Based on your answers, here are your top 3 matching careers:</p>

                {topThreeCareers.map((careerId, index) => {
                  const career = careers[careerId];
                  return (
                    <div key={careerId} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{career.icon}</div>
                          <div>
                            <p className="text-sm text-brinda-gold font-bold">#{index + 1} Match</p>
                            <h3 className="text-2xl font-bold text-brinda-purple">{career.title}</h3>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleDreamBoard(careerId)}
                          className={`px-4 py-2 rounded-lg font-bold transition-all min-h-[44px] ${
                            dreamBoard.includes(careerId)
                              ? 'bg-brinda-gold text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {dreamBoard.includes(careerId) ? '❤️ Added' : '❤️ Add'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-bold text-brinda-purple mb-1">Day in the Life:</p>
                          <p className="text-gray-700">{career.dayInLife}</p>
                        </div>
                        <div>
                          <p className="font-bold text-brinda-purple mb-1">Skills Needed:</p>
                          <div className="flex flex-wrap gap-2">
                            {career.skillsNeeded.map((skill) => (
                              <span key={skill} className="bg-purple-100 text-brinda-purple px-3 py-1 rounded-full text-xs font-bold">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 bg-pink-50 rounded p-3">
                        <p className="font-bold text-brinda-purple mb-1">👩 Woman Role Model:</p>
                        <p className="text-sm text-gray-700">{career.womanRole}</p>
                      </div>

                      <div className="mt-2 italic text-brinda-purple font-semibold">"{career.quote}"</div>

                      <p className="text-xs text-gray-600 mt-3">
                        <span className="font-bold">Education Path:</span> {career.educationPath}
                      </p>
                    </div>
                  );
                })}
              </CardBody>
              <CardFooter className="flex gap-2">
                <Button onClick={resetQuiz} variant="primary" className="flex-1">
                  Take Quiz Again
                </Button>
                <Button
                  onClick={() => setStage('spotlight')}
                  variant="secondary"
                  className="flex-1"
                >
                  Explore Careers
                </Button>
              </CardFooter>
            </Card>

            {dreamBoard.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold text-brinda-purple">My Dream Board</h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dreamBoard.map((careerId) => {
                      const career = careers[careerId];
                      return (
                        <div key={careerId} className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                          <div className="text-5xl mb-2">{career.icon}</div>
                          <p className="font-bold text-brinda-purple">{career.title}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    These are your dream careers! Keep these in mind as you plan your education and future.
                  </p>
                </CardBody>
              </Card>
            )}
          </>
        )}

        {stage === 'spotlight' && selectedCareers.length > 0 && (
          <>
            {selectedCareers.map((careerId) => {
              const career = careers[careerId];
              return (
                <Card key={careerId} className="mb-8">
                  <CardHeader>
                    <button
                      onClick={() => setSelectedCareers([])}
                      className="text-brinda-purple hover:text-brinda-purple-dark mb-4 font-bold"
                    >
                      ← Back to Careers
                    </button>
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{career.icon}</div>
                      <h2 className="text-3xl font-bold text-brinda-purple">{career.title}</h2>
                    </div>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <p className="text-gray-700 text-lg">{career.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-brinda-purple mb-3">Day in the Life</h3>
                        <p className="text-gray-700">{career.dayInLife}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-brinda-purple mb-3">Skills You'll Need</h3>
                        <ul className="space-y-2">
                          {career.skillsNeeded.map((skill) => (
                            <li key={skill} className="flex items-center gap-2 text-gray-700">
                              <span className="text-brinda-gold">✓</span> {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-brinda-purple mb-2">👩 Woman Role Model</h3>
                      <p className="text-gray-700 mb-3">{career.womanRole}</p>
                      <p className="italic text-brinda-purple font-semibold">"{career.quote}"</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-brinda-purple mb-2">Education Path</h3>
                      <p className="text-gray-700">{career.educationPath}</p>
                    </div>
                  </CardBody>
                  <CardFooter className="flex gap-2">
                    <Button onClick={() => toggleDreamBoard(careerId)} variant="primary" className="flex-1">
                      {dreamBoard.includes(careerId) ? '❤️ Remove from Dream Board' : '❤️ Add to Dream Board'}
                    </Button>
                    <Button onClick={() => setSelectedCareers([])} variant="outline" className="flex-1">
                      Back
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
