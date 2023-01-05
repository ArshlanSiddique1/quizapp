
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const { sendCustomError } = require('../helper/response');
const bcrypt = require('bcryptjs');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Name must not exceed {ARGS[1]} characters.'
    })
];

const emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 60],
        message: 'Email must not exceed {ARGS[1]} characters.'
    }),
    validate({
        validator: 'isEmail',
        message: 'Email must be valid.'
    })
];



const UserSchema = new mongoose.Schema({
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
    accessToken: {
        type: String,
        trim: true,
        default: null
    },

    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true,
        default: 'USER'
    },


}, { timestamps: true, strict: true })


UserSchema.methods.isValidPassword = async function (res, password) {
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
}

module.exports = { Users: db.model('user', UserSchema), ObjectId };
