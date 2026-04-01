'use client';

import React, { useState, useEffect } from 'react';
import { useAccessibility, type ColorBlindMode } from '@/lib/accessibility';
import clsx from 'clsx';

const COLOR_BLIND_MODES: { value: ColorBlindMode; label: string; description: string }[] = [
  { value: 'normal', label: 'Normal Vision', description: 'Standard color vision' },
  { value: 'protanopia', label: 'Protanopia', description: 'Red-blind (1% of males)' },
  { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (1% of males)' },
  { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-yellow blind (rare)' },
  { value: 'achromatopsia', label: 'Achromatopsia', description: 'Complete color blindness (rare)' },
];

const FONT_SIZES = [
  { value: 0.9, label: '90%' },
  { value: 1, label: '100%' },
  { value: 1.1, label: '110%' },
  { value: 1.25, label: '125%' },
  { value: 1.5, label: '150%' },
];

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const accessibility = useAccessibility();

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open accessibility options"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        className={clsx(
          'fixed bottom-6 right-6 z-40',
          'w-12 h-12 min-h-12 min-w-12',
          'bg-brinda-primary hover:bg-purple-800',
          'text-white rounded-full',
          'flex items-center justify-center',
          'shadow-lg hover:shadow-xl',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brinda-primary'
        )}
        title="Accessibility settings"
      >
        <AccessibilityIcon className="w-6 h-6" />
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        id="accessibility-panel"
        role="region"
        aria-label="Accessibility settings"
        className={clsx(
          'fixed bottom-20 right-6 z-40',
          'bg-white rounded-lg shadow-xl',
          'w-80 max-h-96 overflow-y-auto',
          'p-6',
          'transform transition-all duration-200',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        )}
        onKeyDown={handleKeyDown}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Accessibility
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility panel"
              className={clsx(
                'text-gray-500 hover:text-gray-700',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brinda-primary'
              )}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Color Blind Mode */}
          <div>
            <label
              htmlFor="color-blind-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Color Blind Mode
            </label>
            <select
              id="color-blind-select"
              value={accessibility.colorBlindMode}
              onChange={(e) =>
                accessibility.setColorBlindMode(e.target.value as ColorBlindMode)
              }
              className={clsx(
                'w-full px-3 py-2 rounded-lg',
                'border border-gray-300',
                'bg-white text-gray-900',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brinda-primary'
              )}
            >
              {COLOR_BLIND_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {
                COLOR_BLIND_MODES.find((m) => m.value === accessibility.colorBlindMode)
                  ?.description
              }
            </p>
          </div>

          {/* Font Size */}
          <div>
            <label
              htmlFor="font-size-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Font Size
            </label>
            <select
              id="font-size-select"
              value={accessibility.fontSizeMultiplier}
              onChange={(e) =>
                accessibility.setFontSizeMultiplier(parseFloat(e.target.value))
              }
              className={clsx(
                'w-full px-3 py-2 rounded-lg',
                'border border-gray-300',
                'bg-white text-gray-900',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brinda-primary'
              )}
            >
              {FONT_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3">
            <ToggleSwitch
              id="high-contrast"
              label="High Contrast"
              checked={accessibility.highContrast}
              onChange={() => accessibility.toggleHighContrast()}
            />

            <ToggleSwitch
              id="reduced-motion"
              label="Reduce Motion"
              checked={accessibility.reducedMotion}
              onChange={() => accessibility.toggleReducedMotion()}
              description="Minimize animations and transitions"
            />

            <ToggleSwitch
              id="dyslexia-font"
              label="Dyslexia-Friendly Font"
              checked={accessibility.dyslexiaFont}
              onChange={() => accessibility.toggleDyslexiaFont()}
            />

            <ToggleSwitch
              id="large-text"
              label="Large Text"
              checked={accessibility.largeText}
              onChange={() => accessibility.toggleLargeText()}
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={() => accessibility.reset()}
            className={clsx(
              'w-full px-4 py-2 rounded-lg',
              'bg-gray-100 hover:bg-gray-200',
              'text-gray-900 font-medium',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brinda-primary'
            )}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </>
  );
}

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  description?: string;
}

function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
  description,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={clsx(
          'relative inline-flex h-6 w-11 rounded-full',
          'transition-colors duration-200',
          checked ? 'bg-brinda-primary' : 'bg-gray-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brinda-primary'
        )}
      >
        <span
          className={clsx(
            'inline-block h-5 w-5 rounded-full',
            'bg-white shadow-md',
            'transform transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
    </div>
  );
}

function AccessibilityIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" />
    </svg>
  );
}
