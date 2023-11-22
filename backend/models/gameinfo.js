import mongoose from 'mongoose';

const gameInfoSchema = new mongoose.Schema({
  gaame: String,
  description: String,
  length: String,
  rating: String,
  piblisher: String,
  genre: String
});

const GameInfo = mongoose.model('Game', gameInfoSchema);

export default GameInfo;