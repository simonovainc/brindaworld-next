import Link from 'next/link';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const tiers = [
    {
      name: 'Explore',
      description: 'Discover learning modules without an account',
      color: 'bg-gray-50',
      features: [
        'Browse all modules',
        'View lessons',
        'No account required',
      ],
      cta: 'Start Exploring',
      href: '/modules/chess',
    },
    {
      name: 'Save',
      description: 'Create an account to track your progress',
      color: 'bg-brinda-pink',
      features: [
        'Save progress',
        'Track achievements',
        'Create account',
        'Free forever',
      ],
      cta: 'Create Account',
      href: '/signup',
      featured: true,
    },
    {
      name: 'Flourish',
      description: 'Premium access to advanced features',
      color: 'bg-yellow-50',
      features: [
        'All Save features',
        'Advanced coaching',
        'Exclusive content',
        'Priority support',
      ],
      cta: 'Subscribe Now',
      href: '/pricing',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-brinda-pink via-white to-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-bold text-brinda-purple">BrindaWorld</div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-brinda-purple mb-4">
          Empower Your Journey
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn chess, coding, geography, and leadership skills with BrindaWorld
        </p>
        <p className="text-lg text-gray-500 mb-12">
          Three tiers of learning: Explore (free), Save (free account), Flourish (premium)
        </p>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`${tier.color} ${tier.featured ? 'md:scale-105 ring-2 ring-brinda-purple' : ''}`}
              hoverable
            >
              {tier.featured && (
                <div className="bg-brinda-purple text-white text-center py-2 px-4 rounded-full inline-block mb-4 text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-bold text-brinda-purple mb-2">{tier.name}</h2>
              <p className="text-gray-600 mb-6">{tier.description}</p>

              <CardBody className="mb-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brinda-gold text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>

              <CardFooter className="pt-0 border-0">
                <Link href={tier.href} className="w-full">
                  <Button
                    variant={tier.featured ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Modules Preview */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">
          Learning Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Chess', icon: '♟️', desc: 'Master strategy and critical thinking' },
            { name: 'Coding', icon: '💻', desc: 'Learn programming and problem-solving' },
            { name: 'She Can Be', icon: '🎯', desc: 'Explore careers and aspirations' },
            { name: 'Geography', icon: '🌍', desc: 'Discover cultures and global perspectives' },
            { name: 'Leadership', icon: '👑', desc: 'Develop leadership and communication skills' },
            { name: 'Wellness', icon: '💪', desc: 'Build health and wellness habits' },
          ].map((module) => (
            <Card key={module.name} hoverable className="text-center">
              <div className="text-5xl mb-4">{module.icon}</div>
              <h3 className="text-xl font-bold text-brinda-purple mb-2">{module.name}</h3>
              <p className="text-gray-600">{module.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-brinda-purple text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Empower Yourself?</h2>
        <p className="text-lg mb-8">Start learning today with BrindaWorld</p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Create Free Account
            </Button>
          </Link>
          <Link href="/modules/chess">
            <Button variant="outline" size="lg">
              Explore Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 BrindaWorld. All rights reserved.</p>
          <p className="text-sm mt-4">Empowering girls through education</p>
        </div>
      </footer>
    </main>
  );
}
