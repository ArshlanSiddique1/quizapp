const { string, number } = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        Unique: [true, 'Email has already registered.'],
        trim: true,
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required.'],
        minlength: [6, "Password must have at least six(6) character"]
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: [true, 'mobileNumber is required.']
    },
    role: {
        type: Number,
        default: 0
    }

}, { timestamps: true });


const Users = new mongoose.model('User', userSchema)
module.exports = { Users, ObjectId };