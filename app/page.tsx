'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const modules = [
    { name: 'Chess', icon: '♟️', desc: 'Master strategy and critical thinking', href: '/chess' },
    { name: 'Coding', icon: '💻', desc: 'Learn programming and problem-solving', href: '/coding' },
    { name: 'She Can Be', icon: '🎯', desc: 'Explore careers and aspirations', href: '/quiz' },
    { name: 'Geography', icon: '🌍', desc: 'Discover cultures and global perspectives', href: '/geography' },
    { name: 'Leadership', icon: '👑', desc: 'Develop leadership and communication skills', href: '/leadership' },
    { name: 'Wellness', icon: '💪', desc: 'Build health and wellness habits', href: '/wellness' },
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for exploring',
      features: ['Browse all modules', 'View lessons', 'No account required'],
      href: '/chess',
      cta: 'Start Exploring',
    },
    {
      name: 'Family Monthly',
      price: '$3.99',
      billing: '/month CAD',
      description: 'Save your progress',
      features: ['All Free features', 'Save progress', 'Track achievements', '1 parent + 1 child'],
      href: '/signup',
      cta: 'Get Started',
      featured: true,
    },
    {
      name: 'Family Annual',
      price: '$39.99',
      billing: '/year CAD',
      description: 'Best value for families',
      features: ['All Monthly features', 'Save 17%', 'Cancel anytime', '1 parent + 1 child'],
      href: '/signup',
      cta: 'Get Started',
    },
  ];

  const faqs = [
    {
      q: 'What age group is BrindaWorld for?',
      a: 'BrindaWorld is designed for girls ages 8-18. All content is age-appropriate and scaffolded for different developmental stages.',
    },
    {
      q: 'Is BrindaWorld COPPA compliant?',
      a: 'Yes, we fully comply with COPPA regulations. For children under 13, parental consent is required. See our COPPA policy for details.',
    },
    {
      q: 'Can I use BrindaWorld at school?',
      a: 'Absolutely! We offer school plans with teacher dashboards, class management, and progress tracking. Contact us for pricing.',
    },
    {
      q: 'How much does a school subscription cost?',
      a: 'School plans start at $99/month for the Starter plan. Larger institutions qualify for custom pricing. See our pricing page for all options.',
    },
    {
      q: 'Do you offer international support?',
      a: 'Yes, BrindaWorld supports multiple languages and currencies. We serve users across North America and are expanding globally.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-brinda-purple">BrindaWorld</div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#modules" className="text-gray-600 hover:text-brinda-purple transition">Explore</a>
            <Link href="/chess" className="text-gray-600 hover:text-brinda-purple transition">Play</Link>
            <Link href="/about" className="text-gray-600 hover:text-brinda-purple transition">About</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-brinda-purple transition">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-sm">🌐</div>
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brinda-purple via-purple-100 to-white px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-brinda-purple mb-6">
            Empower Girls Through Education
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Master chess strategy, learn to code, explore geography, and develop leadership skills. All in one platform designed by women, for girls.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/chess">
              <Button variant="primary" size="lg">Start Exploring Free</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">See Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brinda-purple mb-16 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Explore', desc: 'Browse our six learning modules: Chess, Coding, She Can Be, Geography, Leadership, and Wellness. No account needed.' },
            { step: '2', title: 'Save', desc: 'Create a free account to track your progress, earn achievements, and unlock advanced features.' },
            { step: '3', title: 'Flourish', desc: 'Upgrade to premium for personalized coaching, exclusive content, and priority support.' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-brinda-purple text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-brinda-purple mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules Showcase */}
      <section id="modules" className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brinda-purple mb-16 text-center">
            Learning Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Link key={module.name} href={module.href}>
                <Card hoverable className="h-full cursor-pointer">
                  <CardBody>
                    <div className="text-5xl mb-4 text-center">{module.icon}</div>
                    <h3 className="text-xl font-bold text-brinda-purple mb-2 text-center">{module.name}</h3>
                    <p className="text-gray-600 text-center">{module.desc}</p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Showcase */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brinda-purple mb-4 text-center">
          Pricing Plans
        </h2>
        <p className="text-center text-gray-600 mb-16">Choose the plan that works for you</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.featured ? 'ring-2 ring-brinda-gold md:scale-105' : ''}
              hoverable
            >
              {tier.featured && (
                <div className="bg-brinda-gold text-white text-center py-2 px-4 rounded-full inline-block mb-4 text-sm font-bold">
                  Most Popular
                </div>
              )}
              <CardBody>
                <h3 className="text-2xl font-bold text-brinda-purple mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-brinda-purple">{tier.price}</span>
                  {tier.billing && <span className="text-gray-600 text-sm">{tier.billing}</span>}
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brinda-gold">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className="block">
                  <Button
                    variant={tier.featured ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/pricing">
            <Button variant="outline">View All Plans</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brinda-purple mb-16 text-center">
            What Girls and Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "I love learning chess on BrindaWorld. It's fun and I feel so proud when I win!", author: 'Maya, 11' },
              { quote: "My daughter is more confident and excited about STEM. Highly recommend!", author: 'Sarah, Parent' },
              { quote: "The coding module taught me real programming skills. I made my first app!", author: 'Jessica, 14' },
            ].map((testimonial, idx) => (
              <Card key={idx}>
                <CardBody>
                  <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-brinda-purple">{testimonial.author}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brinda-purple mb-16 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} hoverable>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <h3 className="font-bold text-brinda-purple">{faq.q}</h3>
                <span className="text-brinda-purple text-xl">{expandedFaq === idx ? '−' : '+'}</span>
              </button>
              {expandedFaq === idx && (
                <CardBody className="px-6 pb-6 border-t border-gray-200">
                  <p className="text-gray-700">{faq.a}</p>
                </CardBody>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-brinda-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Empower Yourself?</h2>
          <p className="text-lg mb-8 text-purple-100">Join thousands of girls on their learning journey today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button variant="secondary" size="lg">Create Free Account</Button>
            </Link>
            <a href="#modules">
              <Button variant="outline" size="lg">Explore Now</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-white mb-4">BrindaWorld</h3>
              <p className="text-sm text-gray-400 mb-4">Empowering girls through education</p>
              <div className="flex gap-4 text-xl">
                <a href="#" className="hover:text-white transition">f</a>
                <a href="#" className="hover:text-white transition">𝕏</a>
                <a href="#" className="hover:text-white transition">📷</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Modules</h4>
              <ul className="space-y-2 text-sm">
                {modules.map((m) => (
                  <li key={m.name}><Link href={m.href} className="hover:text-white transition">{m.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/legal/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/legal/coppa" className="hover:text-white transition">COPPA</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
                <li><Link href="/legal/accessibility" className="hover:text-white transition">Accessibility</Link></li>
                <li><Link href="/legal/international" className="hover:text-white transition">International</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; 2026 BrindaWorld&trade; &mdash; a tradename of Simonova Inc., Canada&apos;s Federal Corporation. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              Empowering girls through education
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
