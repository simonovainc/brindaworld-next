'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const modules = [
  { path: '/chess', name: 'Chess', icon: '♟️' },
  { path: '/coding', name: 'Coding', icon: '💻' },
  { path: '/geography', name: 'Geography', icon: '🌍' },
  { path: '/quiz', name: 'Career Quiz', icon: '✨' },
  { path: '/leadership', name: 'Leadership', icon: '👑' },
  { path: '/wellness', name: 'Wellness', icon: '🌿' },
];

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-brinda-purple hover:opacity-80">
              <span>🌸</span>
              <span>BrindaWorld</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              {modules.map((module) => (
                <Link
                  key={module.path}
                  href={module.path}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-brinda-purple transition-colors"
                >
                  {module.icon} {module.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>

            {/* User Avatar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brinda-gold flex items-center justify-center text-white font-bold">
                G
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 space-y-2 border-t pt-4">
              {modules.map((module) => (
                <Link
                  key={module.path}
                  href={module.path}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-brinda-purple transition-colors"
                >
                  {module.icon} {module.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🌸</span> BrindaWorld
              </h3>
              <p className="text-gray-400 text-sm">Empowering girls through learning and growth.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Learning Modules</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/chess" className="hover:text-white transition-colors">Chess</Link></li>
                <li><Link href="/coding" className="hover:text-white transition-colors">Coding</Link></li>
                <li><Link href="/geography" className="hover:text-white transition-colors">Geography</Link></li>
                <li><Link href="/quiz" className="hover:text-white transition-colors">Career Quiz</Link></li>
                <li><Link href="/leadership" className="hover:text-white transition-colors">Leadership</Link></li>
                <li><Link href="/wellness" className="hover:text-white transition-colors">Wellness</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 BrindaWorld&trade; &mdash; a tradename of Simonova Inc., Canada&apos;s Federal Corporation. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
