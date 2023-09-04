
const express = require("express");
const app = express() ;
const PORT = 5500 ;
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/connectDB");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

require('dotenv').config();


// connecting to mongoDB
connectDB();

//The Access-Control-Allow-Credentials header is used to tell the browsers to expose the response to front-end JavaScript code when the request’s credentials mode Request.credentials is “include”.

app.use(credentials);

// External MiddleWare 
app.use(cookieParser()); 
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// movies api

app.use('/movies', require('./routes/api/movies') );


// Signing up new user

app.use("/sign-up", require("./routes/signUp") ); 


// Authenticate and logging in a registerd user

app.use('/login', require('./routes/login') );


// logout the user

app.use('/logout', require('./routes/logout') );


// request for new access Token with refresh token 

app.use('/refresh', require('./routes/refresh') );





app.get('/', (req, res) => {

    res.send("Hello");

} );


app.all('*', (req, res) => {

    res.send("404")

} )


mongoose.connection.once('open', () => {

  console.log("Connected to mongoDB");

  app.listen(PORT, () => {

    console.log(`Server is running at port ${PORT}`)

} );

} );


