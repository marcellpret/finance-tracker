import mongoose from 'mongoose';
const { Schema } = mongoose;

const expenseSchema = new Schema({
	entry: { type: String, required: true },
	ammount: { type: Number, required: true },
	date: { type: Date, required: true },
	category: { type: String, required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	created_at: { type: Date, default: Date.now }
});

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;
