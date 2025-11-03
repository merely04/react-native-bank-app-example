import { ExpenseType } from '@/types';

export const convertExpenseTypeToColor = (expenseType: ExpenseType) => {
  return {
    moneyTransfer: '#CC3F02',
    food: '#FE5900',
    entertainment: '#FF9332',
    other: '#FFD8A5',
  }[expenseType];
};
