/**
 * Export all translations
 */
import { en } from './en';
import { zh } from './zh';

export type SupportedLanguages = 'en' | 'zh';

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguages = 'zh';

export interface TranslationDictionary {
  [key: string]: string;
}

export interface Translations {
  [language: string]: TranslationDictionary;
}

export const translations: Translations = {
  en,
  zh,
};
