<script lang="ts">
	import { expenses, sumAmmounts } from '$lib/store';
	import type { NewEntry } from '$lib/types';
	import { enhance } from '$app/forms';
	import { categoryTypes } from '$lib/categories';

	export let data;

	let date = new Date().toISOString().slice(0, 10);

	let newEntry: NewEntry = {
		ammount: null!,
		date: null!,
		entry: null!,
		category: null!,
		user_id: data.session?.user.id!
	};

	function addExpense(expense) {
		$expenses = [...$expenses!, expense];

		$sumAmmounts = $expenses.reduce((acc, expense) => {
			acc += expense.ammount;
			return acc;
		}, 0);
	}
</script>

<form
	method="POST"
	action="?/create"
	use:enhance={({ formElement, formData, action }) => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				addExpense(result.data.newExpense);
			}
			update();
		};
	}}
>
	<div class="add-new">
		<label for="entry">Where?</label>
		<input id="entry" type="text" bind:value={newEntry.entry} name="entry" />

		<label for="ammount">How much?</label>
		<input id="ammount" type="number" step="0.01" name="ammount" />

		<label for="date">When?</label>
		<input id="date" type="date" name="date" value="2019-05-05" />

		<label for="category">Category</label>
		<input list="category-choices" id="category" name="category" />

		<datalist id="category-choices">
			{#each Object.keys(categoryTypes) as category}
				<option value={category} />
			{/each}
		</datalist>
	</div>

	<div>
		<input type="submit" class="button block primary" value="Add" />
	</div>
</form>

<style>
	.add-new {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.add-new label {
		display: block;
		font-size: 1.2rem;
	}

	.add-new input {
		padding: 0.5em;
		border-radius: 3px;
		border: 1px solid gainsboro;
		font-size: 1.5rem;
	}

	.add-new input:focus {
		outline: none;
		border-color: slategray;
	}

	input[type='submit'] {
		font-size: 1.5rem;
		padding: 0.5em 1em;
		border-radius: 3px;
		border: 1px solid gainsboro;
		background-color: slategray;
		color: white;
		margin-top: 1rem;
	}
</style>
