'use client';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export default function QuizModule() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-brinda-purple mb-4">She Can Be - Quiz Module</h1>
        <p className="text-gray-600 mb-8">Explore inspiring women and different career paths available to you.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '👨‍💼', title: 'Entrepreneur', desc: 'Start and run your own business' },
            { icon: '👩‍🔬', title: 'Scientist', desc: 'Conduct groundbreaking research' },
            { icon: '👩‍⚖️', title: 'Lawyer', desc: 'Fight for justice and rights' },
            { icon: '👩‍🎨', title: 'Artist', desc: 'Express creativity through art' },
            { icon: '👩‍💻', title: 'Software Engineer', desc: 'Build the future with code' },
            { icon: '👩‍🏫', title: 'Educator', desc: 'Inspire and teach the next generation' },
          ].map((career) => (
            <Card key={career.title} hoverable>
              <CardBody className="text-center">
                <div className="text-5xl mb-3">{career.icon}</div>
                <h3 className="text-lg font-bold text-brinda-purple mb-2">{career.title}</h3>
                <p className="text-gray-600 text-sm">{career.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">About This Module</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-gray-700">
              "She Can Be" is an inspiring module that showcases diverse career paths and profiles of women who have
              broken barriers and achieved great things.
            </p>
            <p className="text-gray-700">
              Through interactive quizzes and stories, you'll discover your interests, talents, and the unlimited
              possibilities available to you. Learn about role models from various fields and understand how their
              journeys can inspire your own path.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
