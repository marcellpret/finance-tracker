export interface NewEntry {
	ammount: number;
	date: Date;
	entry: string;
	category: string;
	user_id: string;
}

export interface Expense {
	ammount: number;
	created_at: Date;
	date: string;
	entry: string;
	id: number;
	category: string;
}
