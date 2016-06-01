var model = module.exports;

var csvToJson = require("csvtojson");
var mongoose = require('mongoose');
var ConsultantModel = mongoose.model('Consultant');

model.research = function (req, res) {

	ConsultantModel.find({},function (err, consultants) {
  		if (err) {
    		console.log('err');
  		} else {
    		res.json(consultants);
  		}
	});
}