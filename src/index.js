const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("./models/user");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

const app = express();
require("./db/mongoose");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

// app.use(async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer', '');
//     const decoded  = jwt.verify(token, "thisisanewproject");

//     const user = await User.findOne({
//       _id: decoded._id,
//       'tokens.token': token,
      
//     });
    
//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: "please authenticate" });
   

//     }
//     // const id = req.params._id
//     // res.locals.loggedInUser = await User.findById(id);
//     // next();
//   }
// );

app.use(async (req, res, next) => {
    if (req.headers["Authorization"]) {
     const accessToken = req.headers["Authorization"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     }
     res.locals.loggedInUser = await User.findById(userId); next();
    } else {
     next();
    }
   });

const req = require("express/lib/request");

const port = process.env.PORT || 4000;
app.get("/", function (req, res) {
  res.send("hello there");
});

app.use(express.json());
app.use(userRouter);
app.use(adminRouter);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
module.exports = app;
