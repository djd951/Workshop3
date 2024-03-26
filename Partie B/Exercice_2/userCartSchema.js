const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: { type: Map, of: Number, default: {} }
});

module.exports = mongoose.model('UserCart', userCartSchema);
