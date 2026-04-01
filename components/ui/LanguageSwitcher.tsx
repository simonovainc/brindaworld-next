'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface LanguageSwitcherProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  autoDetected?: {
    country: string;
    countryCode: string;
  };
}

const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const COUNTRY_FLAG_MAP: Record<string, string> = {
  US: '🇺🇸',
  CA: '🇨🇦',
  GB: '🇬🇧',
  FR: '🇫🇷',
  DE: '🇩🇪',
  ES: '🇪🇸',
  IT: '🇮🇹',
  PT: '🇵🇹',
  BR: '🇧🇷',
  RU: '🇷🇺',
  CN: '🇨🇳',
  JP: '🇯🇵',
  KR: '🇰🇷',
  IN: '🇮🇳',
  AU: '🇦🇺',
  NZ: '🇳🇿',
  MX: '🇲🇽',
  ZA: '🇿🇦',
  NL: '🇳🇱',
  BE: '🇧🇪',
  CH: '🇨🇭',
  AT: '🇦🇹',
  SE: '🇸🇪',
  NO: '🇳🇴',
  DK: '🇩🇰',
  FI: '🇫🇮',
  PL: '🇵🇱',
  CZ: '🇨🇿',
  GR: '🇬🇷',
  TR: '🇹🇷',
  IL: '🇮🇱',
  SA: '🇸🇦',
  AE: '🇦🇪',
  TH: '🇹🇭',
  VN: '🇻🇳',
  ID: '🇮🇩',
  PH: '🇵🇭',
  SG: '🇸🇬',
  MY: '🇲🇾',
  UA: '🇺🇦',
  NG: '🇳🇬',
  EG: '🇪🇬',
};

export function LanguageSwitcher({
  currentLanguage = 'en',
  onLanguageChange,
  autoDetected,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentLangOption = LANGUAGE_OPTIONS.find((opt) => opt.code === currentLanguage);
  const flagEmoji = autoDetected ? COUNTRY_FLAG_MAP[autoDetected.countryCode] || '🌍' : '🌍';

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange?.(languageCode);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', languageCode);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Language selector. Current language: ${currentLangOption?.name || 'English'}`}
        aria-expanded={isOpen}
        aria-controls="language-menu"
        className={clsx(
          'px-3 py-2 rounded-lg',
          'bg-white border border-gray-300',
          'hover:bg-gray-50',
          'flex items-center gap-2',
          'font-medium text-gray-900',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brinda-primary'
        )}
      >
        <span className="text-lg">{currentLangOption?.flag || '🌍'}</span>
        <span className="text-sm hidden sm:inline">{currentLangOption?.name || 'Language'}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      <div
        id="language-menu"
        role="menu"
        className={clsx(
          'absolute top-full mt-2 right-0 z-50',
          'bg-white rounded-lg shadow-lg',
          'border border-gray-200',
          'min-w-56',
          'overflow-hidden',
          'transform transition-all duration-200 origin-top-right',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 visible'
            : 'opacity-0 scale-95 -translate-y-2 invisible'
        )}
      >
        {/* Auto-detected Info */}
        {autoDetected && (
          <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="text-lg mr-2">{flagEmoji}</span>
              Auto-detected: <span className="font-medium">{autoDetected.country}</span>
            </p>
          </div>
        )}

        {/* Language Options */}
        <ul className="py-1" role="none">
          {LANGUAGE_OPTIONS.map((option) => (
            <li key={option.code} role="none">
              <button
                onClick={() => handleLanguageSelect(option.code)}
                role="menuitem"
                aria-current={currentLanguage === option.code ? 'true' : undefined}
                className={clsx(
                  'w-full px-4 py-3 text-left',
                  'flex items-center gap-3',
                  'transition-colors duration-150',
                  currentLanguage === option.code
                    ? 'bg-purple-50 text-brinda-primary font-medium'
                    : 'text-gray-900 hover:bg-gray-50'
                )}
              >
                <span className="text-lg">{option.flag}</span>
                <span className="flex-1">{option.name}</span>
                {currentLanguage === option.code && (
                  <CheckmarkIcon className="w-5 h-5 text-brinda-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay to close menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function ChevronDownIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
}

function CheckmarkIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}
