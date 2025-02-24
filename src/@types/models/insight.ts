export interface IInsight {
  name: string;
  description: string;
  result: {
    data: any[];
    days: any[];
    count: number;
    aggregated_value: number;
    label: string;
  }[];
}
