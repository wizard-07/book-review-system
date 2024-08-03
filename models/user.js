const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const {Schema} = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: [true, 'Username already taken'],
        required: true, 
        trim : true,
        
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum length must be 6 characters'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: true, 
        trim : true,
        validator: [isEmail, 'Enter a valid Email']
    },
    role:{
        type: String,
        enum : ['admin', 'user'],
        default: 'user'
    },
    reviews:[
        {
            reviewId: {
                type: Schema.Types.ObjectId,
                ref:'review',
                required : true
            }
        }
    ]
}, {timestamps: true});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


module.exports = mongoose.model('user', userSchema);
