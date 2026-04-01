'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';

type CookiePreference = {
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreference>({
    essential: true,
    preferences: false,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) {
      setShowBanner(true);
    } else {
      // Load stored preferences
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      } catch {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreference = {
      essential: true,
      preferences: true,
      analytics: true,
    };
    saveCookieConsent(allAccepted);
  };

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreference = {
      essential: true,
      preferences: false,
      analytics: false,
    };
    saveCookieConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveCookieConsent(preferences);
  };

  const saveCookieConsent = (prefs: CookiePreference) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setShowBanner(false);
    setShowDetails(false);
    // Here you would typically update analytics and preference-based features
    if (prefs.analytics) {
      // Initialize analytics
    }
    if (prefs.preferences) {
      // Load preference-based features
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!showDetails ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Cookie Preferences
              </h3>
              <p className="text-sm text-gray-600 mb-4 sm:mb-0">
                We use cookies to enhance your experience. Essential cookies are always enabled.
                You can choose to accept additional cookies to improve our service.{' '}
                <Link
                  href="/cookies"
                  className="text-purple-700 hover:text-purple-800 underline font-medium"
                >
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="w-full sm:w-auto"
              >
                Customize
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptEssential}
                className="w-full sm:w-auto"
              >
                Essential Only
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white"
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Cookie Preferences
              </h3>

              {/* Essential Cookies - Always on */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="h-4 w-4 text-purple-700 rounded cursor-not-allowed"
                      />
                      Essential Cookies
                    </label>
                    <p className="text-xs text-gray-600 mt-1 ml-6">
                      Required for basic functionality. Cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            preferences: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-purple-700 rounded cursor-pointer"
                      />
                      Preference Cookies
                    </label>
                    <p className="text-xs text-gray-600 mt-1 ml-6">
                      Remember your settings and preferences for a personalized experience.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            analytics: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-purple-700 rounded cursor-pointer"
                      />
                      Analytics Cookies
                    </label>
                    <p className="text-xs text-gray-600 mt-1 ml-6">
                      Help us understand how you use BrindaWorld so we can improve it.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                For more details, see our{' '}
                <Link
                  href="/cookies"
                  className="text-purple-700 hover:text-purple-800 underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptEssential}
                className="w-full sm:w-auto"
              >
                Essential Only
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
