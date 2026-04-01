'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Region = 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania';
type ViewMode = 'explore' | 'quiz';
type QuestionType = 'capital' | 'language' | 'currency' | 'funfact';

interface Country {
  name: string;
  capital: string;
  flag: string;
  population: string;
  language: string;
  currency: string;
  funFact: string;
  womenLeader: string;
}

interface RegionData {
  name: Region;
  icon: string;
  description: string;
  countries: Country[];
}

interface QuizQuestion {
  type: QuestionType;
  question: string;
  country: Country;
  correctAnswer: string;
  options: string[];
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  showFeedback: boolean;
  isAnswerCorrect: boolean | null;
  isComplete: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuizQuestions(allCountries: Country[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const shuffledCountries = shuffleArray(allCountries);
  const countriesToUse = shuffledCountries.slice(0, 10);
  const questionTypes: QuestionType[] = ['capital', 'language', 'currency', 'funfact'];

  countriesToUse.forEach((country) => {
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    let question = '';
    let correctAnswer = '';

    switch (questionType) {
      case 'capital':
        question = `What is the capital of ${country.name}?`;
        correctAnswer = country.capital;
        break;
      case 'language':
        question = `What language is spoken in ${country.name}?`;
        correctAnswer = country.language;
        break;
      case 'currency':
        question = `What is the currency of ${country.name}?`;
        correctAnswer = country.currency;
        break;
      case 'funfact':
        question = `Which of these is a fact about ${country.name}?`;
        correctAnswer = country.funFact;
        break;
    }

    const options = [correctAnswer];
    const otherCountries = shuffledCountries.filter((c) => c.name !== country.name).slice(0, 3);

    otherCountries.forEach((otherCountry) => {
      switch (questionType) {
        case 'capital':
          options.push(otherCountry.capital);
          break;
        case 'language':
          options.push(otherCountry.language);
          break;
        case 'currency':
          options.push(otherCountry.currency);
          break;
        case 'funfact':
          options.push(otherCountry.funFact);
          break;
      }
    });

    questions.push({
      type: questionType,
      question,
      country,
      correctAnswer,
      options: shuffleArray(options),
    });
  });

  return questions;
}

export default function GeographyModule() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('explore');
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const regions: RegionData[] = [
    {
      name: 'Africa',
      icon: '🌍',
      description: 'The birthplace of humanity, rich in culture and diversity',
      countries: [
        {
          name: 'Egypt',
          capital: 'Cairo',
          flag: '🇪🇬',
          population: '104 million',
          language: 'Arabic',
          currency: 'Egyptian Pound',
          funFact: 'Home to the Great Pyramids, one of the Seven Wonders of the World',
          womenLeader: 'Fatima al-Fihri founded the first university in the world (859 AD)',
        },
        {
          name: 'Nigeria',
          capital: 'Abuja',
          flag: '🇳🇬',
          population: '223 million',
          language: 'English',
          currency: 'Nigerian Naira',
          funFact: 'Nigeria is the most populous country in Africa',
          womenLeader: 'Chimamanda Ngozi Adichie is a world-renowned author and activist',
        },
        {
          name: 'South Africa',
          capital: 'Pretoria',
          flag: '🇿🇦',
          population: '60 million',
          language: 'Zulu, Xhosa, English',
          currency: 'South African Rand',
          funFact: 'Has three capital cities: executive, legislative, and judicial',
          womenLeader: 'Ellen Johnson Sirleaf, Nobel Peace Prize winner from nearby Liberia',
        },
        {
          name: 'Kenya',
          capital: 'Nairobi',
          flag: '🇰🇪',
          population: '54 million',
          language: 'Swahili, English',
          currency: 'Kenyan Shilling',
          funFact: 'Home to Mount Kenya, the second-highest mountain in Africa',
          womenLeader: 'Wangari Maathai was a Nobel Prize-winning environmental activist',
        },
        {
          name: 'Ghana',
          capital: 'Accra',
          flag: '🇬🇭',
          population: '34 million',
          language: 'English',
          currency: 'Ghanaian Cedi',
          funFact: 'First African nation to gain independence',
          womenLeader: 'Nana Ama Agyeman Badu Akosua is a pioneering scientist',
        },
        {
          name: 'Morocco',
          capital: 'Rabat',
          flag: '🇲🇦',
          population: '37 million',
          language: 'Arabic, Berber',
          currency: 'Moroccan Dirham',
          funFact: 'Gateway between Africa and Europe across the Strait of Gibraltar',
          womenLeader: 'Assia Boutaleb is a leading Moroccan entrepreneur',
        },
      ],
    },
    {
      name: 'Asia',
      icon: '🌏',
      description: 'The largest continent, home to 60% of the world population',
      countries: [
        {
          name: 'India',
          capital: 'New Delhi',
          flag: '🇮🇳',
          population: '1.4 billion',
          language: 'Hindi, English',
          currency: 'Indian Rupee',
          funFact: 'India is the birthplace of Yoga, Chess, and many innovations',
          womenLeader: 'Indra Nooyi, former CEO of PepsiCo',
        },
        {
          name: 'Japan',
          capital: 'Tokyo',
          flag: '🇯🇵',
          population: '125 million',
          language: 'Japanese',
          currency: 'Japanese Yen',
          funFact: 'Home to cutting-edge technology and ancient traditions',
          womenLeader: 'Yoko Tawada is a Nobel Prize nominee in Literature',
        },
        {
          name: 'China',
          capital: 'Beijing',
          flag: '🇨🇳',
          population: '1.4 billion',
          language: 'Mandarin Chinese',
          currency: 'Chinese Yuan',
          funFact: 'The Great Wall is visible from space',
          womenLeader: 'Soong May-ling was a powerful political figure',
        },
        {
          name: 'Thailand',
          capital: 'Bangkok',
          flag: '🇹🇭',
          population: '70 million',
          language: 'Thai',
          currency: 'Thai Baht',
          funFact: 'Never colonized by any Western power',
          womenLeader: 'Sirinimit Ketsiriratsakon is a leading Thai educator',
        },
        {
          name: 'Indonesia',
          capital: 'Jakarta',
          flag: '🇮🇩',
          population: '276 million',
          language: 'Indonesian',
          currency: 'Indonesian Rupiah',
          funFact: 'An archipelago of over 17,000 islands',
          womenLeader: 'Susi Pudjiastuti was Indonesia\'s first female maritime minister',
        },
        {
          name: 'South Korea',
          capital: 'Seoul',
          flag: '🇰🇷',
          population: '52 million',
          language: 'Korean',
          currency: 'South Korean Won',
          funFact: 'World leader in internet speed and technology',
          womenLeader: 'Park Geun-hye was South Korea\'s first female president',
        },
      ],
    },
    {
      name: 'Europe',
      icon: '🗺️',
      description: 'Continent of diverse cultures, history, and innovation',
      countries: [
        {
          name: 'France',
          capital: 'Paris',
          flag: '🇫🇷',
          population: '67 million',
          language: 'French',
          currency: 'Euro',
          funFact: 'The Eiffel Tower attracts 6 million visitors annually',
          womenLeader: 'Marie Curie won two Nobel Prizes',
        },
        {
          name: 'Germany',
          capital: 'Berlin',
          flag: '🇩🇪',
          population: '84 million',
          language: 'German',
          currency: 'Euro',
          funFact: 'Germany has over 1,500 varieties of sausage',
          womenLeader: 'Angela Merkel was the longest-serving EU leader',
        },
        {
          name: 'Spain',
          capital: 'Madrid',
          flag: '🇪🇸',
          population: '48 million',
          language: 'Spanish',
          currency: 'Euro',
          funFact: 'Invented the guitar and invented flamenco dance',
          womenLeader: 'Penélope Cruz is an influential Spanish actress',
        },
        {
          name: 'Italy',
          capital: 'Rome',
          flag: '🇮🇹',
          population: '58 million',
          language: 'Italian',
          currency: 'Euro',
          funFact: 'The Vatican is located within Rome',
          womenLeader: 'Grazia Deledda won the Nobel Prize in Literature',
        },
        {
          name: 'Sweden',
          capital: 'Stockholm',
          flag: '🇸🇪',
          population: '10.5 million',
          language: 'Swedish',
          currency: 'Swedish Krona',
          funFact: 'Home to Stieg Larsson and dynamic tech innovation',
          womenLeader: 'Greta Thunberg is a leading climate activist',
        },
        {
          name: 'Poland',
          capital: 'Warsaw',
          flag: '🇵🇱',
          population: '37 million',
          language: 'Polish',
          currency: 'Polish Zloty',
          funFact: 'Marie Curie was born in Warsaw',
          womenLeader: 'Ewa Kiedis is pioneering Polish women in tech',
        },
      ],
    },
    {
      name: 'North America',
      icon: '🌎',
      description: 'Connected by the Panama Canal, diverse nations',
      countries: [
        {
          name: 'United States',
          capital: 'Washington, D.C.',
          flag: '🇺🇸',
          population: '338 million',
          language: 'English',
          currency: 'US Dollar',
          funFact: 'Home to Silicon Valley and Hollywood',
          womenLeader: 'Kamala Harris is the first female Vice President',
        },
        {
          name: 'Canada',
          capital: 'Ottawa',
          flag: '🇨🇦',
          population: '38 million',
          language: 'English, French',
          currency: 'Canadian Dollar',
          funFact: 'Niagara Falls straddles the Canada-US border',
          womenLeader: 'Viola Desmond fought against segregation',
        },
        {
          name: 'Mexico',
          capital: 'Mexico City',
          flag: '🇲🇽',
          population: '128 million',
          language: 'Spanish',
          currency: 'Mexican Peso',
          funFact: 'Built an entire city on a lake (Tenochtitlan)',
          womenLeader: 'Frida Kahlo is an iconic Mexican artist',
        },
        {
          name: 'Costa Rica',
          capital: 'San José',
          flag: '🇨🇷',
          population: '5.2 million',
          language: 'Spanish',
          currency: 'Costa Rican Colón',
          funFact: 'Has no military and is a leader in renewable energy',
          womenLeader: 'Laura Chinchilla was Costa Rica\'s first female president',
        },
        {
          name: 'Cuba',
          capital: 'Havana',
          flag: '🇨🇺',
          population: '11 million',
          language: 'Spanish',
          currency: 'Cuban Peso',
          funFact: 'Famous for cigars, salsa music, and classic cars',
          womenLeader: 'Vilma Espín fought in the Cuban Revolution',
        },
        {
          name: 'Jamaica',
          capital: 'Kingston',
          flag: '🇯🇲',
          population: '2.8 million',
          language: 'English',
          currency: 'Jamaican Dollar',
          funFact: 'Known as the birthplace of reggae music',
          womenLeader: 'Portia Simpson Miller was Jamaica\'s first female Prime Minister',
        },
      ],
    },
    {
      name: 'South America',
      icon: '🌎',
      description: 'Home to the Amazon and vibrant cultures',
      countries: [
        {
          name: 'Brazil',
          capital: 'Brasília',
          flag: '🇧🇷',
          population: '215 million',
          language: 'Portuguese',
          currency: 'Brazilian Real',
          funFact: 'Contains the Amazon Rainforest, the world\'s largest',
          womenLeader: 'Dilma Rousseff was Brazil\'s first female president',
        },
        {
          name: 'Argentina',
          capital: 'Buenos Aires',
          flag: '🇦🇷',
          population: '46 million',
          language: 'Spanish',
          currency: 'Argentine Peso',
          funFact: 'Birthplace of Tango and home to amazing beef',
          womenLeader: 'Cristina Fernández de Kirchner was a powerful president',
        },
        {
          name: 'Peru',
          capital: 'Lima',
          flag: '🇵🇪',
          population: '34 million',
          language: 'Spanish, Quechua',
          currency: 'Peruvian Nuevo Sol',
          funFact: 'Home to Machu Picchu, a Wonder of the World',
          womenLeader: 'Claudia Llosa is a famous Peruvian filmmaker',
        },
        {
          name: 'Chile',
          capital: 'Santiago',
          flag: '🇨🇱',
          population: '19 million',
          language: 'Spanish',
          currency: 'Chilean Peso',
          funFact: 'Stretches over 2,670 miles but averages only 110 miles wide',
          womenLeader: 'Michelle Bachelet was Chile\'s first female president',
        },
        {
          name: 'Colombia',
          capital: 'Bogotá',
          flag: '🇨🇴',
          population: '52 million',
          language: 'Spanish',
          currency: 'Colombian Peso',
          funFact: 'Home to the world\'s highest biodiversity',
          womenLeader: 'Francia Márquez is a leading environmental activist',
        },
        {
          name: 'Ecuador',
          capital: 'Quito',
          flag: '🇪🇨',
          population: '18 million',
          language: 'Spanish',
          currency: 'US Dollar',
          funFact: 'Named after the equator that passes through it',
          womenLeader: 'Lenín Moreno appointed gender-balanced cabinet',
        },
      ],
    },
    {
      name: 'Oceania',
      icon: '🏝️',
      description: 'Island nations and unique ecosystems',
      countries: [
        {
          name: 'Australia',
          capital: 'Canberra',
          flag: '🇦🇺',
          population: '26 million',
          language: 'English',
          currency: 'Australian Dollar',
          funFact: 'Home to unique wildlife like kangaroos and koalas',
          womenLeader: 'Cathy Freeman lit the Olympic cauldron',
        },
        {
          name: 'New Zealand',
          capital: 'Wellington',
          flag: '🇳🇿',
          population: '5.1 million',
          language: 'English, Te Reo Māori',
          currency: 'New Zealand Dollar',
          funFact: 'First country to give women the right to vote',
          womenLeader: 'Jacinda Ardern was a popular Prime Minister',
        },
        {
          name: 'Fiji',
          capital: 'Suva',
          flag: '🇫🇯',
          population: '0.9 million',
          language: 'Fijian, English',
          currency: 'Fijian Dollar',
          funFact: 'Famous for its pristine beaches and coral reefs',
          womenLeader: 'Joni Madraiwiwi is a leading Fijian judge',
        },
        {
          name: 'Samoa',
          capital: 'Apia',
          flag: '🇼🇸',
          population: '0.2 million',
          language: 'Samoan, English',
          currency: 'Samoan Tala',
          funFact: 'Crosses the International Date Line creating unique geography',
          womenLeader: 'Fiame Naomi Mata\'afa was a prominent politician',
        },
        {
          name: 'Papua New Guinea',
          capital: 'Port Moresby',
          flag: '🇵🇬',
          population: '9.1 million',
          language: 'English, Hiri Motu',
          currency: 'Papua New Guinean Kina',
          funFact: 'Most linguistically diverse nation in the world',
          womenLeader: 'Dame Carol Kidu was the first female MP',
        },
        {
          name: 'Solomon Islands',
          capital: 'Honiara',
          flag: '🇸🇧',
          population: '0.7 million',
          language: 'English',
          currency: 'Solomon Islands Dollar',
          funFact: 'Scattered across 992 islands',
          womenLeader: 'Winnie Kaltongga was a pioneering female leader',
        },
      ],
    },
  ];

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setSelectedCountry(null);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const startQuiz = () => {
    const allCountries = regions.flatMap((r) => r.countries);
    const questions = generateQuizQuestions(allCountries);
    setQuizState({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      showFeedback: false,
      isAnswerCorrect: null,
      isComplete: false,
    });
  };

  const handleAnswerSelect = (answer: string) => {
    if (!quizState || quizState.showFeedback) return;

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setQuizState({
      ...quizState,
      selectedAnswer: answer,
      showFeedback: true,
      isAnswerCorrect: isCorrect,
      score: isCorrect ? quizState.score + 1 : quizState.score,
    });
  };

  const handleNextQuestion = () => {
    if (!quizState) return;

    const nextIndex = quizState.currentQuestionIndex + 1;

    if (nextIndex >= quizState.questions.length) {
      setQuizState({
        ...quizState,
        isComplete: true,
      });
    } else {
      setQuizState({
        ...quizState,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showFeedback: false,
        isAnswerCorrect: null,
      });
    }
  };

  const resetQuiz = () => {
    setQuizState(null);
    setSelectedRegion(null);
  };

  const currentRegion = regions.find((r) => r.name === selectedRegion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brinda-purple mb-2">🌍 World Geography</h1>
          <p className="text-gray-700">Discover our world: cultures, nations, and global perspectives.</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          {(['explore', 'quiz'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-6 py-3 rounded-lg font-bold transition-all min-h-[44px] ${
                viewMode === mode
                  ? 'bg-brinda-purple text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {mode === 'explore' ? '🗺️ Explore' : '🧠 Quiz'}
            </button>
          ))}
        </div>

        {quizState ? (
          <>
            {/* Quiz Mode */}
            {quizState.isComplete ? (
              <Card>
                <CardBody className="text-center space-y-6 py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-brinda-purple">Quiz Complete!</h2>
                  <div className="text-5xl font-bold text-brinda-gold my-6">{quizState.score}/10</div>
                  <p className="text-lg text-gray-700">
                    {quizState.score === 10
                      ? 'Perfect score! You\'re a geography expert! 🌟'
                      : quizState.score >= 8
                        ? 'Excellent work! You know your world well! 🌍'
                        : quizState.score >= 6
                          ? 'Good job! Keep learning and exploring! 📚'
                          : 'Nice try! Geography is fun to explore! 🗺️'}
                  </p>
                  <Button onClick={resetQuiz} className="mt-6 bg-brinda-purple text-white px-8 py-3 rounded-lg font-bold hover:bg-brinda-purple-dark">
                    Play Again
                  </Button>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-brinda-purple">Question {quizState.currentQuestionIndex + 1}/10</p>
                    <p className="font-bold text-brinda-gold">Score: {quizState.score}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brinda-purple h-2 rounded-full transition-all"
                      style={{
                        width: `${((quizState.currentQuestionIndex + 1) / 10) * 100}%`,
                      }}
                    ></div>
                  </div>
                </CardHeader>
                <CardBody className="space-y-6">
                  {quizState.questions[quizState.currentQuestionIndex] && (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-5xl mb-4">
                          {quizState.questions[quizState.currentQuestionIndex].country.flag}
                        </div>
                        <h3 className="text-2xl font-bold text-brinda-purple">
                          {quizState.questions[quizState.currentQuestionIndex].question}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {quizState.questions[quizState.currentQuestionIndex].options.map((option) => {
                          const isCorrect = option === quizState.questions[quizState.currentQuestionIndex].correctAnswer;
                          const isSelected = option === quizState.selectedAnswer;

                          return (
                            <button
                              key={option}
                              onClick={() => handleAnswerSelect(option)}
                              disabled={quizState.showFeedback}
                              className={`p-4 rounded-lg font-bold text-left transition-all ${
                                !quizState.showFeedback
                                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                  : isSelected
                                    ? isCorrect
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : isCorrect
                                      ? 'bg-green-500 text-white'
                                      : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {quizState.showFeedback && (
                        <div
                          className={`p-4 rounded-lg text-center font-bold ${
                            quizState.isAnswerCorrect
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-red-100 text-red-800 border border-red-300'
                          }`}
                        >
                          {quizState.isAnswerCorrect
                            ? '✓ Correct! Great job!'
                            : `✗ Not quite. The correct answer is: ${quizState.questions[quizState.currentQuestionIndex].correctAnswer}`}
                        </div>
                      )}

                      {quizState.showFeedback && (
                        <Button
                          onClick={handleNextQuestion}
                          className="w-full bg-brinda-purple text-white py-3 rounded-lg font-bold hover:bg-brinda-purple-dark"
                        >
                          {quizState.currentQuestionIndex + 1 === quizState.questions.length ? 'See Results' : 'Next Question'}
                        </Button>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            )}
          </>
        ) : !selectedRegion ? (
          <>
            {/* Region Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {regions.map((region) => (
                <Card key={region.name} hoverable onClick={() => handleRegionSelect(region.name)}>
                  <CardBody className="text-center cursor-pointer">
                    <div className="text-6xl mb-3">{region.icon}</div>
                    <h3 className="text-xl font-bold text-brinda-purple mb-2">{region.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{region.description}</p>
                    <p className="text-xs text-brinda-gold font-bold">{region.countries.length} Countries</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        ) : selectedCountry && viewMode === 'explore' ? (
          <>
            {/* Country Detail */}
            <Card className="mb-6">
              <CardHeader>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-brinda-purple hover:text-brinda-purple-dark mb-4 font-bold"
                >
                  ← Back to {selectedRegion}
                </button>
                <div className="text-6xl mb-3">{selectedCountry.flag}</div>
                <h2 className="text-3xl font-bold text-brinda-purple">{selectedCountry.name}</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-brinda-purple mb-3">Key Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-bold">Capital:</span> {selectedCountry.capital}</p>
                      <p><span className="font-bold">Population:</span> {selectedCountry.population}</p>
                      <p><span className="font-bold">Language:</span> {selectedCountry.language}</p>
                      <p><span className="font-bold">Currency:</span> {selectedCountry.currency}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-brinda-purple mb-3">Interesting Facts</h3>
                    <p className="text-sm text-gray-700">{selectedCountry.funFact}</p>
                  </div>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h3 className="font-bold text-brinda-purple mb-2">👩 Women Leaders & Achievers</h3>
                  <p className="text-sm text-gray-700">{selectedCountry.womenLeader}</p>
                </div>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setSelectedCountry(null)} variant="outline" className="w-full">
                  Back to Countries
                </Button>
              </CardFooter>
            </Card>
          </>
        ) : currentRegion ? (
          <>
            {/* Region Countries */}
            <Card className="mb-6">
              <CardHeader>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-brinda-purple hover:text-brinda-purple-dark mb-4 font-bold"
                >
                  ← Back to All Regions
                </button>
                <div className="text-5xl mb-3">{currentRegion.icon}</div>
                <h2 className="text-3xl font-bold text-brinda-purple">{currentRegion.name}</h2>
              </CardHeader>
            </Card>

            {viewMode === 'explore' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRegion.countries.map((country) => (
                  <Card key={country.name} hoverable onClick={() => handleCountrySelect(country)}>
                    <CardBody className="text-center cursor-pointer">
                      <div className="text-5xl mb-3">{country.flag}</div>
                      <h3 className="text-lg font-bold text-brinda-purple mb-2">{country.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">Capital: {country.capital}</p>
                      <p className="text-xs text-brinda-gold font-bold">Click for more details</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardBody className="text-center space-y-6 py-8">
                  <div className="text-6xl mb-4">🧠</div>
                  <h2 className="text-2xl font-bold text-brinda-purple">Ready to test your geography knowledge?</h2>
                  <p className="text-gray-700">
                    Take a 10-question quiz about countries from around the world. You'll be asked about capitals, languages, currencies, and fun facts!
                  </p>
                  <Button
                    onClick={startQuiz}
                    className="bg-brinda-purple text-white px-8 py-3 rounded-lg font-bold hover:bg-brinda-purple-dark min-h-[44px]"
                  >
                    Start Quiz
                  </Button>
                </CardBody>
              </Card>
            )}
          </>
        ) : null}

        {/* Info Section */}
        {!selectedRegion && (
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-xl font-bold text-brinda-purple">Our Connected World</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="font-bold text-brinda-purple mb-2">🌐 195 Countries</p>
                  <p className="text-gray-700 text-sm">Each with unique cultures, languages, and traditions worth exploring.</p>
                </div>
                <div>
                  <p className="font-bold text-brinda-purple mb-2">👩 Women Leaders</p>
                  <p className="text-gray-700 text-sm">Learn about the amazing women making a difference in each region.</p>
                </div>
                <div>
                  <p className="font-bold text-brinda-purple mb-2">🌏 Global Perspective</p>
                  <p className="text-gray-700 text-sm">Understand how our world is interconnected and culturally diverse.</p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
