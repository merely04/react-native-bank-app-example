export const ExpenseType = {
	MoneyTransfer: 'moneyTransfer',
	Food: 'food',
	Entertainment: 'entertainment',
	Other: 'other'
} as const;

export type ExpenseType = typeof ExpenseType[keyof typeof ExpenseType];

export interface Recipient {
	avatarUrl: string;
	name: string;
}

export interface Expense {
	type: ExpenseType;
	recipient: Recipient;
	amount: number;
	date: Date;
}
