/*Mitkumar Malavia, 301214375, comp-229-F2021-301214375*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find((err, books) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('books/index', {
                title: 'Books',
                books: books
            });
        }
    });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Add Data',
        books: { Title: '', Price: '', Author: '', Genre: '' }
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    let newBook = new book({
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre,
        Description: ''
    });
    console.log(newBook)
    book.create(newBook, (err, book) => {
        if (err) {
            return console.err(err);
        } else {
            res.redirect('/books')
        }
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    book.findById(id, (err, book) => {
        if (err) {
            console.log(err);
            res.render(err);
        } else {
            console.log(book)
            res.render('books/details', {
                title: 'Edit',
                books: book
            })
        }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let updateBook = book({
        "_id": id,
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Description": '',
    })
    console.log(updateBook)
    book.updateOne({ _id: id }, updateBook, (err) => {
        if (err) {
            console.log(err);
            res.render(err);
        } else {
            res.redirect('/books')
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.render(err);
        } else {
            res.redirect('/books')
        }
    })
});


module.exports = router;