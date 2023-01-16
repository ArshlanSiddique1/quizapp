const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
slug = require('mongoose-slug-updater'),
    mongoose.plugin(slug);

const questionSchema = new mongoose.Schema({
    sector_id: {
        type: String,
        require: true
    },
    category_id: {
        type: String,
        require: true
    },
    grade_id: {
        type: String,
        require: true
    },
    subject_id: {
        type: String,
        require: true
    },
    section_id: {
        type: String,
        require: true
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
                type: String,
                default: false
            }
        },
    ],
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { timestamps: true });
module.exports = { Questions: db.model('question', questionSchema), ObjectId };
