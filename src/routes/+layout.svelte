<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import './global.css';

	onMount(() => {});
</script>

<div class="container">
	<Nav />
	<slot />
</div>
