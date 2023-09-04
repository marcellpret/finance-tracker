<script lang="ts">
	import type { Category, Expense } from '$lib/types';
	import { expenses, sumAmmounts } from '$lib/store';
	// import { supabase } from '$lib/supabaseClient';
	import { categoryTypes } from '$lib/categories';
	import { enhance } from '$app/forms';

	// const deleteExpense = async (id: number) => {
	// 	console.log('Deleting expense with id: ', id);

	// 	const { data, error } = await supabase.from('expenses').delete().eq('_id', id).select();

	// 	console.log(data);

	// 	if (error) console.log('Error in deleteExpense: ', error);

	// 	$expenses = $expenses!.filter((expense) => expense._id !== id);

	// 	$sumAmmounts = $expenses.reduce((acc, expense) => {
	// 		acc += expense.ammount;
	// 		return acc;
	// 	}, 0);
	// };
	function deleteExpense(id) {
		$expenses = $expenses.filter((expense) => expense._id !== id);

		$sumAmmounts = $expenses.reduce((acc, expense) => {
			acc += expense.ammount;
			return acc;
		}, 0);
	}

	export let info: Expense;
</script>

<div class="row">
	<form
		action="?/delete"
		use:enhance={({ formElement, formData, action }) => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					deleteExpense(info._id);
				}
				update();
			};
		}}
		method="POST"
	>
		<button class="cell btn-delete" aria-roledescription="Button to delete an expense" type="submit"
			>x</button
		>
		<input type="hidden" name="expense-id" value={info._id} />
	</form>

	<div class="cell">{info?.entry}</div>
	<div class="cell right-aligned">{info?.ammount.toFixed(2)} $</div>
	<div class="cell center-aligned">{new Date(info?.date).toLocaleDateString()}</div>
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
