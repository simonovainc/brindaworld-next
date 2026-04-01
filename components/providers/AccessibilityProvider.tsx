'use client';

import React, { ReactNode } from 'react';
import { useAccessibilityStyles } from '@/lib/useAccessibilityStyles';

/**
 * Provider component that applies accessibility styles to the DOM
 * Place this near the root of your component tree
 */
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  // Apply accessibility styles on mount and when settings change
  useAccessibilityStyles();

  return <>{children}</>;
}
