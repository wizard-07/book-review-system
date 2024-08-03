const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    bookISBN: {
        type: Number,
        ref: 'book',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    review: {
        type: String,
        required: true,
        trim : true
    }
}, {timestamps: true});

module.exports = mongoose.model('review', reviewSchema);
