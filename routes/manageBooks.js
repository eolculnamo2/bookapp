var express = require('express');
var books = require('google-books-search');
var app = express();
var User = require('../models/User');
var Book = require('../models/Book');
var router = express.Router();
var bodyParser = require('body-parser');
var authentication = require('./authentication');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.static('build'));



module.exports = router;