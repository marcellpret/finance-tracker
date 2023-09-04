<script lang="ts">
	import ExpenseItem from '$lib/components/ExpenseItem.svelte';
	import type { PageData } from '../home/$types';
	import { expenses, sumAmmounts } from '$lib/store';
	import AddExpense from '$lib/components/AddExpense.svelte';
	import type { Expense, userDataType } from '$lib/types';

	export let data: userDataType;

	$expenses = data.tableData;
	console.log(data);

	$sumAmmounts = $expenses.reduce((acc, expense) => {
		acc += expense.ammount;
		return acc;
	}, 0);
</script>

<div class="table">
	<section class="expenses-list">
		{#each $expenses as expense}
			<ExpenseItem info={expense} />
		{:else}
			<h3>No Expenses</h3>
		{/each}
		<p>Total: {$sumAmmounts.toFixed(2)} $</p>
	</section>
	<div class="add-expense"><AddExpense {data} /></div>
</div>

<style>
	.table {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}

	.add-expense,
	.expenses-list {
		padding: 2rem;
		width: 100%;
		max-width: 600px;
		/* margin: auto; */
	}

	.add-expense {
	}

	p {
		text-align: center;
	}
</style>
