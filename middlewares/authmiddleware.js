const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedMessage) => {
            if(!err) {
                console.log("Went Through")
                next()
            }
            else res.send('not permitted')
        })
    }
    catch(e)
    {
        res.send('not permitted')
    }
}

const checkAdmin = (req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedMessage) => {
            console.log(decodedMessage);
            if(!err && decodedMessage._doc.role == 'admin') {
                console.log("Went Through")
                next()
            }
            else res.send('not permitted')
        })
    }
    catch(e)
    {
        res.send('not permitted')
    }
}


const checkUser = (req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        const id = req.body.userId;
        if(!id) res.send("Need your userId to authorize you.")
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedMessage) => {
            console.log(decodedMessage);
            if(!err && decodedMessage._doc._id == id) {
                console.log("Went Through")
                next()
            }
            else res.status(400).send('not permitted')
        })
    }
    catch(e)
    {
        res.status(500).json({message: e.message})
    }
}


module.exports = {checkAuth, checkAdmin, checkUser};


