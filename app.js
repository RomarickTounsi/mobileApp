var express = require('express');
var app = express();

app.get('/', function (req, res) {
 res.send("Hello world from server.js");
});

app.listen(3000);
console.log('Server running on port 3000');



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/test3');

var ConsultantSchema = new mongoose.Schema({
    First_name: { type: String, required: true }, 
    Last_name: { type: String, required: true },
    date_created: { type: Date, required: true, default: Date.now }
}); 

var Consultant = mongoose.model('Consultant', ConsultantSchema);

module.exports = {
}