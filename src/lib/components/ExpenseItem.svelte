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
	<div class="cell">{info?.date}</div>
	<div class="cell lighter-color">
		{category[info?.category] ? category[info?.category] : info?.category}
	</div>
</div>

<style>
	.row {
		display: grid;
		gap: 10px;
		grid-template-columns: 1fr 100px 150px min-content;
		border-bottom: 1px solid var(--custom-bg-color);
	}

	.cell {
		padding: 0.5rem;
	}

	.right-aligned {
		text-align: right;
	}
</style>
