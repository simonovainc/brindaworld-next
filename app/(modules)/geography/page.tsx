'use client';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export default function GeographyModule() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-brinda-purple mb-4">Geography Module</h1>
        <p className="text-gray-600 mb-8">Discover our world: cultures, nations, and global perspectives.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { region: 'Africa', countries: 54, icon: '🌍' },
            { region: 'Asia', countries: 48, icon: '🌏' },
            { region: 'Europe', countries: 44, icon: '🗺️' },
            { region: 'Americas', countries: 35, icon: '🌎' },
            { region: 'Oceania', countries: 14, icon: '🏝️' },
            { region: 'Global', countries: 195, icon: '🌐' },
          ].map((item) => (
            <Card key={item.region} hoverable>
              <CardBody className="text-center">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-brinda-purple mb-1">{item.region}</h3>
                <p className="text-gray-600 text-sm">{item.countries} countries</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold text-brinda-purple">Interactive World Map</h2>
          </CardHeader>
          <CardBody>
            <div className="bg-gray-200 rounded h-80 flex items-center justify-center">
              <p className="text-gray-600">Interactive map coming soon</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">About This Module</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-gray-700">
              Explore the world through our geography module. Learn about different countries, cultures, languages,
              and the diverse communities that make our planet special.
            </p>
            <p className="text-gray-700">
              From physical geography to human cultures, understand how our world is interconnected and how global
              perspectives help us become better citizens of the world.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
