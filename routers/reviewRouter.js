const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/authmiddleware');
const {getReviewById, getReviewsByBookISBN, postReview, deleteReview, updateReview} = require('../controllers/reviewController');

router.get('/:id', getReviewById)
router.get('/bookISBN/:isbn', getReviewsByBookISBN)
router.delete('/delete/:id', checkUser ,deleteReview)
router.post('/add', checkUser , postReview)
router.patch('/update/:id', checkUser , updateReview)

module.exports = router;