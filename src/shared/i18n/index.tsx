/**
 * Simple internationalization module for Squoosh
 */
import { h, createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import {
  translations,
  SupportedLanguages,
  DEFAULT_LANGUAGE,
} from './translations';

// Re-export DEFAULT_LANGUAGE
export { DEFAULT_LANGUAGE };

// Language context
export const LanguageContext = createContext<{
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
}>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

// Hook to use translations
export function useTranslation() {
  const { language } = useContext(LanguageContext);

  // Function to get translation
  const t = (key: string, params: Record<string, string> = {}): string => {
    const translation =
      translations[language]?.[key] ||
      translations[DEFAULT_LANGUAGE][key] ||
      key;

    // Replace parameters in translation
    return Object.entries(params).reduce(
      (str, [param, value]) =>
        str.replace(new RegExp(`{{${param}}}`, 'g'), value),
      translation,
    );
  };

  return { t, language };
}

// Language provider component
export function LanguageProvider({
  children,
}: {
  children: preact.ComponentChildren;
}) {
  // Get language from localStorage or use default
  const [language, setLanguageState] = useState<SupportedLanguages>(() => {
    if (typeof localStorage !== 'undefined') {
      return (
        (localStorage.getItem('language') as SupportedLanguages) ||
        DEFAULT_LANGUAGE
      );
    }
    return DEFAULT_LANGUAGE;
  });

  // Update language in localStorage
  const setLanguage = (lang: SupportedLanguages) => {
    setLanguageState(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }

    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // Update HTML lang attribute on initial render
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
