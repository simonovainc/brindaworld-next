'use client';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ChessBoard } from '@/components/modules/ChessBoard';

export default function ChessModule() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-brinda-purple mb-4">Chess Module</h1>
        <p className="text-gray-600 mb-8">Master strategy, critical thinking, and the ancient game of chess.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-brinda-purple">Interactive Chessboard</h2>
              </CardHeader>
              <CardBody>
                <ChessBoard interactive={true} />
              </CardBody>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Lessons</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                {[
                  'Opening Principles',
                  'Middlegame Strategy',
                  'Endgame Techniques',
                  'Tactical Patterns',
                  'Famous Games',
                ].map((lesson) => (
                  <button
                    key={lesson}
                    className="w-full text-left px-3 py-2 rounded hover:bg-brinda-pink transition-colors"
                  >
                    {lesson}
                  </button>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Progress</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Beginner</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-brinda-gold h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">About This Module</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-gray-700">
              Chess is more than just a game. It develops critical thinking, strategic planning, and problem-solving
              skills. Through our interactive chess module, you'll learn from the fundamentals to advanced tactics.
            </p>
            <p className="text-gray-700">
              Whether you're a beginner learning the basic moves or an advanced player studying complex strategies,
              BrindaWorld's chess module provides structured lessons and interactive practice.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
