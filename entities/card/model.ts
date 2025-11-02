export const CardType = {
  Debit: 'debit',
  Virtual: 'virtual',
} as const;

export type CardType = (typeof CardType)[keyof typeof CardType];

export interface Card {
  type: CardType;
  balance: number;
  number: string;
}
