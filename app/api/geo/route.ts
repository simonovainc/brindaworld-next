import { NextRequest, NextResponse } from 'next/server';

interface GeoResponse {
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
  languages: string[];
  currency: string;
}

// In-memory cache to avoid rate limiting
const geoCache = new Map<string, { data: GeoResponse; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Extract IP from request headers
 * Checks Vercel headers first, then common proxy headers
 */
function getClientIp(request: NextRequest): string | null {
  // Vercel provides geo info directly via headers
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    return vercelCountry; // This is actually the country code
  }

  // Fall back to IP extraction
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    null
  );
}

/**
 * Fetch geo data from ip-api.com with fallback handling
 */
async function fetchGeoFromIp(ip: string): Promise<GeoResponse | null> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,regionName,city,status`, {
      headers: {
        'User-Agent': 'BrindaWorld/1.0',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.status !== 'success') {
      return null;
    }

    return {
      country: data.country || 'Unknown',
      countryCode: data.countryCode?.toUpperCase() || 'CA',
      region: data.regionName,
      city: data.city,
      languages: getLanguagesForCountry(data.countryCode?.toUpperCase() || 'CA'),
      currency: getCurrencyForCountry(data.countryCode?.toUpperCase() || 'CA'),
    };
  } catch (error) {
    console.error('Geo API error:', error);
    return null;
  }
}

/**
 * Get languages for a country code
 */
function getLanguagesForCountry(countryCode: string): string[] {
  const languageMap: Record<string, string[]> = {
    CA: ['en', 'fr'],
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
    ZA: ['en'],
    NG: ['en'],
    EG: ['ar'],
    SA: ['ar'],
    AE: ['ar', 'en'],
    IL: ['he'],
    TR: ['tr'],
    ID: ['id'],
    TH: ['th'],
    VN: ['vi'],
    PH: ['en'],
    SG: ['en'],
    MY: ['ms'],
    NL: ['nl'],
    BE: ['nl', 'fr'],
    CH: ['fr', 'de', 'it'],
    AT: ['de'],
    SE: ['sv'],
    NO: ['no'],
    DK: ['da'],
    FI: ['fi'],
    PL: ['pl'],
    UA: ['uk'],
    GR: ['el'],
    CZ: ['cs'],
    RO: ['ro'],
    HU: ['hu'],
    IE: ['en'],
  };

  return languageMap[countryCode] || ['en'];
}

/**
 * Get currency for a country code
 */
function getCurrencyForCountry(countryCode: string): string {
  const currencyMap: Record<string, string> = {
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
  };

  return currencyMap[countryCode] || 'USD';
}

/**
 * GET /api/geo
 * Returns geo-location data based on client IP or Vercel headers
 * Uses in-memory caching to avoid API rate limits
 */
export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // If we got a country code directly from Vercel, use it
    if (clientIp && clientIp.length === 2) {
      const countryCode = clientIp.toUpperCase();
      const cachedData = geoCache.get(countryCode);

      // Return cached data if available and not expired
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        return NextResponse.json(cachedData.data);
      }

      // Build response from country code
      const geoData: GeoResponse = {
        country: countryCode,
        countryCode: countryCode,
        region: request.headers.get('x-vercel-ip-country-region') || undefined,
        city: undefined,
        languages: getLanguagesForCountry(countryCode),
        currency: getCurrencyForCountry(countryCode),
      };

      // Cache it
      geoCache.set(countryCode, { data: geoData, timestamp: Date.now() });
      return NextResponse.json(geoData);
    }

    // If we have an IP, try to fetch geo data
    if (clientIp && clientIp.length > 2) {
      const cachedData = geoCache.get(clientIp);

      // Return cached data if available and not expired
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        return NextResponse.json(cachedData.data);
      }

      const geoData = await fetchGeoFromIp(clientIp);

      if (geoData) {
        // Cache the result
        geoCache.set(clientIp, { data: geoData, timestamp: Date.now() });
        return NextResponse.json(geoData);
      }
    }

    // Fallback to Canada/English if detection fails
    const fallback: GeoResponse = {
      country: 'Canada',
      countryCode: 'CA',
      languages: ['en', 'fr'],
      currency: 'CAD',
    };

    return NextResponse.json(fallback);
  } catch (error) {
    console.error('Geo endpoint error:', error);

    // Return safe fallback on error
    const fallback: GeoResponse = {
      country: 'Canada',
      countryCode: 'CA',
      languages: ['en', 'fr'],
      currency: 'CAD',
    };

    return NextResponse.json(fallback, { status: 500 });
  }
}
