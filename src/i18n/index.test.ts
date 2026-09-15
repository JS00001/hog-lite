import en from './locales/en';
import ja from './locales/ja';
import { resolveLocale, setLocale, t } from '.';
import { formatDate, formatNumber, secondsToString } from '@/lib/utils';

jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('resolveLocale', () => {
  it('selects supported languages and falls back to English', () => {
    expect(resolveLocale('ja')).toBe('ja');
    expect(resolveLocale('ja-JP')).toBe('ja');
    expect(resolveLocale('en')).toBe('en');
    expect(resolveLocale('fr')).toBe('en');
    expect(resolveLocale(null)).toBe('en');
  });

  it('keeps locale keys aligned and falls back to English', () => {
    expect(Object.keys(ja).sort()).toEqual(Object.keys(en).sort());

    setLocale('ja-JP');
    expect(t('navInsights')).toBe('インサイト');

    setLocale('fr');
    expect(t('navInsights')).toBe('Insights');
  });

  it('formats numbers, dates, and durations for the active locale', () => {
    setLocale('en');
    expect(formatNumber(1234)).toBe('1,234');
    expect(formatDate('2021-01-01T12:00:00')).toContain('January 1, 2021');
    expect(secondsToString(90)).toBe('1m');

    setLocale('ja');
    expect(formatNumber(1234)).toBe('1,234');
    expect(formatDate('2021-01-01T12:00:00')).toContain('2021年1月1日');
    expect(secondsToString(90)).toBe('1分');
  });
});
