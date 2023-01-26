// import type { PageLoad } from './$types';
// import { supabase } from '$lib/supabaseClient';

// export const load = (async () => {
// 	const { data, error } = await supabase.from('expenses').select('*');

// 	if (error) console.log('Error in Get Expenses: ', error);
// 	return { data };
// }) satisfies PageLoad;

import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: tableData } = await supabaseClient
		.from('expenses')
		.select('*')
		.eq('user_id', session.user.id);

	return {
		tableData
	};
};
