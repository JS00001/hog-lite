export enum ResultType {
  Aggregation,
  FunnelConversionTime,
  Funnel,
  Retention,
  Unknown,
}

/**
 *  Generic Aggregated Result Value
 */
export type Aggregation = {
  data: any[];
  days: any[];
  count: number;
  aggregated_value?: number;
  label: string;
}[];

/**
 * Retention Result
 */
export type Retention = {
  date: string;
  label: string;
  values: { count: number }[];
}[];

/**
 * Funnel Conversion Time Result
 */
export type FunnelConversionTime = {
  average_conversion_time: number;
  bins: number[][];
};

/**
 * Funnels: Each array item is a step in the funnel
 */
export type Funnel = {
  action_id: string;
  count: number;
  custom_name: string;
  name: string;
  order: number;
}[];

export type Result = Aggregation | FunnelConversionTime | Funnel | Retention;

export interface IInsight {
  name: string;
  description: string;
  result: Result;
}
