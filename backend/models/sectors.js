const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const bcrypt = require('bcryptjs');
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);
    const nameValidator = [
        validate({
            validator: 'isLength',
            arguments: [0, 40],
            message: 'Name must not exceed {ARGS[1]} characters.'
        })
    ];


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
    image: {
        type: String
    },
    shortDescription: {
        type: String,
        trim: true,
        required: false,
    },
    description: {
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
