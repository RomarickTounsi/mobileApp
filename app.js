// Test connection 

var express = require('express');
var app = express();
var MongoClient = require("mongodb").MongoClient;

app.get('/', function (req, res) {
 res.send("Hello world from server.js");
});

app.listen(3000);
console.log('Server running on port 3000'); 

// convert CSV file to JSON file

var Converter=require("csvtojson").Converter;
var columArrData=__dirname+"/consultant.csv";
var fs = require('fs');
var rs=fs.createReadStream(columArrData);
var result = {}
var csvConverter=new Converter();
 
csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
    for (var key in resultRow) {
        if (!result[key] || !result[key] instanceof Array) {
            result[key] = [];
        }
        result[key][rowIndex] = resultRow[key];
    }
});
rs.pipe(csvConverter);

// Insert Data in MongoDB 

MongoClient.connect("mongodb://localhost/CGI", function(error, db) {
    if (error) throw error;
    
    db.collection("Consultant").insert(result, null, function (error, results) {
        if (error) throw error;    
    });
});

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/CGI');

var ConsultantSchema = new mongoose.Schema({
    First_name: { type: String, required: true }, 
    Last_name: { type: String, required: true },
    Competences: { type: String, required: true },
    Projets: { type: String, required: true },
    date_created: { type: Date, required: true, default: Date.now }
}); 

var Consultant = mongoose.model('Consultant', ConsultantSchema);
