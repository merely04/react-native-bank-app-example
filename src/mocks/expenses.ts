import { Expense, ExpenseType } from '@/types';
import { mockRecipients } from './recipients';

interface DayExpenses {
  date: Date;
  expanses: Expense[];
}

export const mockExpenses: DayExpenses[] = [
  {
    date: new Date(),
    expanses: [
      {
        type: ExpenseType.MoneyTransfer,
        recipient: mockRecipients[0], // Matthew Billson
        amount: 5.555,
        date: new Date(),
      },
    ],
  },
  {
    date: new Date(2024, 5, 10),
    expanses: [
      {
        type: ExpenseType.MoneyTransfer,
        recipient: mockRecipients[0],
        amount: 56.19,
        date: new Date(2024, 5, 10, 13, 24),
      },
      {
        type: ExpenseType.Food,
        recipient: mockRecipients[2],
        amount: 122.47,
        date: new Date(2024, 5, 10, 12, 12),
      },
    ],
  },
  {
    date: new Date(2024, 5, 9),
    expanses: [
      {
        type: ExpenseType.Entertainment,
        recipient: mockRecipients[3],
        amount: 13.17,
        date: new Date(2024, 5, 9, 21, 2),
      },
      {
        type: ExpenseType.Other,
        recipient: mockRecipients[4],
        amount: 28,
        date: new Date(2024, 5, 9, 18, 33),
      },
    ],
  },
];
