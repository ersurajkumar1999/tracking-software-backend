const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    type: {
        type: String,
        enum: ['current', 'permanent'],
        required: true
    },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
