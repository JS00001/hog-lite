import { ISelectOption } from '@/ui/Select/@types';

const timePeriodOptions: ISelectOption[] = [
  { label: 'Today', value: 'dStart' },
  { label: 'Yesterday', value: '-1dStart' },
  { label: 'Last 24 hours', value: '-24h' },
  { label: 'Last 7 days', value: '-7d' },
  { label: 'Last 30 days', value: '-30d' },
  { label: 'Last 90 days', value: '-90d' },
  { label: 'Last 180 days', value: '-180d' },
  { label: 'This month', value: 'mStart' },
  { label: 'Year to date', value: 'yStart' },
  { label: 'All time', value: 'all' },
];

export default timePeriodOptions;
