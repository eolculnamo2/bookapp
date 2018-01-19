var express = require('express');
var path = require('path');
var app = express();
var amazonBookSearchSE = require('amazon-book-search-se');
var absse =  new amazonBookSearchSE({ awsKey: "AKIAJJE5WUM7ZO5XQ6NQ", awsSecret: "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", assocId: "rbertram8-20" });

//AKIAJJE5WUM7ZO5XQ6NQ
//kZX7pAu9HXbM3lsigc83hlYzqArePE5QcpZboqZp
//associateID: rbertram8-20

//routes
var authentication = require('./routes/authentication');
var manageBooks = require('./routes/manageBooks');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', authentication);
app.use('/', manageBooks);

/*
app.get("/query",(req,res)=>{

    absse.search('the prince', function(error, result){
        if(error){
            console.log("ERROR: "+JSON.stringify(error));
        } else {
            res.send(json.stringify(result))
            console.log("SUCCESS: "+JSON.stringify(result));
        }
    }, 1)
    
})
  */




app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/client/build/index.html")
})
app.get("/hi",(req,res)=>{
    res.send("Working")
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Listening...');
})



//https://dev.to/loujaybee/using-create-react-app-with-express
