'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const allPricingTiers = [
    {
      category: 'Individual',
      tiers: [
        {
          name: 'Free',
          price: '$0',
          billing: '',
          description: 'Perfect for exploring',
          features: ['Browse all modules', 'View lessons', 'No account required', 'Mobile friendly'],
          trial: 'Unlimited',
          href: '/modules/chess',
          cta: 'Start Exploring',
          popular: false,
        },
        {
          name: 'Family Monthly',
          price: '$3.99',
          billing: '/month CAD',
          description: 'Save your progress',
          features: ['All Free features', 'Save progress', 'Track achievements', '1 parent + 1 child', 'Weekly updates', 'Email support'],
          trial: 'Free forever',
          href: '/signup',
          cta: 'Get Started',
          popular: true,
        },
        {
          name: 'Family Annual',
          price: '$39.99',
          billing: '/year CAD',
          description: 'Best value for families',
          features: ['All Monthly features', 'Save 17%', 'Cancel anytime', '1 parent + 1 child', 'Priority email support', 'Early access to new modules'],
          trial: 'Free forever',
          href: '/signup',
          cta: 'Get Started',
          popular: false,
        },
      ],
    },
    {
      category: 'Group Plans',
      tiers: [
        {
          name: 'Group 5',
          price: '$19.99',
          billing: '/month',
          description: 'Small group or family',
          features: ['Up to 5 learners', 'All Family features', 'Basic progress reports', 'Group admin access', 'Email support'],
          trial: '7 days free',
          href: '/contact',
          cta: 'Contact Us',
          popular: false,
        },
        {
          name: 'Group 10',
          price: '$34.99',
          billing: '/month',
          description: 'Growing community',
          features: ['Up to 10 learners', 'All Group 5 features', 'Advanced analytics', 'Flexible admin roles', 'Priority support'],
          trial: '7 days free',
          href: '/contact',
          cta: 'Contact Us',
          popular: false,
        },
      ],
    },
    {
      category: 'School & Organization',
      tiers: [
        {
          name: 'School Starter',
          price: '$99',
          billing: '/month',
          description: 'For small schools',
          features: ['Up to 50 students', 'Teacher dashboard', 'Class management', 'Basic reports', 'Email support'],
          trial: '30 days free',
          href: '/contact',
          cta: 'Contact Us',
          popular: false,
        },
        {
          name: 'School Standard',
          price: '$299',
          billing: '/month',
          description: 'For medium schools',
          features: ['Up to 200 students', 'All Starter features', 'Advanced analytics', 'Assessment tools', 'Phone + Email support'],
          trial: '30 days free',
          href: '/contact',
          cta: 'Contact Us',
          popular: true,
        },
        {
          name: 'School Unlimited',
          price: '$999',
          billing: '/month',
          description: 'For large institutions',
          features: ['Unlimited students', 'All Standard features', 'Custom integrations', 'Dedicated account manager', '24/7 priority support'],
          trial: '30 days free',
          href: '/contact',
          cta: 'Contact Us',
          popular: false,
        },
      ],
    },
    {
      category: 'Enterprise',
      tiers: [
        {
          name: 'District',
          price: 'Custom',
          billing: '',
          description: 'Multi-school districts',
          features: ['All schools in district', 'White-label options', 'Custom integrations', 'Staff training', 'Dedicated support team'],
          trial: 'Custom',
          href: '/contact',
          cta: 'Get Quote',
          popular: false,
        },
        {
          name: 'Province',
          price: 'Custom',
          billing: '',
          description: 'Provincial reach',
          features: ['Statewide deployment', 'Custom curriculum', 'Integration support', 'Government compliance', 'Executive support'],
          trial: 'Custom',
          href: '/contact',
          cta: 'Get Quote',
          popular: false,
        },
        {
          name: 'NGO Partner',
          price: 'Custom',
          billing: '',
          description: 'Nonprofit organizations',
          features: ['Custom pricing', 'Free/discounted tiers', 'Bulk licensing', 'Impact reporting', 'Partnership opportunities'],
          trial: 'Custom',
          href: '/contact',
          cta: 'Get Quote',
          popular: false,
        },
      ],
    },
  ];

  const comparison = [
    { feature: 'Learning Modules', free: '✓', family: '✓', group: '✓', school: '✓' },
    { feature: 'Progress Tracking', free: 'Limited', family: '✓', group: '✓', school: '✓' },
    { feature: 'Achievements', free: 'No', family: '✓', group: '✓', school: '✓' },
    { feature: 'Parent Dashboard', free: 'No', family: '✓', group: '✓', school: 'N/A' },
    { feature: 'Teacher Dashboard', free: 'No', family: 'No', group: 'Limited', school: '✓' },
    { feature: 'Assignments', free: 'No', family: 'No', group: 'No', school: '✓' },
    { feature: 'Analytics', free: 'No', family: 'Basic', group: 'Advanced', school: 'Advanced' },
    { feature: 'Support', free: 'Community', family: 'Email', group: 'Priority', school: 'Priority' },
  ];

  const faqs = [
    {
      q: 'Can I change my plan anytime?',
      a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
    },
    {
      q: 'Do you offer discounts for annual billing?',
      a: 'Yes, Family Annual plans save 17% compared to monthly billing. Contact us for bulk discounts on school and enterprise plans.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers.',
    },
    {
      q: 'Is there a free trial for paid plans?',
      a: 'Yes, all paid plans include a free trial period. Family plans are free forever to start. Group and school plans include 7-30 days free.',
    },
    {
      q: 'What if I need help choosing a plan?',
      a: 'Contact our team at contact@brindaworld.com or use the chat on this page. We can help you find the perfect plan for your needs.',
    },
    {
      q: 'Are there discounts for nonprofits or NGOs?',
      a: 'Absolutely! We offer special pricing for nonprofits and educational institutions. Contact us for details.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-brinda-purple">BrindaWorld</Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brinda-purple via-purple-100 to-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-brinda-purple mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-700">
            From free exploration to enterprise solutions, we have a plan for everyone.
          </p>
        </div>
      </section>

      {/* All Pricing Tiers */}
      {allPricingTiers.map((category, categoryIdx) => (
        <section key={categoryIdx} className="px-6 py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">
              {category.category}
            </h2>
            <div className={`grid gap-8 ${
              category.tiers.length === 2 ? 'md:grid-cols-2' :
              category.tiers.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
            }`}>
              {category.tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={tier.popular ? 'ring-2 ring-brinda-gold md:scale-105' : ''}
                  hoverable
                >
                  {tier.popular && (
                    <div className="bg-brinda-gold text-white text-center py-2 px-4 rounded-full inline-block mb-4 text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <CardBody>
                    <h3 className="text-2xl font-bold text-brinda-purple mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-brinda-purple">{tier.price}</div>
                      {tier.billing && <div className="text-gray-600 text-sm">{tier.billing}</div>}
                    </div>
                    <p className="text-gray-600 mb-2">{tier.description}</p>
                    <p className="text-sm text-brinda-gold font-semibold mb-6">Trial: {tier.trial}</p>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-brinda-gold flex-shrink-0">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                  <CardFooter className="border-0 pt-0">
                    <Link href={tier.href} className="w-full">
                      <Button
                        variant={tier.popular ? 'primary' : 'outline'}
                        className="w-full"
                      >
                        {tier.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Feature Comparison */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-brinda-purple">
                  <th className="p-4 text-left font-bold text-brinda-purple">Feature</th>
                  <th className="p-4 text-center font-bold text-brinda-purple">Free</th>
                  <th className="p-4 text-center font-bold text-brinda-purple">Family</th>
                  <th className="p-4 text-center font-bold text-brinda-purple">Group</th>
                  <th className="p-4 text-center font-bold text-brinda-purple">School</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-medium text-gray-700 border-b border-gray-200">{row.feature}</td>
                    <td className="p-4 text-center border-b border-gray-200">{row.free}</td>
                    <td className="p-4 text-center border-b border-gray-200">{row.family}</td>
                    <td className="p-4 text-center border-b border-gray-200">{row.group}</td>
                    <td className="p-4 text-center border-b border-gray-200">{row.school}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-brinda-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-purple-100">Join thousands of girls learning with BrindaWorld today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button variant="secondary" size="lg">Get Started Free</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
