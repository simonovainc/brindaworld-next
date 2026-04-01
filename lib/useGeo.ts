'use client';

import { useEffect, useState } from 'react';

export interface GeoData {
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
  languages: string[];
  currency: string;
}

const DEFAULT_GEO: GeoData = {
  country: 'Canada',
  countryCode: 'CA',
  languages: ['en', 'fr'],
  currency: 'CAD',
};

/**
 * Hook to fetch and manage geo-location data
 * @returns GeoData object with location information
 */
export function useGeo(): { data: GeoData; loading: boolean; error?: Error } {
  const [data, setData] = useState<GeoData>(DEFAULT_GEO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchGeo = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/geo');

        if (!response.ok) {
          throw new Error(`Geo API error: ${response.status}`);
        }

        const geoData: GeoData = await response.json();
        setData(geoData);
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(DEFAULT_GEO);
      } finally {
        setLoading(false);
      }
    };

    fetchGeo();
  }, []);

  return { data, loading, error };
}
