interface Category {
  type: 'moneyTransfer' | 'food' | 'entertainment' | 'other';
  amount: number;
}

export const mockCategories: Category[] = [
  { type: 'moneyTransfer', amount: 300 },
  { type: 'food', amount: 220 },
  { type: 'entertainment', amount: 200 },
  { type: 'other', amount: 150 },
];
