import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
	created_by: { type: Schema.Types.ObjectId, ref: 'User' },
	is_shared: { type: Boolean, default: false },
	shared_with: { type: [Schema.Types.ObjectId], ref: 'User' },
	expenses: { type: [Schema.Types.ObjectId], ref: 'Expense' }
});

const List = mongoose.models.List || mongoose.model('List', listSchema);

export default List;
