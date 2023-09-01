<script lang="ts">
	import type { Category, Expense } from '$lib/types';

	export let info: Expense;

	const category: Category = {
		restaurant: '🍲',
		groceries: '🛒',
		tech: '🖥️',
		clothing: '👔',
		gifts: '🎁'
	};
</script>

<div class="row">
	<div class="cell">{info?.entry}</div>
	<div class="cell right-aligned">{info?.ammount} $</div>
	<div class="cell center-aligned">{info?.date}</div>
	<div class="cell lighter-color">
		{category[info?.category] ? category[info?.category] : info?.category}
	</div>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: repeat(3, 1fr) min-content;
		gap: 10px;
		border-bottom: 1px dotted gray;
		align-items: center;
		padding: 0 10px;
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
