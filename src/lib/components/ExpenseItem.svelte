<script lang="ts">
	import type { Category, Expense } from '$lib/types';
	import { expenses, sumAmmounts } from '$lib/store';
	// import { supabase } from '$lib/supabaseClient';
	import { categoryTypes } from '$lib/categories';
	import { enhance } from '$app/forms';
	import { swipe } from 'svelte-gestures';

	let direction: string;

	const isEditing = false;

	function handler(event: any) {
		// const rows = document.querySelectorAll('.row');
		console.log(event.detail.direction);
		direction = event.detail.direction;

		event.target.classList.toggle('show_delete');
	}

	function deleteExpense(id: string) {
		$expenses = $expenses.filter((expense) => expense._id !== id);

		$sumAmmounts = $expenses.reduce((acc, expense) => {
			acc += expense.ammount;
			return acc;
		}, 0);
	}

	function editExpense(id: string, changes: {}) {
		console.log(id, changes);
		// get the item from the $expenses array
		// find what properties changed and update them

		$expenses = $expenses.map((expense) => {
			// if (expense._id === id) {
			// 	return {
			// 		...expense,
			// 		...changes
			// 	};
			// }
			// return expense;
		});

		$sumAmmounts = $expenses.reduce((acc, expense) => {
			acc += expense.ammount;
			return acc;
		}, 0);
	}

	export let info: Expense;
</script>

<div class="item">
	<form
		class="options-form"
		action="?/delete"
		use:enhance={({ formElement, formData, action }) => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					console.log(result);
					// deleteExpense(info._id);
				}
				update();
			};
		}}
		method="POST"
	>
		<button
			class="cell btn-edit"
			on:click={() => !isEditing}
			aria-roledescription="Button to edit an expense">✏️</button
		>
		<button class="cell btn-delete" aria-roledescription="Button to delete an expense" type="submit"
			>x</button
		>
		<input type="hidden" name="expense-id" value={info._id} />
	</form>

	{#if isEditing}
		<form
			class="edit-form"
			action="?/edit"
			use:enhance={({ formElement, formData, action }) => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						console.log(result);
						// editExpense(info._id);
					}
					update();
				};
			}}
			method="POST"
		>
			<button class="cell" aria-roledescription="Submit to edit an expense" type="submit"
				>Confirm</button
			>
			<input type="hidden" name="expense-id" value={info._id} />
		</form>
	{/if}

	<div
		class="row"
		class:show_delete={direction}
		use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' }}
		on:swipe={handler}
	>
		<div class="cell">{info?.entry}</div>
		<div class="cell right-aligned">{info?.ammount.toFixed(2)} $</div>
		<div class="cell center-aligned">{new Date(info?.date).toLocaleDateString()}</div>
		<div class="cell lighter-color">
			{categoryTypes[info?.category] ? categoryTypes[info?.category] : info?.category}
		</div>
	</div>
</div>

<style lang="scss">
	.item {
		position: relative;
		border-bottom: 1px dotted gray;
		height: 50px;
		.options-form {
			position: absolute;
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: end;
			z-index: 0;
			inset: 0;
			.btn-delete {
				background-color: red;
				border: none;
				font-size: 1.5rem;
				color: white;
				cursor: pointer;
				width: 50px;
				height: 50px;
			}
			.btn-edit {
				background-color: yellow;
				border: none;
				font-size: 1.5rem;
				color: white;
				cursor: pointer;
				width: 50px;
				height: 50px;
			}
		}
	}

	.row {
		display: grid;
		grid-template-columns: 1fr max-content max-content min-content;
		gap: 10px;
		align-items: center;
		padding: 0 10px;
		background-color: white;
		position: absolute;
		inset: 0;
		transition: transform 0.3s ease-in-out;
	}

	.show_delete {
		transform: translateX(-100px);
	}

	.cell {
		padding: 0.5rem;
		/* background-color: #ccc; */
	}

	.right-aligned {
		text-align: right;
	}
	.center-aligned {
		text-align: center;
	}
</style>
