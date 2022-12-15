const mongoose = require('mongoose');
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const sectionSchema = new mongoose.Schema({
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
    subject_id: {
        type: String,
        required: true
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

const sections = new mongoose.model('Section', sectionSchema)
module.exports = sections;