const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isbn: {
    type: Number,
    unique: true,
    default: 0
  },
  description: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
