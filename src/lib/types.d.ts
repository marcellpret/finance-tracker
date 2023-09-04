export interface NewEntry {
	ammount: number;
	date: Date;
	entry: string;
	category: string;
	user_id: string;
}

interface userDataType extends PageData {
	tableData: Expense[];
}
export interface Expense {
	ammount: number;
	created_at: Date;
	date: string;
	entry: string;
	_id: number;
	category: string;
	user_id: string;
}
export interface Category {
	[key: string]: any;
	restaurant: string;
	groceries: string;
	eletronics: string;
	clothing: string;
	gifts: string;
	sport: string;
	beauty: string;
	health: string;
	education: string;
	transport: string;
	other: string;
}
