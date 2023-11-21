// models/Item.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  date: Date,
  reset: Boolean,
  saves: [[String]],
});

const User = mongoose.model('User', userSchema);

export default User;