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
                             books: []
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
router.get('/logout',(req,res)=>{
    console.log("Logout")
  req.logout();
  res.redirect('/');
});

module.exports = router;