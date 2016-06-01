
var model = module.exports;

var csvToJson = require("csvtojson");
var mongoose = require('mongoose');
var ConsultantModel = mongoose.model('Consultant');
var csv=require('csv2json-convertor');
var fs = require('fs');
var path = require('path');

model.insert = function (req, res) {

	var srcpath = './files';

	function getDirectories(srcpath) {
		return fs.readdirSync(srcpath).filter(function(file) {
			if(!fs.statSync(path.join(srcpath, file)).isDirectory()){
				var data=csv.csvtojson(path.join(srcpath, file));
		
				for (var i=0; i< data.length; i++){
					var consultant = new ConsultantModel({
						_id : data[i].EmployeesNo,
						firstName : data[i].Prenom,
						lastName : data[i].Nom,
						projects : data[i].Projet,
						competencies : data[i].Competences,
					});
		
					consultant.save(function (err, consultant) {
						if (err) {
							console.log(err);
						} else {
							console.log('meow');
						}
					});
					console.log(consultant);
				}
			}
		
		});
	} 
	getDirectories(srcpath);
}