
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/test3');

var ConsultantSchema = new Schema({
    First_name: { type: String, required: true }, 
    Last_name: { type: String, required: true },
    Competences: { type: String, required: true },
    Projet: { type: String, required: true },
    date_created: { type: Date, required: true, default: Date.now }
}); 

var Consultant = mongoose.model('Consultant', ConsultantSchema);

module.exports = {
}