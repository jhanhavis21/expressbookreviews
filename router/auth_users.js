const express = require('express');
const jwt = require('jsonwebtoken');

const books = require("../booksdb.js");

const regd_users = express.Router();


// Task 8
regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;

    const review = req.query.review;

    const username = req.session.authorization.username;

    books[isbn].reviews[username] = review;

    return res.status(200).json({
        message: "Review added/modified successfully"
    });
});


// Task 9
regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;

    const username = req.session.authorization.username;

    delete books[isbn].reviews[username];

    return res.status(200).json({
        message: "Review deleted successfully"
    });
});

module.exports.authenticated = regd_users;