const express = require('express');
const dotenv = require('dotenv');
const cors =require('cors');
const bodyparser =require('body-parser');
const DbConnection = require('./dbconnect/DbConnect')
dotenv.config();
const app = express();
const userRouter = require('./router/UserRoute');
const passport = require("passport");
const session = require("express-session");
// require("./controller/configPassport");


app.use(express.json());
app.use(cors());
app.use(bodyparser.json({extended: true}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(
    session({
      secret: "yourSecretKey",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // Initialize passport and session
  app.use(passport.initialize());
  app.use(passport.session());
app.use('/',userRouter);

DbConnection();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));