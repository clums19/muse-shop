const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tattooSchema = new Schema(
    {
        name: String,
        description: String,
        img: String,
        price: Number,
        qty: Number
});

const Tattoo = mongoose.model('Tattoo', tattooSchema);

module.exports = Tattoo;