
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    _dbUri = 'mongodb://localhost/CGI';
    
var connect = function() {
    var cb = function(err, res) {
        if (err) {
            console.log('ERROR connecting to: ' + _dbUri + '. ' + err);
            setTimeout(connect, 10000);
        }
        else { 
			console.log('Succeeded connected to: ' + _dbUri); 
		}
    };
    mongoose.connect(_dbUri, cb);
};
connect();

var ConsultantSchema = new Schema({
    _id: {type: Number, required: true},
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    competencies: { type: String, required: true },
    projects: { type: String, required: true },
    creationDate: { type: Date, required: true, default: Date.now }
}); 

var Consultant = mongoose.model('Consultant', ConsultantSchema);
