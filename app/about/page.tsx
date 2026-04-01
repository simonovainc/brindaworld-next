'use client';

import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const team = [
    {
      name: 'VN',
      role: 'Founder & CEO',
      bio: 'Passionate educator and entrepreneur dedicated to empowering girls through technology and quality education.',
      icon: '👩‍💼',
    },
  ];

  const sdgs = [
    { number: 4, title: 'Quality Education', color: 'bg-red-100' },
    { number: 5, title: 'Gender Equality', color: 'bg-red-200' },
    { number: 8, title: 'Decent Work & Growth', color: 'bg-purple-100' },
    { number: 10, title: 'Reduced Inequalities', color: 'bg-purple-200' },
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
            About BrindaWorld
          </h1>
          <p className="text-xl text-gray-700">
            Empowering the next generation of girls through world-class education and mentorship.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-brinda-purple mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              To empower girls around the world by providing access to high-quality, engaging educational content that builds confidence, critical thinking, and career readiness.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe every girl deserves the opportunity to learn, grow, and achieve her full potential regardless of socioeconomic background or geographic location.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-brinda-purple mb-6">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              A world where girls have equal access to education, mentorship, and opportunities in STEAM, leadership, and wellness.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision a platform that not only teaches valuable skills but inspires girls to become leaders, innovators, and changemakers in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Empowerment', desc: 'We believe in building confidence and agency in every girl.' },
              { icon: '🌍', title: 'Inclusivity', desc: 'Education is for everyone. We celebrate diversity and ensure access for all.' },
              { icon: '💡', title: 'Innovation', desc: 'We use cutting-edge technology to create engaging learning experiences.' },
              { icon: '🤝', title: 'Community', desc: 'We foster supportive communities where girls can learn, grow, and thrive together.' },
            ].map((value, idx) => (
              <Card key={idx} hoverable>
                <CardBody className="text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-brinda-purple mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <Card key={idx} hoverable>
              <CardBody className="text-center">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-2xl font-bold text-brinda-purple mb-2">{member.name}</h3>
                <p className="text-brinda-gold font-semibold mb-4">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brinda-purple mb-6 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-brinda-purple mb-4">Built for Impact</h3>
              <p className="text-gray-700 mb-4">
                BrindaWorld is built on modern, scalable technology that ensures:
              </p>
              <ul className="space-y-3">
                {[
                  'Fast, responsive learning experience',
                  'Secure, COPPA-compliant platform',
                  'Accessible design for all abilities',
                  'Real-time progress tracking',
                  'Scalable to serve millions of learners',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-brinda-gold text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-brinda-purple mb-4">Tech Stack</h3>
              <p className="text-gray-700 mb-4">
                We use industry-leading technologies:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Next.js 14',
                  'TypeScript',
                  'Supabase',
                  'PostgreSQL',
                  'Vercel',
                  'Tailwind CSS',
                  'React',
                  'Node.js',
                ].map((tech, idx) => (
                  <div key={idx} className="bg-brinda-purple text-white px-4 py-2 rounded-lg text-sm font-medium text-center">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UN SDG Alignment */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brinda-purple mb-12 text-center">United Nations Sustainable Development Goals</h2>
        <p className="text-center text-gray-700 mb-12 text-lg">
          BrindaWorld is aligned with and contributes to the UN Sustainable Development Goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {sdgs.map((goal, idx) => (
            <Card key={idx} hoverable className={goal.color}>
              <CardBody className="text-center">
                <div className="text-5xl font-bold text-brinda-purple mb-4">SDG {goal.number}</div>
                <h3 className="text-lg font-bold text-brinda-purple">{goal.title}</h3>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="mt-12 bg-blue-50 p-8 rounded-lg border-l-4 border-brinda-purple">
          <h3 className="text-xl font-bold text-brinda-purple mb-4">Our Impact</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-brinda-gold flex-shrink-0">✓</span>
              <span><strong>SDG 4 (Quality Education):</strong> We provide free and premium access to world-class educational content in STEAM, leadership, and wellness.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brinda-gold flex-shrink-0">✓</span>
              <span><strong>SDG 5 (Gender Equality):</strong> We specifically design our platform to empower girls and close the gender gap in education and technology.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brinda-gold flex-shrink-0">✓</span>
              <span><strong>SDG 8 (Decent Work & Economic Growth):</strong> We teach career-ready skills that prepare girls for the jobs of tomorrow.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brinda-gold flex-shrink-0">✓</span>
              <span><strong>SDG 10 (Reduced Inequalities):</strong> We provide affordable, accessible education regardless of background or geography.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-brinda-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-8 text-purple-100">
            Help us empower the next generation of girls leaders and innovators.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button variant="secondary" size="lg">Start Learning</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
