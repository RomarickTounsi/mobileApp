
var model = module.exports;

var csvToJson = require("csvtojson");
var mongoose = require('mongoose');
var ConsultantModel = mongoose.model('Consultant');
var csv=require('csv2json-convertor');
var fs = require('fs');
var path = require('path');

model.insert = function (req, res) {

	var srcpath = __dirname + '/files';
	var newPath = __dirname + '/files/'+req.files.file.name;
	
	fs.writeFile(newPath, req.files.file.data, function (err) {
		if(err) {throw err;}
		getDirectories(srcpath);
		res.redirect('back');

		fs.unlink(newPath, function(err) {
			if (err) {
				return console.error(err);
			}
			console.log("File deleted successfully!");
		});
	});
		
	function getDirectories(srcpath) {
		console.log(srcpath);
		return fs.readdirSync(srcpath).filter(function(file) {
			if(!fs.statSync(path.join(srcpath, file)).isDirectory()){
				var data=csv.csvtojson(path.join(srcpath, file));
		
				for (var i=0; i< data.length; i++){
				
					var consultant = new ConsultantModel;
					
					consultant._id = data[i].EmployeesNo;
					consultant.firstName = data[i].Prenom,
					consultant.lastName = data[i].Nom;
					consultant.competencies.push(data[i].Competences);
					consultant.projects.push(data[i].Projets);
					
					ConsultantModel.update({_id: consultant._id}, {$set: {firstName: consultant.firstName, lastName: consultant.lastName}, 
										      $addToSet: {competencies: data[i].Competences, projects: data[i].Projets}}, { multi : true, upsert: true }, function (err, consultant){
						if(err) console.log(err);
					});
					console.log(consultant);
				}
			}
		});
	} 
}
