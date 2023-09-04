<script lang="ts">
	import { username } from '$lib/store';
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient';

	import Avatar from './Avatar.svelte';

	export let session: AuthSession;

	let loading = false;
	// let username: string | null = null;
	let website: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				$username = data.username;
				website = data.website;
				avatarUrl = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	async function updateProfile() {
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date()
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="account">
	<form use:getProfile on:submit|preventDefault={updateProfile}>
		<Avatar bind:url={avatarUrl} size={10} on:upload={updateProfile} />

		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>
		<div>
			<label for="username">Name</label>
			<input id="username" type="text" bind:value={$username} />
		</div>
		<div>
			<label for="website">Website</label>
			<input id="website" type="website" bind:value={website} />
		</div>

		<div>
			<input
				type="submit"
				class="button"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>

		<div>
			<button class="button" on:click={signOut} disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>

<style>
	.account {
		min-height: 100vh;
		min-width: 100vw;
		display: grid;
		place-items: center;
	}

	form {
		width: 80%;
	}

	form > * {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		background-color: black;
		border: 1px solid gray;
		padding: 0.3rem 0.9rem;
		border-radius: 3px;
		text-align: center;
		width: 80%;
	}

	label {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
