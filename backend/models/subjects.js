const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const subjectSchema = new mongoose.Schema({
    sector_id: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    grade_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Subject title is required.'],
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
    featured: {
        type: String,
        enum: ['TRUE', 'FALSE'],
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { timestamps: true });


module.exports = { Subjects: db.model('subject', subjectSchema), ObjectId };