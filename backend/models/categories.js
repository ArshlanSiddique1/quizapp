const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);;

const categorySchema = new mongoose.Schema({
    sector_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Category title is required.'],
    }, 
    image: {
        type: String
    },
    slug: {
        type: String,
        slug: "title",
        unique: true

    },
    description: {
        type: String,
        trim: true,
        required: false,
    },
    shortDescription: {
        type: String,
        required: false,
        trim: true
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
    },
    featured: {
        type: String,
        enum: ['TRUE', 'FALSE'],
        default: 'TRUE'
    },
    subscription: {
        type: String,
        // enum: ['PREMIUM', 'FREE'],
        default: 'FREE'
    }
}, { timestamps: true });



module.exports = { Categorys: db.model('category', categorySchema), ObjectId };











