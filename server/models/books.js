/*Mitkumar Malavia, 301214375, comp-229-F2021-301214375*/
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
}, {
    collection: "books"
});

module.exports = mongoose.model('Book', Book);