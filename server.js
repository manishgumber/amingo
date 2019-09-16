const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/User");
const Post = require("./models/Post");
const keys = require("./config/keys");
const passport = require('passport');

const db = keys.mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Db Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);


app.get("/", (req, res) =>
  res.json({
    msg: "Hello Manish Gumber!!"
  })
);

//AUTH ROUTES //////////////////////////////////////////////////////////

const authRoutes = require('./routes/Auth');
app.use('/auth', authRoutes);

/////////////////////////////////////////////////////////////////////////


//USERS ROUTES /////////////////////////////////////////////////////////
app.use('/users', passport.authenticate('jwt',{session:false}));

app.get('/users', (req, res) => {
  User.find()
      .then(users => res.json(users))
      .catch(err => console.log(err))
});

/////////////////////////////////////////////////////////////////////////


//POSTS ROUTES //////////////////////////////////////////////////////////
app.use('/posts', passport.authenticate('jwt',{session:false}));

app.get('/posts', (req, res) => {
  Post
      .find()
      .then(posts => res.json(posts))
      .catch(err => res.json(err))
});

app.post("/posts", (req, res) => {

  User.findOne({email: req.body.email})
  .then(user => {
  
        if(user){

          const newPost = new Post(({
            message: req.body.message,
            user: user
          }))

          newPost
            .save()
            .then(post => res.json(post))
            .catch(err => console.log(err))

        }
        else{
            return res.status(400).json({ message: "User not found" });
        } 

  })
  .catch(err => res.json({message:err}));

});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Your application is running @ http://localhost:${port}`)
);

/////////////////////////////////////////////////////////////////////////

/* app.post("/users", (req, res) => {
    const newUser = new User(({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }))

    newUser
    .save()
    .then (user => res.json(user))
    .catch(err=> console.log(err))
    
});


app.get('/getByEmail', (req, res) => {
  User
      .find({email: req.body.email})
      .then(users => res.json(users))
      .catch(err => res.json(err))
}); */



