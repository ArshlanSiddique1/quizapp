const mongoose = require('mongoose');
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const sectorsSchema = new mongoose.Schema({
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
    featured: {
        type: Boolean,
        enum: ['True', 'False'],
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { timestamps: true });

const sectors = new mongoose.model('Sector', sectorsSchema)
module.exports = sectors;