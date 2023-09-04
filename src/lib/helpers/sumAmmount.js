import { $expenses, $sumAmmounts } from '../store';

$sumAmmounts = $expenses.reduce((acc, expense) => {
	acc += expense.ammount;
	return acc;
}, 0);
