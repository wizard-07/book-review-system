require('dotenv').config()
const express = require('express');
const bookRouter = require('./routers/bookRouter.js');
const userRouter = require('./routers/userRouter.js');
const reviewRouter = require('./routers/reviewRouter.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {connectDB} = require('./db/connect.js')

// CREATE SERVER
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT TO MONGODB
connectDB();

// ROUTERS
app.use('/books', bookRouter)
app.use('/user', userRouter)
app.use('/review', reviewRouter)


// LISTEN TO PORT
app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})