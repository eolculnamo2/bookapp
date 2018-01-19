var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser')
var express = require('express');
var passport = require('passport');
var router = express.Router();
var Strategy = require('passport-local').Strategy;

//models
var Book = require('../models/Book');
var User = require('../models/User');

var manageBooks = require('./manageBooks');


router.use(express.static('build'));

router.use('/', manageBooks);
router.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: ["faewfeag43g24098gy24p98gy"]
}))

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Register New User
router.post('/newUser', (req, res)=>{
  if(req.body.password === req.body.confirmPassword){
    User.register(new User({ 
                             username : req.body.username,
                             authority: false,
                             books: [],
                             categories: [],
                             recommended: [],
                             tags: []
                             }), req.body.password, (err, account)=>{
        if (err) {
            console.log(err)
        }
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/');
        });
    });
  }
  else{
    res.send("Passwords Do Not Match");
  }
});


//Login
router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log("Login")
    res.redirect('/');
});

//Logout
router.post('/logout',(req,res)=>{
    console.log("Logout")
  req.logout();
  res.redirect('/');
});

router.get('/checkLogin',(req,res)=>{
  console.log("Checking Login")
  if(req.user){
    console.log("Logged In")
    res.json([{verified: true}])
  }
  else if(!req.user){
    console.log("Not logged in")
    res.json([{verified: false}])
  }
})

//Code Below should be moved during clean up phase to other routes.

router.get("/bookData",(req,res)=>{
    User.findOne({username: req.user.username},(err,result)=>{
      console.log(result)
      res.json(result.books);
    })
})

router.post("/addNewBook", (req,res)=>{
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    read: false,
    categories: [],
    tags: [],
    recommendedBy: "",
    amazonURL: "",
    audibleURL: "",
    rating: 0
  }
  User.findOneAndUpdate({username: req.user.username},{$push: {books: newBook}},{new: true},(err,result)=>{
    console.log("updated "+req.user.username);
    res.redirect("/");
  })
})




module.exports = router;