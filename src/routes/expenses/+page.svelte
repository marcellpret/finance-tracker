<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	let expenses:
		| {
				ammount: number;
				created_at: Date;
				date: string;
				entry: string;
				id: number;
				category: string;
		  }[]
		| null = [];

	let entry: String;
	let ammount: Number;
	let date: Date;

	const categoryIcons: {} = {
		restaurant: '🍲',
		groceries: '🛒',
		tech: '🖥️',
		clothing: '👔',
		gifts: '🎁'
	};

	onMount(async () => {
		let { data, error } = await supabase.from('expenses').select('*');
		if (error) console.log('Error in Get Expenses: ', error);
		expenses = data;
	});

	async function addExpense() {
		const { data, error } = await supabase
			.from('expenses')
			.insert([{ ammount, date, entry }])
			.select('*');

		if (error) console.log('Error in addExpense: ', error);
		expenses = [...expenses, data && data[0]];
	}
</script>

<div class="table">
	{#each expenses as expense}
		<div class="row">
			<div class="cell">{expense.entry}</div>
			<div class="cell right-aligned">{expense.ammount} $</div>
			<div class="cell">{expense.date}</div>
			<div class="cell lighter-color">
				{categoryIcons[expense.category] ? categoryIcons[expense.category] : expense.category}
			</div>
		</div>
	{:else}
		<h3>No Expenses</h3>
	{/each}
</div>

<form on:submit|preventDefault={addExpense}>
	<div class="add-new">
		<div>
			<label for="entry">Where?</label>
			<input id="entry" type="text" bind:value={entry} />
		</div>
		<div>
			<label for="ammount">How much?</label>
			<input id="ammount" type="text" bind:value={ammount} />
		</div>
		<div>
			<label for="date">When?</label>
			<input id="date" type="date" bind:value={date} />
		</div>
	</div>

	<div>
		<input type="submit" class="button block primary" value="Add" />
	</div>
</form>

<style>
	.table {
		display: flex;
		gap: 10px;
		flex-direction: column;
	}
	.row {
		display: grid;
		gap: 10px;
		grid-template-columns: 1fr 100px 150px min-content;
	}

	.cell {
		background-color: slategray;
		padding: 1em;
		border-radius: 3px;
	}

	.right-aligned {
		text-align: right;
	}

	.lighter-color {
		background-color: gainsboro;
	}

	.add-new {
		display: flex;
		gap: 10px;
		margin-block: 2em;
	}
</style>
