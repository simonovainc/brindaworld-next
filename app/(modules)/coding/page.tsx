'use client';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export default function CodingModule() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-brinda-purple mb-4">Coding Module</h1>
        <p className="text-gray-600 mb-8">Learn programming and build amazing applications with code.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-brinda-purple">Code Editor</h2>
              </CardHeader>
              <CardBody>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <div>{'// Welcome to BrindaWorld Coding'}</div>
                  <div>{'function greet(name) {'}</div>
                  <div className="pl-4">{'return `Hello, ${name}!`;'}</div>
                  <div>{'}'}</div>
                  <div className="mt-3">{`greet('Girl Coder');`}</div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Languages</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                {['Python', 'JavaScript', 'HTML/CSS', 'Java', 'Ruby'].map((lang) => (
                  <button
                    key={lang}
                    className="w-full text-left px-3 py-2 rounded hover:bg-brinda-pink transition-colors"
                  >
                    {lang}
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
              Learn coding with interactive lessons and real-world projects. From your first "Hello World" to building
              complete applications, we'll guide you through every step.
            </p>
            <p className="text-gray-700">
              Whether you want to build web applications, mobile apps, or work in artificial intelligence, coding is
              the foundation of modern technology. Girls deserve equal opportunity in tech.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
