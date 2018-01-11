var express = require('express');
var path = require('path');
var app = express();

//routes
var authentication = require('./routes/authentication');
var manageBooks = require('./routes/manageBooks');

app.use(express.static('build'));
app.use('/', authentication);
app.use('/', manageBooks);


app.get("/hi",(req,res)=>{
    res.send("Working")
})

app.listen(3000, ()=>{
    console.log('Listening...');
})



//https://dev.to/loujaybee/using-create-react-app-with-express
