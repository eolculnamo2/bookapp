var express = require('express');
var books = require('google-books-search');
var app = express();
var router = express.Router();
var authentication = require('./authentication');

router.use(express.static('build'));

router.get('/search', (req,res)=>{
    console.log("EWF")
    books.search('Professional JavaScript for Web Developers', function(error, results) {
        if ( ! error ) {
            console.log("Successful query");
        } else {
            console.log(error);
        }
    });
    
})

module.exports = router;