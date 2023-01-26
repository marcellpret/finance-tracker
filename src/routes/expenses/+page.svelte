<script lang="ts">
	import ExpenseItem from '$lib/components/ExpenseItem.svelte';
	import type { PageData } from '../home/$types';
	import { expenses } from '$lib/store';
	import AddExpense from '$lib/components/AddExpense.svelte';

	export let data: PageData;

	$expenses = data.tableData;

	let totalExpenses: number = sumTotalExpenses();

	const categoryIcons: {} = {
		restaurant: '🍲',
		groceries: '🛒',
		tech: '🖥️',
		clothing: '👔',
		gifts: '🎁'
	};

	function sumTotalExpenses() {
		let total: number = 0;
		$expenses?.forEach((expense) => {
			total += expense.ammount;
		});
		return total;
	}
</script>

<div class="table">
	{#each $expenses as expense}
		<ExpenseItem info={expense} category={categoryIcons} />
	{:else}
		<h3>No Expenses</h3>
	{/each}
	Total: {totalExpenses} $
</div>

<AddExpense {data} />

<style>
	.table {
		display: flex;
		gap: 10px;
		flex-direction: column;
	}
</style>
