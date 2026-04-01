/**
 * Geo utilities for language and currency detection based on country/region
 */

export interface GeoData {
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
  languages: string[];
  currency: string;
}

// Country code to primary language(s) mapping (ISO 639-1)
const COUNTRY_LANGUAGES: Record<string, string[]> = {
  CA: ['en', 'fr'], // Canada - English and French
  US: ['en'],
  MX: ['es'],
  GB: ['en'],
  FR: ['fr'],
  DE: ['de'],
  ES: ['es'],
  IT: ['it'],
  PT: ['pt'],
  BR: ['pt'],
  RU: ['ru'],
  CN: ['zh'],
  JP: ['ja'],
  KR: ['ko'],
  IN: ['en', 'hi'],
  AU: ['en'],
  NZ: ['en'],
  ZA: ['en', 'af'],
  NG: ['en'],
  EG: ['ar'],
  SA: ['ar'],
  AE: ['ar', 'en'],
  IL: ['he', 'ar'],
  TR: ['tr'],
  ID: ['id'],
  TH: ['th'],
  VN: ['vi'],
  PH: ['en', 'tl'],
  SG: ['en', 'zh', 'ms', 'ta'],
  MY: ['ms', 'en'],
  NL: ['nl'],
  BE: ['nl', 'fr', 'de'],
  CH: ['fr', 'de', 'it', 'rm'],
  AT: ['de'],
  SE: ['sv'],
  NO: ['no'],
  DK: ['da'],
  FI: ['fi'],
  PL: ['pl'],
  UA: ['uk', 'ru'],
  GR: ['el'],
  CZ: ['cs'],
  RO: ['ro'],
  HU: ['hu'],
  IE: ['en'],
  NI: ['es'],
  AR: ['es'],
  CL: ['es'],
  CO: ['es'],
  PE: ['es'],
};

// Country code to currency mapping (ISO 4217)
const COUNTRY_CURRENCIES: Record<string, string> = {
  CA: 'CAD',
  US: 'USD',
  MX: 'MXN',
  GB: 'GBP',
  FR: 'EUR',
  DE: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  PT: 'EUR',
  BR: 'BRL',
  RU: 'RUB',
  CN: 'CNY',
  JP: 'JPY',
  KR: 'KRW',
  IN: 'INR',
  AU: 'AUD',
  NZ: 'NZD',
  ZA: 'ZAR',
  NG: 'NGN',
  EG: 'EGP',
  SA: 'SAR',
  AE: 'AED',
  IL: 'ILS',
  TR: 'TRY',
  ID: 'IDR',
  TH: 'THB',
  VN: 'VND',
  PH: 'PHP',
  SG: 'SGD',
  MY: 'MYR',
  NL: 'EUR',
  BE: 'EUR',
  CH: 'CHF',
  AT: 'EUR',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  FI: 'EUR',
  PL: 'PLN',
  UA: 'UAH',
  GR: 'EUR',
  CZ: 'CZK',
  RO: 'RON',
  HU: 'HUF',
  IE: 'EUR',
  NI: 'NIO',
  AR: 'ARS',
  CL: 'CLP',
  CO: 'COP',
  PE: 'PEN',
};

// Canadian province to language mapping
const CANADIAN_PROVINCE_LANGUAGES: Record<string, string[]> = {
  QC: ['fr', 'en'], // Quebec - French primary
  NB: ['en', 'fr'], // New Brunswick - both
  ON: ['en'],
  BC: ['en'],
  AB: ['en'],
  MB: ['en'],
  SK: ['en'],
  PE: ['en'],
  NS: ['en'],
  NL: ['en'],
  NT: ['en'],
  YT: ['en'],
  NU: ['en'],
};

/**
 * Get display languages for a country, with optional province/region override
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @param regionCode - Province/state code (e.g., 'QC' for Quebec)
 * @returns Array of language codes
 */
export function getDisplayLanguages(
  countryCode: string,
  regionCode?: string
): string[] {
  // Handle Canadian provinces specially
  if (countryCode === 'CA' && regionCode) {
    const provinceLanguages = CANADIAN_PROVINCE_LANGUAGES[regionCode];
    if (provinceLanguages) {
      return provinceLanguages;
    }
  }

  return COUNTRY_LANGUAGES[countryCode] || ['en'];
}

/**
 * Get the primary display language for a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @param regionCode - Province/state code (e.g., 'QC' for Quebec)
 * @returns Language code (e.g., 'en', 'fr')
 */
export function getDisplayLanguage(
  countryCode: string,
  regionCode?: string
): string {
  const languages = getDisplayLanguages(countryCode, regionCode);
  // Prefer French for Quebec, English for rest of Canada
  if (countryCode === 'CA' && regionCode === 'QC') {
    return 'fr';
  }
  return languages[0] || 'en';
}

/**
 * Get the currency for a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns ISO 4217 currency code
 */
export function getCurrencyForCountry(countryCode: string): string {
  return COUNTRY_CURRENCIES[countryCode] || 'USD';
}

/**
 * Get all available languages for a country (for UI selectors)
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Array of supported language codes
 */
export function getAvailableLanguages(countryCode: string): string[] {
  const languages = getDisplayLanguages(countryCode);
  // Return union of detected and common languages
  return Array.from(new Set([...languages, 'en', 'fr']));
}
