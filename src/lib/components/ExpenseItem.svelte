<script lang="ts">
	import type { Category, Expense } from '$lib/types';
	import { expenses, sumAmmounts } from '$lib/store';
	// import { supabase } from '$lib/supabaseClient';
	import { categoryTypes } from '$lib/categories';
	import { enhance } from '$app/forms';
	import { swipe } from 'svelte-gestures';

	let direction;

	function handler(event) {
		// const rows = document.querySelectorAll('.row');
		console.log(event.detail.direction);
		direction = event.detail.direction;

		event.target.classList.toggle('show_delete');
	}

	function deleteExpense(id) {
		$expenses = $expenses.filter((expense) => expense._id !== id);

		$sumAmmounts = $expenses.reduce((acc, expense) => {
			acc += expense.ammount;
			return acc;
		}, 0);
	}

	export let info: Expense;
</script>

<div class="item">
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
		form {
			position: absolute;
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: end;
			z-index: 0;
			inset: 0;
			.btn-delete {
				background-color: transparent;
				background-color: red;
				border: none;
				font-size: 1.5rem;
				color: white;
				cursor: pointer;
				width: 50px;
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
		z-index: 1;
		transition: transform 0.3s ease-in-out;
	}

	.show_delete {
		transform: translateX(-50px);
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
