<script lang="ts">
	import AddExpense from '$lib/components/AddExpense.svelte';
	import type { PageData } from '../expenses/$types';
	import { username, expenses } from '$lib/store';

	export let data: PageData;

	console.log($username);

	console.log(data);
</script>

<div class="home">
	<h1>Welcome {$username} to your new expenses tracker</h1>
	<AddExpense {data} />
</div>

<style>
	.home {
		width: 90vw;
		text-align: center;
	}
</style>
