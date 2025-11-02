import { ExpenseType } from "./model";
 
export const convertExpenseTypeToColor = (expenseType: ExpenseType) => {
	return {
		moneyTransfer: '#CC3F02',
		food: '#FE5900',
		entertainment: '#FF9332',
		other: '#FFD8A5'
	}[expenseType];
}

export const formatExpenseType = (expenseType: ExpenseType) => {
	return {
		moneyTransfer: 'Money Transfer',
		food: 'Food',
		entertainment: 'Entertainment',
		other: 'Other'
	}[expenseType];
}
