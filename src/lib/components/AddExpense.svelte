<script lang="ts">
	import { expenses } from '$lib/store';
	import { supabase } from '$lib/supabaseClient';
	import type { NewEntry } from '$lib/types';

	export let data;

	let isAddingExpense: boolean = false;

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

	function toggle() {
		isAddingExpense = !isAddingExpense;
	}

	async function addExpense() {
		const { data, error } = await supabase.from('expenses').insert([newEntry]).select('*');

		if (error) console.log('Error in addExpense: ', error);
		$expenses = [...$expenses!, data![0]];
		newEntry = { ...newEntry, ammount: null!, entry: '', category: '' };
	}
</script>

{#if !isAddingExpense}
	<button on:click={toggle}> + Add Expense </button>
{:else}
	<form on:submit|preventDefault={addExpense}>
		<div class="add-new">
			<div>
				<label for="entry">Where?</label>
				<input id="entry" type="text" bind:value={newEntry.entry} />
			</div>
			<div>
				<label for="ammount">How much?</label>
				<input id="ammount" type="number" bind:value={newEntry.ammount} />
			</div>
			<div>
				<label for="date">When?</label>
				<input id="date" type="date" bind:value={newEntry.date} />
			</div>
			<div>
				<label for="category">Category</label>
				<input
					list="category-choices"
					id="category"
					name="category"
					bind:value={newEntry.category}
				/>

				<datalist id="category-choices">
					{#each Object.keys(categoryIcons) as category}
						<option value={category} />
					{/each}
				</datalist>
			</div>
		</div>

		<div>
			<input type="submit" class="button block primary" value="Add" />
			<button on:click|preventDefault={toggle}>Cancel</button>
		</div>
	</form>
{/if}
