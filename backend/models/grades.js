const mongoose = require('mongoose');
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Grade name is required.'],
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    image: {
        type: String
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

const grades = new mongoose.model('Grade', gradeSchema)
module.exports = grades;