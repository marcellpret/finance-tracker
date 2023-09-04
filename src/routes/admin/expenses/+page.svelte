<script lang="ts">
	import ExpenseItem from '$lib/components/ExpenseItem.svelte';
	import { expenses, sumAmmounts } from '$lib/store';
	import AddExpense from '$lib/components/AddExpense.svelte';
	import type { Expense, userDataType } from '$lib/types';

	export let data;

	$expenses = data.data[0].expenses;

	$sumAmmounts = $expenses.reduce((acc, expense) => {
		acc += expense.ammount;
		return acc;
	}, 0);
</script>

<div class="table">
	<div class="add-expense"><AddExpense {data} /></div>
	<section class="expenses-list">
		<h1>Expenses</h1>
		{#each $expenses as expense}
			<ExpenseItem info={expense} />
		{:else}
			<h3>No Expenses</h3>
		{/each}
		<p>Total: {$sumAmmounts.toFixed(2)} $</p>
	</section>
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

	p {
		text-align: center;
	}
</style>
