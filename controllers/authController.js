const cookieParse = require('cookie-parser');
const jwt = require('jsonwebtoken');
const expireTime = 24*60*60;
const User = require('../models/user');
const bcrypt = require('bcrypt')

const createToken = function(user){
    return jwt.sign({...user}, process.env.JWT_SECRET, {expiresIn: expireTime})
}

exports.userLogin = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user)
    {
        const check = await bcrypt.compare(password, user.password)
        if(check) {
            const token = createToken(user);
            res.cookie('jwt', token, {maxAge: expireTime*1000});
            res.status(200).json(user);
        }
        else 
        {
            res.status(400).json({message: "User or password invalid"});
        }
    }
    else
    {
        res.status(400).json({message: "User or password invalid"});
    }
}

exports.userSignup = async (req, res) => {
    try{
        const obj = req.body;
        const user = await User.create(obj);
        if(user) 
        {
            const token = createToken(user);
            res.cookie('jwt', token, {maxAge: expireTime*1000});
            res.status(201).json(user);
        }
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

}
exports.userLogout = (req, res) =>{
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('localhost:5000/')
}