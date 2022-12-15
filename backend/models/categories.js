const { string } = require("joi");
const mongoose = require("mongoose");
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    sector_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Category title is required.'],
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        required: false,
    },
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
    },
    featured: {
        type: Boolean,
        enum: ['True', 'False'],
    },
    subscription: {
        type: String,
        enum: ['PREMIUM', 'FREE'],
        default: 'FREE'
    }
}, { timestamps: true });


const Category = new mongoose.model('Category', categorySchema)
module.exports = Category;