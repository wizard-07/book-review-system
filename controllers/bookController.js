const Book = require('../models/book');

// GET CONTROLLERS
exports.getAllBooks = async (req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}


exports.getBookById = async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        if(book)
        {
            res.json(book);
        }
        else 
        {
            res.status(404).json({message: "No Such book Found"});
        }
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

exports.getBookByISBN = async (req, res) => {
    try{
        const isbn = req.params.isbn;
        const book = await Book.find({isbn: isbn});
        if(book)
        {
            res.json(book);
        }
        else 
        {
            res.status(404).json({message: "No Such book Found"});
        }
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}


exports.getBookByAuthor = async (req, res) => {
    try{
        const {q} = req.query;
        // res.send('adsf');
        const book = await Book.find({author: q});
        if(book)
        {
            res.json(book);
        }
        else 
        {
            res.status(404).json({message: "No Such book Found"});
        }
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

exports.getBookByTitle = async (req, res) => {
    try{
        const {q} = req.query;
        // res.send('adsf');
        const book = await Book.find({title: q});
        if(book)
        {
            res.json(book);
        }
        else 
        {
            res.status(404).json({message: "No Such book Found"});
        }
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

// POST CONTROLLERs
exports.insertBook = async (req, res) =>{
    try{
        const obj = req.body;
        const resp = Book.create(obj);
        if(resp) res.json(resp);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

// PATCH CONTROLLERs
exports.updateBook = async (req, res) =>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const resp =  await Book.findByIdAndUpdate(id, updatedData, {new: true});
        if(resp)
        {
            res.status(201).json(resp);
        }
        else 
        {
            res.status(404).json({message: "Book not found"});
        }
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
}

// DELETE CONTROLLERS
exports.deleteBookById = async (req, res) =>{
    try{
        const id = req.params.id;
        const resp = await Book.findByIdAndDelete(id);
        if(resp) res.json(resp);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

exports.deleteBookByISBN = async (req, res) =>{
    try{
        const {isbn} = req.body;
        const resp = await Book.deleteMany({isbn: Number(isbn)});
        if(resp) res.json(resp);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

//exports is a reference to module.exports