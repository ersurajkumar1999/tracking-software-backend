const mongoose = require('mongoose');
const { CATEGORY_TYPE } = require('../helper/Constants');

const categorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: CATEGORY_TYPE,
        default: CATEGORY_TYPE[0]
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
