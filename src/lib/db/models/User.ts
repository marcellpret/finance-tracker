import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
