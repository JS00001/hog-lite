import { getLocales } from 'expo-localization';
import { I18n, TranslateOptions } from 'i18n-js';

import en, { TranslationKey } from './locales/en';
import ja from './locales/ja';

export const supportedLocales = ['en', 'ja'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const resolveLocale = (
  languageCode: string | null | undefined,
): SupportedLocale => {
  const language = languageCode?.split(/[-_]/)[0] as SupportedLocale;
  return supportedLocales.includes(language) ? language : 'en';
};

const i18n = new I18n({ en, ja });

i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export const setLocale = (languageCode: string | null | undefined) => {
  i18n.locale = resolveLocale(languageCode);
  return i18n.locale as SupportedLocale;
};

setLocale(getLocales()[0]?.languageCode);

export const getLocale = () => i18n.locale as SupportedLocale;
export const t = (key: TranslationKey, options?: TranslateOptions) =>
  i18n.t(key, options);
