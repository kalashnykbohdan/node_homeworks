const { isSchema } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
});

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;