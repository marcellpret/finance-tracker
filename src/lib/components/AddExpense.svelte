<script lang="ts">
	import { expenses } from '$lib/store';
	import { supabase } from '$lib/supabaseClient';
	import type { NewEntry } from '$lib/types';

	export let data;

	let newEntry: NewEntry = {
		ammount: null!,
		date: null!,
		entry: null!,
		category: null!,
		user_id: data.session?.user.id!
	};

	const categoryIcons: {} = {
		restaurant: '🍲',
		groceries: '🛒',
		tech: '🖥️',
		clothing: '👔',
		gifts: '🎁'
	};

	async function addExpense() {
		const { data, error } = await supabase.from('expenses').insert([newEntry]).select('*');

		if (error) console.log('Error in addExpense: ', error);
		$expenses = [...$expenses!, data![0]];
		newEntry = { ...newEntry, ammount: null!, entry: '', category: '' };
	}
</script>

<form on:submit|preventDefault={addExpense}>
	<div class="add-new">
		<label for="entry">Where?</label>
		<input id="entry" type="text" bind:value={newEntry.entry} />

		<label for="ammount">How much?</label>
		<input id="ammount" type="number" step="0.01" bind:value={newEntry.ammount} />

		<label for="date">When?</label>
		<input id="date" type="date" bind:value={newEntry.date} />

		<label for="category">Category</label>
		<input list="category-choices" id="category" name="category" bind:value={newEntry.category} />

		<datalist id="category-choices">
			{#each Object.keys(categoryIcons) as category}
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
