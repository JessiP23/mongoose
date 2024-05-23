import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    }, //space, readability
    email: {
        type: String,
        required: true,
        //unique: true, //email is not already in the database
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 15
    },
    role: {
        type: String,
        enum: ['Admin', 'Regular', 'Premium'],
        default: 'Regular',
        message: "{VALUE} is not valid for role."
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    age: {
        min: 18,
        type: Number,
        
    }
});

export default new mongoose.model('User', userSchema);