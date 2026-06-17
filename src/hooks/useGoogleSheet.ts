/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { getSectionData } from '../services/googleSheets';
import {
  fallbackHero,
  fallbackAbout,
  fallbackServices,
  fallbackSkills,
  fallbackClients,
  fallbackPortfolio,
  fallbackTestimonials,
  fallbackBlogs,
  fallbackResume,
  fallbackContact
} from '../utils/defaultData';

// Reusable cache to persist fetched content across components and navigations
const sheetCache: Record<string, any> = {};

const fallbackMap: Record<string, any> = {
  HERO: fallbackHero,
  ABOUT: fallbackAbout,
  SERVICES: fallbackServices,
  SKILLS: fallbackSkills,
  CLIENTS: fallbackClients,
  PORTFOLIO: fallbackPortfolio,
  TESTIMONIALS: fallbackTestimonials,
  BLOGS: fallbackBlogs,
  RESUME: fallbackResume,
  CONTACT: fallbackContact,
};

export interface UseGoogleSheetResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useGoogleSheet<T>(sheetName: string): UseGoogleSheetResult<T> {
  const UPPER_NAME = sheetName.toUpperCase();
  const defaultFallback = fallbackMap[UPPER_NAME] as T;

  const [data, setData] = useState<T>(() => {
    // If we already have cached data, use it; otherwise, use our premium static fallback
    return sheetCache[UPPER_NAME] !== undefined ? (sheetCache[UPPER_NAME] as T) : defaultFallback;
  });
  const [loading, setLoading] = useState<boolean>(sheetCache[UPPER_NAME] === undefined);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (forceRefresh = false) => {
    if (!forceRefresh && sheetCache[UPPER_NAME] !== undefined) {
      setData(sheetCache[UPPER_NAME] as T);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedData = await getSectionData<T>(UPPER_NAME);
      sheetCache[UPPER_NAME] = parsedData;
      setData(parsedData);
    } catch (err: any) {
      console.warn(`Falling back to default mock data for sheet "${UPPER_NAME}":`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Keep data set to default fallback if never fetched successfully
      if (sheetCache[UPPER_NAME] === undefined) {
        setData(defaultFallback);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [UPPER_NAME]);

  const refresh = async () => {
    await fetchData(true);
  };

  return {
    data,
    loading,
    error,
    refresh,
  };
}
