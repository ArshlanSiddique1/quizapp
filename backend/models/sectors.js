const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

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
