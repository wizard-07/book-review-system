const express = require('express');
const router = express.Router();
const {checkAdmin} = require('../middlewares/authmiddleware.js');

const { getAllBooks, getBookById, getBookByISBN,getBookByAuthor, getBookByTitle , insertBook, deleteBookById, deleteBookByISBN, updateBook} = 
require('../controllers/bookController.js');


router.post('/add-book', insertBook);
router.get('/' , getAllBooks);
router.get('/isbn/:isbn', getBookByISBN);
router.get('/search/author', getBookByAuthor)
router.get('/search/title', getBookByTitle)
router.get('/:id', getBookById);
router.delete('/delete/:id', deleteBookById);
router.delete('/delete-book', deleteBookByISBN);
router.patch('/update/:id', updateBook);

module.exports = router;