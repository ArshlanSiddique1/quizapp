const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);
const sectionSchema = new mongoose.Schema({
    sector_id: {
        type: String,
        required: false
    },
    category_id: {
        type: String,
        required: false
    },
    grade_id: {
        type: String,
        required: false
    },
    subject_id: {
        type: String,
        required: false
    },
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
    }
}, { timestamps: true });
module.exports = {Sections: db.model('section', sectionSchema), ObjectId };
