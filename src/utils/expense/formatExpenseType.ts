import { ExpenseType } from '@/types';

export const formatExpenseType = (expenseType: ExpenseType) => {
  return {
    moneyTransfer: 'Money Transfer',
    food: 'Food',
    entertainment: 'Entertainment',
    other: 'Other',
  }[expenseType];
};
