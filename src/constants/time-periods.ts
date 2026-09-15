import { ISelectOption } from '@/ui/Select/@types';
import { t } from '@/i18n';

const getTimePeriodOptions = (): ISelectOption[] => [
  { label: t('today'), value: 'dStart' },
  { label: t('yesterday'), value: '-1dStart' },
  { label: t('last24Hours'), value: '-24h' },
  { label: t('last7Days'), value: '-7d' },
  { label: t('last30Days'), value: '-30d' },
  { label: t('last90Days'), value: '-90d' },
  { label: t('last180Days'), value: '-180d' },
  { label: t('thisMonth'), value: 'mStart' },
  { label: t('yearToDate'), value: 'yStart' },
  { label: t('allTime'), value: 'all' },
];

export default getTimePeriodOptions;
