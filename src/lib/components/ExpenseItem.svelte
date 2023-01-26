<script>
	export let info;
	export let category;
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
</style>
