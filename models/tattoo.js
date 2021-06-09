const mongoose = require('mongoose');

const tattooSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        img: {type: String, required: true},
        price: {type: Number, required: true},
        qty: {type: Number, required: true},     
}, {timestamps: true});

const Tattoo = mongoose.model('Tattoo', tattooSchema);

module.exports = Tattoo;