import type { Actions, Load } from '@sveltejs/kit';
// import { supabase } from '$lib/supabaseClient';
import List from '$lib/db/models/List';
import Expense from '$lib/db/models/Expense';
import dbConnect from '$lib/db/connect';
import type { ObjectId } from 'mongoose';
import type { NewEntry } from '$lib/types';
import { enhance } from '$app/forms';

let userId: ObjectId;
let listId: ObjectId;

export const load: Load = async () => {
	try {
		await dbConnect();
		const data = await List.find().populate('expenses');
		userId = data[0].created_by;
		listId = data[0]._id;
		return JSON.parse(JSON.stringify({ data }));
	} catch (error) {
		console.log(error);
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
		try {
			const formData = await request.formData();
			const data: NewEntry = Object.fromEntries(formData);
			data.user_id = userId;
			await dbConnect();
			const newExpense = await Expense.create(data);

			await List.findByIdAndUpdate(listId, {
				$push: {
					expenses: newExpense._id
				}
			});

			console.log(newExpense);

			// await dbDisconnect();

			// console.log('New todo added: ', newTodo);
			return {
				success: true,
				newExpense: JSON.parse(JSON.stringify(newExpense))
			};
		} catch (error) {
			console.log('ERROR in CREATE ACTION: ', error);
		}
	},
	// update: async ({ request }) => {
	// 	const formData = await request.formData();
	// 	const todoId = formData.get('todoId');
	// 	const todoName = formData.get('todoName');
	// 	await dbConnect();
	// 	await TodoModel.findByIdAndUpdate(todoId, {
	// 		title: todoName
	// 	}).lean();
	// 	await dbDisconnect();

	// 	console.log('Todo updated: ', todoId);

	// 	return {
	// 		success: true
	// 	};
	// },

	delete: async ({ request }) => {
		console.log('DELETE');
		// const formData = await request.formData();
		// const expenseId = formData.get('expense-id');
		// console.log(expenseId);
		// await dbConnect();
		// await Expense.findByIdAndDelete(expenseId);

		// console.log('Todo deleted: ', todoId);
		return {
			success: true,
			message: 'Delete successful'
		};
	},

	// create an edit action

	edit: async ({ request }) => {
		console.log('EDIT: ', await request.formData());
		// const formData = await request.formData();
		// const data = Object.fromEntries(formData);

		// await dbConnect();
		// const updatedEntry = await Expense.findByIdAndUpdate(data._id, data);

		return {
			success: true,
			message: 'Edit successful'
			// updatedEntry: JSON.parse(JSON.stringify(updatedEntry))
		};
	}
};

// export const load = async () => {
// 	await dbConnect();
// 	const data = await List.find();
// 	console.log(data);
// 	return { data };
// };

// 	const { data, error } = await supabase.from('expenses').select('*');

// 	if (error) console.log('Error in Get Expenses: ', error);
// 	return { data };
// }) satisfies PageLoad;

// import type { PageLoad } from './$types';

// export const load: PageLoad = async (event) => {
// 	// if (!session) {
// 	// 	throw redirect(303, '/');
// 	// }

// 	return {};
