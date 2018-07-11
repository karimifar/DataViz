var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("Public"));


var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "imr_db",
})

connection.connect( function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId)

})

app.get("/", function(req,res){
    res.sendFile("Public/index.html");
})

app.post("/api/imr", function(req,res){
    var zipCode = req.body.zipcode;
    connection.query("SELECT * FROM imr WHERE Zip = ?", [zipCode], function(err, data){
        if (err) throw err;
        res.send(data)
    })
})

app.listen(PORT, function(){
    console.log("App now listening on localhost:" + PORT)
})