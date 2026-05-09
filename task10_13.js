const axios = require('axios');


// Task 10
async function getAllBooks() {

    const response = await axios.get('http://localhost:5000/');

    console.log("All Books:");
    console.log(response.data);
}

getAllBooks();


// Task 11
axios.get('http://localhost:5000/isbn/1')
.then(response => {

    console.log("Book by ISBN:");
    console.log(response.data);

})
.catch(error => {
    console.log(error);
});


// Task 12
async function getBooksByAuthor() {

    const response = await axios.get(
        'http://localhost:5000/author/Chinua Achebe'
    );

    console.log("Books by Author:");
    console.log(response.data);
}

getBooksByAuthor();


// Task 13
async function getBooksByTitle() {

    const response = await axios.get(
        'http://localhost:5000/title/Things Fall Apart'
    );

    console.log("Books by Title:");
    console.log(response.data);
}

getBooksByTitle();