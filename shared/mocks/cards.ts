import { Card, CardType } from '@/entities/card';

export const mockCards: Card[] = [
  {
    type: CardType.Debit,
    number: '2200223354124385',
    balance: 4098.12,
  },
  {
    type: CardType.Virtual,
    number: '2200223354129081',
    balance: 14.71,
  },
];
