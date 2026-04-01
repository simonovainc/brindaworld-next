'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Log to console for now (would send via email service in production)
      console.log('Contact form submission:', formData);

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700">
            Questions? Ideas? Partnership opportunities? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardBody>
                <h3 className="text-xl font-bold text-brinda-purple mb-3">📧 Email</h3>
                <p className="text-gray-600 mb-2">General inquiries:</p>
                <a href="mailto:hello@brindaworld.com" className="text-brinda-purple font-semibold hover:underline">
                  hello@brindaworld.com
                </a>
                <p className="text-gray-600 mt-4 mb-2">Sales & partnerships:</p>
                <a href="mailto:sales@brindaworld.com" className="text-brinda-purple font-semibold hover:underline">
                  sales@brindaworld.com
                </a>
                <p className="text-gray-600 mt-4 mb-2">Support:</p>
                <a href="mailto:support@brindaworld.com" className="text-brinda-purple font-semibold hover:underline">
                  support@brindaworld.com
                </a>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3 className="text-xl font-bold text-brinda-purple mb-3">📍 Office</h3>
                <p className="text-gray-600">
                  Fredericton, NB<br />
                  Canada
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3 className="text-xl font-bold text-brinda-purple mb-3">🕐 Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday<br />
                  9:00 AM - 5:00 PM EST
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-brinda-purple">Send us a Message</h2>
              </CardHeader>
              <CardBody>
                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-6">
                    <p className="font-semibold mb-1">Message sent successfully!</p>
                    <p className="text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isLoading}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />

                  <Input
                    label="Subject"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    disabled={isLoading}
                  />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isLoading}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brinda-purple"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    Send Message
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'What is your response time?',
                a: 'We typically respond to inquiries within 24-48 business hours. For urgent matters, please call or email support@brindaworld.com.',
              },
              {
                q: 'Do you offer school or corporate partnerships?',
                a: 'Yes! We work with schools, districts, and organizations. Please email sales@brindaworld.com to discuss partnership opportunities.',
              },
              {
                q: 'How do I report a technical issue?',
                a: 'Please email support@brindaworld.com or use the support chat on the platform. Provide as much detail as possible about the issue.',
              },
              {
                q: 'Can I request new features?',
                a: 'Absolutely! We love hearing feature requests. Send them to hello@brindaworld.com and we\'ll consider them for future releases.',
              },
              {
                q: 'How do I delete my account?',
                a: 'You can request account deletion from your account settings, or email support@brindaworld.com with your request.',
              },
              {
                q: 'Where is BrindaWorld located?',
                a: 'Our main office is in Fredericton, NB, Canada. We also have team members distributed globally.',
              },
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardBody>
                  <h3 className="font-bold text-brinda-purple mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-brinda-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg mb-8 text-purple-100">
            Join our community or partner with us to empower girls through education.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button variant="secondary" size="lg">Start Learning</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
