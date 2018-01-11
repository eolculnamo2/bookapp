var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


//database information
var uri = "mongodb://eolculnamo2:12345@ds249737.mlab.com:49737/bookapp";

//will replace with openUri() in future
mongoose.connect(uri);

//Notifies Console of Connection
mongoose.connection.once('open',()=>{
    console.log("Connected to Mongo via Mongoose")
    }).on('error',(err)=>{
      console.log("Connection Error: " + err)
    });


var User = new Schema({
    username: String,
    password: String,
    books: Array,
    authority: Boolean
})


User.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", User);