




const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const { sendCustomError } = require('../helper/response');
const bcrypt = require('bcryptjs');
// const nameValidator = [
//     validate({
//         validator: 'isLength',
//         arguments: [0, 40],
//         message: 'Name must not exceed {ARGS[1]} characters.'
//     })
// ];

// const emailValidator = [
//     validate({
//         validator: 'isLength',
//         arguments: [0, 60],
//         message: 'Email must not exceed {ARGS[1]} characters.'
//     }),
//     validate({
//         validator: 'isEmail',
//         message: 'Email must be valid.'
//     })
// ];



const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Sector title is required.'],
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    // image: {
    //     type: String
    // },
    // description: {
    //     type: String,
    //     trim: true,
    //     required: false,
    // },
    shortDescription: {
        type: String,
        trim: true,
        required: false
    },
    metaTitle: {
        type: String,
        required: false,
        trim: true
    },
    metaDescription: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { timestamps: true });



module.exports = { Sectors: db.model('sector', UserSchema), ObjectId };
