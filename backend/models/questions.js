const mongoose = require('mongoose');
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const questionSchema = new mongoose.Schema({
    sector_id: {
        type: String,
    },
    category_id: {
        type: String,
    },
    grade_id: {
        type: String,
    },
    subject_id: {
        type: String,
    },
    section_id: {
        type: String,
    },
    title: {
        type: String,
        required: [true, 'Question is required.'],
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    explanation: {
        type: String,
    },
    year: {
        type: String,
    },
    options: [
        {
            title: {
                type: String,
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        },
    ],
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { timestamps: true });

const questions = new mongoose.model('Question', questionSchema)
module.exports = questions;