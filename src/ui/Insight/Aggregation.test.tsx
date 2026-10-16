import React from 'react';
import { Text } from 'react-native';
import { act, create } from 'react-test-renderer';

import type { Aggregation } from '@/@types';
import AggregationCard from './Aggregation';

jest.mock('@/ui/Text', () => require('react-native').Text);
jest.mock('@/lib/theme', () => ({
  __esModule: true,
  default: () => ({ white: '#fff' }),
}));
jest.mock('@/lib/utils', () => ({
  formatNumber: (value: number) => String(value),
}));

const aggregation = (
  count: number,
  aggregated_value?: number,
): Aggregation => ({
  count,
  aggregated_value,
  label: 'Events',
  data: [],
  days: [],
  labels: [],
  filter: { display: 'BoldNumber' },
});

describe('aggregation breakdown percentages', () => {
  it.each<[string, Aggregation[], string[]]>([
    ['zero counts', [aggregation(0), aggregation(0)], ['0 (0%)', '0 (0%)']],
    [
      'zero aggregated values with nonzero counts',
      [aggregation(10, 0), aggregation(20, 0)],
      ['0 (0%)', '0 (0%)'],
    ],
    [
      'nonzero counts',
      [aggregation(1), aggregation(3)],
      ['1 (25%)', '3 (75%)'],
    ],
    [
      'nonzero aggregated values',
      [aggregation(10, 3), aggregation(20, 1)],
      ['3 (75%)', '1 (25%)'],
    ],
  ])('renders %s', (_, data, expected) => {
    let renderer: ReturnType<typeof create>;
    act(() => {
      renderer = create(<AggregationCard data={data} />);
    });

    const values = renderer!.root
      .findAllByType(Text)
      .map((node) => React.Children.toArray(node.props.children).join(''))
      .filter((text) => text.includes('%'));

    expect(values).toEqual(expected);

    act(() => renderer!.unmount());
  });
});
