export interface Currency {
  id: number;
  name: string;
  shortCode: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbolFirst: boolean;
  decimalMark: string;
  thousandsSeparator: string;
}
