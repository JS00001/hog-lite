import { t } from '@/i18n';

const getDataRegions = () => [
  {
    title: t('unitedStates'),
    benefits: [
      t('usRegionFast'),
      t('usRegionCompliance'),
      t('usRegionHosting'),
    ],
  },
  {
    title: t('europeanUnion'),
    benefits: [
      t('euRegionFast'),
      t('euRegionCompliance'),
      t('euRegionHosting'),
    ],
  },
  {
    title: t('customEndpoint'),
    benefits: [t('customRegionDescription')],
  },
];

export default getDataRegions;
