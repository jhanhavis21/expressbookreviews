const express = require('express');
const books = require('../booksdb.js');

const public_users = express.Router();

let users = [];

public_users.post("/register", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({ message: "Unable to register user." });
    }

    let userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(404).json({ message: "User already exists!" });
    }

    users.push({
        username,
        password
    });

    return res.status(200).json({ message: "User successfully registered." });
});

const isValid = (username) => {
    let userswithsameusername = users.filter((user) => {
        return user.username === username;
    });

    return userswithsameusername.length > 0;
}

const authenticatedUser = (username, password) => {

    let validusers = users.filter((user) => {
        return user.username === username && user.password === password;
    });

    return validusers.length > 0;
}

public_users.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {

        let accessToken = require("jsonwebtoken").sign(
            {
                data: password
            },
            "access",
            { expiresIn: 60 * 60 }
        );

        req.session.authorization = {
            accessToken,
            username
        };

        return res.status(200).json({
            message: "User successfully logged in"
        });
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});


// Task 1
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});


// Task 2
public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.status(200).json(books[isbn]);
});


// Task 3
public_users.get('/author/:author', function (req, res) {

    const author = req.params.author;

    let filteredBooks = Object.keys(books).filter((key) =>
        books[key].author === author
    );

    let result = {};

    filteredBooks.forEach(key => {
        result[key] = books[key];
    });

    return res.status(200).json(result);
});


// Task 4
public_users.get('/title/:title', function (req, res) {

    const title = req.params.title;

    let filteredBooks = Object.keys(books).filter((key) =>
        books[key].title === title
    );

    let result = {};

    filteredBooks.forEach(key => {
        result[key] = books[key];
    });

    return res.status(200).json(result);
});


// Task 5
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
module.exports.isValid = isValid;
module.exports.users = users;