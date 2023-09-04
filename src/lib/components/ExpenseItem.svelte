<script lang="ts">
	import type { Category, Expense } from '$lib/types';
	import { expenses, sumAmmounts } from '$lib/store';
	import { supabase } from '$lib/supabaseClient';
	import { categoryTypes } from '$lib/categories';

	const deleteExpense = async (id: number) => {
		console.log('Deleting expense with id: ', id);

		const { data, error } = await supabase.from('expenses').delete().eq('_id', id).select();

		console.log(data);

		if (error) console.log('Error in deleteExpense: ', error);

		$expenses = $expenses!.filter((expense) => expense._id !== id);

		$sumAmmounts = $expenses.reduce((acc, expense) => {
			acc += expense.ammount;
			return acc;
		}, 0);
	};

	export let info: Expense;
	console.log(info);
</script>

<div class="row">
	<button
		class="cell btn-delete"
		aria-roledescription="Button to delete an expense"
		on:click={deleteExpense(info._id)}
	>
		x
	</button>
	<div class="cell">{info?.entry}</div>
	<div class="cell right-aligned">{info?.ammount.toFixed(2)} $</div>
	<div class="cell center-aligned">{info?.date}</div>
	<div class="cell lighter-color">
		{categoryTypes[info?.category] ? categoryTypes[info?.category] : info?.category}
	</div>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: min-content 1fr max-content max-content min-content;
		gap: 10px;
		border-bottom: 1px dotted gray;
		align-items: center;
		padding: 0 10px;
	}

	.cell {
		padding: 0.5rem;
		/* background-color: #ccc; */
	}

	.btn-delete {
		background-color: transparent;
		border: none;
		font-size: 1.5rem;
		color: #ff0000;
		cursor: pointer;
	}

	.right-aligned {
		text-align: right;
	}
	.center-aligned {
		text-align: center;
	}
</style>
