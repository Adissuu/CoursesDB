const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        index: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    body: {
        type: {},
        required: true,
        max: 2000000
    },
    excerpt: {
        type: String,
        max: 1000,
    },
    mtitle: {
        type: String,
    },
    mdesc: { type: {} },
    photo: {
        data: Buffer,
        contentType: String
    },
    categories: [{ type: ObjectId, ref: 'Category', required: true }],
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


module.exports = mongoose.model('Course', courseSchema);