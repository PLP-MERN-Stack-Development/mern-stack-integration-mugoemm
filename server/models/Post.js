const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String },
    comments: [{ body: String, date: { type: Date, default: Date.now }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
