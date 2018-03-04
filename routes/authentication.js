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
  maxAge: 24*60*60*1100,
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
      res.json(result.books);
    })
})
router.get("/userData",(req,res)=>{
    User.findOne({username: req.user.username}, (err,result)=>{
      res.json(result);
    })
})

router.post("/markRead:str",(req,res)=>{
   var index = req.params.str;
  User.findOne({username: req.user.username}, (err,response)=>{
    var updater = response.books
    updater[index].read = true;

    User.findOneAndUpdate({username: req.user.username}, {$set: {books: updater}},(err,response2)=>{
      if (err){
        throw err;
      }
      else{
        res.redirect("/")
      }
    })
  })
})

router.post("/rate:str",(req,res)=>{
  console.log("called"+req.body.rating)
  var index = req.params.str;
  User.findOne({username: req.user.username}, (err,response)=>{
    var updated = response.books;
    updated[index].rating = req.body.rating;
    User.findOneAndUpdate({username: req.user.username}, {$set: {books: updated}},(err,response2)=>{
      if(err){
        throw err;
      }
      else{
        res.redirect("/");
      }
    })
    console.log("response: "+JSON.stringify(response.books[index])+"rating: "+req.body.rating);

  })
})


//Add book and initial filters. Will need separate route for adding/deleting new filters
router.post("/addNewBook", (req,res)=>{
  console.log("sacing..")
  var importedCat = []
  var importedTags = []
  var importedRecommendedBy = []
  var importedRecommendedByString = ""
  if(req.body.category != null){
    importedCat.push(req.body.category); 
  }
  if(req.body.tags != null){
    importedTags.push(req.body.tags);
  }
  if(req.body.recommendedBy != null){
    importedRecommendedBy.push(req.body.recommendedBy);
    importedRecommendedByString = req.body.recommendedBy;
  }
  
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    read: false,
    categories: importedCat,
    tags: importedTags,
    recommendedBy: importedRecommendedBy,
    amazonURL: "",
    audibleURL: "",
    rating: 0
  }

  User.findOne({username: req.user.username},(err,response)=>{
    var bookArray = response.books;
    var catArray = response.categories
    var tagArray = response.tags
    var recArray = response.recommended
    catArray.unshift(importedCat)
    tagArray.unshift(importedTags)
    recArray.unshift(importedRecommendedBy)
    bookArray.unshift(newBook);
    console.log(bookArray)

    User.findOneAndUpdate({username: req.user.username},{$set: {books: bookArray,
                                                                categories: catArray,
                                                                tags: tagArray,
                                                                recommended: recArray}},{new: true},(err,result)=>{
      console.log("updated "+req.user.username+" recs "+ importedTags + " tags " + importedRecommendedBy);
      if(err){
        throw err;
      }
      res.redirect("/");
  })

  })
  
  
})




module.exports = router;