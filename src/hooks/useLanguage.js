import { useState, useEffect } from 'react';

export const useLanguage = () => {
  // Helper to get language from URL parameter
  const getUrlLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    return urlLang === 'it' ? 'it' : urlLang === 'en' ? 'en' : null;
  };

  // Helper to get browser language
  const getBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.toLowerCase().startsWith('it') ? 'it' : 'en';
  };

  const defaultLanguage = getBrowserLanguage();

  // Get initial language: URL param > browser language
  const getInitialLanguage = () => {
    return getUrlLanguage() || defaultLanguage;
  };

  return { getInitialLanguage, defaultLanguage };
};