const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
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
        type: String,
        enum: ['TRUE', 'FALSE'],
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { timestamps: true });


module.exports = { Grades: db.model('grade', gradeSchema), ObjectId }