import { useEffect } from 'react';
import { useAccessibility } from '@/lib/accessibility';

/**
 * Hook to apply accessibility settings to the DOM root element
 * This should be called in a client component early in the app
 */
export function useAccessibilityStyles() {
  const accessibility = useAccessibility();

  useEffect(() => {
    const root = document.documentElement;

    // Apply color blind mode class
    root.classList.remove(
      'color-blind-protanopia',
      'color-blind-deuteranopia',
      'color-blind-tritanopia',
      'color-blind-achromatopsia'
    );
    if (accessibility.colorBlindMode !== 'normal') {
      root.classList.add(`color-blind-${accessibility.colorBlindMode}`);
    }

    // Apply high contrast class
    accessibility.highContrast
      ? root.classList.add('high-contrast')
      : root.classList.remove('high-contrast');

    // Apply large text class
    accessibility.largeText
      ? root.classList.add('large-text')
      : root.classList.remove('large-text');

    // Apply reduced motion class
    accessibility.reducedMotion
      ? root.classList.add('reduced-motion')
      : root.classList.remove('reduced-motion');

    // Apply dyslexia font class
    accessibility.dyslexiaFont
      ? root.classList.add('dyslexia-font')
      : root.classList.remove('dyslexia-font');

    // Apply font size multiplier via data attribute
    root.setAttribute(
      'data-font-size-multiplier',
      accessibility.fontSizeMultiplier.toString()
    );
  }, [
    accessibility.colorBlindMode,
    accessibility.highContrast,
    accessibility.largeText,
    accessibility.reducedMotion,
    accessibility.dyslexiaFont,
    accessibility.fontSizeMultiplier,
  ]);
}
