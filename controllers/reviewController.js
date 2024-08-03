const Review = require('../models/review');

// GET CONTROLLERS
exports.getReviewsByBookISBN = async (req, res) => {
    try{
        const isbn = req.params.isbn;
        const reviews = await Review.find({bookISBN: isbn});
        res.json(reviews);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}


exports.getReviewById = async (req, res) => {
    try{
        const id = req.params.id;
        const review = await Review.findById(id);
        if(review)
        {
            res.json(review);
        }
        else 
        {
            res.status(404).json({message: "No Such Review Found"});
        }
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

// POST CONTROLLERs
exports.postReview = async (req, res) =>{
    try{
        const obj = req.body;
        const resp = await Review.create(obj);
        if(resp) res.json(resp);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

// PATCH CONTROLLERs
exports.updateReview = async (req, res) =>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const resp =  await Review.findByIdAndUpdate(id, updatedData, {new: true});
        if(resp)
        {
            res.status(201).json(resp);
        }
        else 
        {
            res.status(404).json({message: "Review not found"});
        }
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
}

// DELETE CONTROLLERS
exports.deleteReview = async (req, res) =>{
    try{
        const id = req.params.id;
        // const review = await Review.findOne(id);
        const resp = await Review.findByIdAndDelete(id);
        if(resp) res.json(resp);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}
