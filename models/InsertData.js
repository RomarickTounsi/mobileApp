/*var model = module.exports;
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

model.insert = function(req, res){
	var Converter=require("csvtojson").Converter;
	var columArrData="c:/node/todoApp/consultant.csv";
	var rs=fs.createReadStream(columArrData);
	result = {}
	var csvConverter=new Converter();

	//end_parsed will be emitted once parsing finished 
	csvConverter.on("end_parsed", function(jsonObj) {
		console.log(result);
		console.log("Finished parsing");
	});
 
	//record_parsed will be emitted each time a row has been parsed. 
	csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
 
		for (var key in resultRow) {
			if (!result[key] || !result[key] instanceof Array) {
            result[key] = [];
			}
			result[key][rowIndex] = resultRow[key];
		}
	});
	rs.pipe(csvConverter);


	MongoClient.connect("mongodb://localhost/CGI", function(error, db) {
		if (error) throw error;
    
		db.collection("Consultant").save(result, null, function (error, results) {
			if (error) throw error;
			console.log("Le document a bien été inséré");    
		});
    
    
		/*db.collection("Consultant").find().toArray(function (error, results) {
			if (error) throw error;

			results.forEach(function(i, obj) {
				console.log(
					"ID : "  + obj._id.tostring + "\n",
					"First_name : " + obj.First_name + "\n" ,
					"Last_name : " + obj.Last_name + "\n" ,
					"Competences : " + obj.Competences + "\n" ,
					"Projet : " + obj.Projet + "\n"
				);
			});
		});   */
    
		/*var MongoObjectID = require("mongodb").ObjectID; 
		var idToFind      = "5747416632e6094c58607dd2";   
		var objToFind     = { _id: new MongoObjectID(idToFind) };

		db.collection("Consultant").findOne(objToFind, function(error, result) {
			if (error) throw error;

			console.log(
				"ID : "  + result._id.toString() + "\n",
				"First_name : " + obj.First_name + "\n" ,
				"Last_name : " + obj.Last_name + "\n" ,
				"Competences : " + obj.Competences + "\n" ,
				"Projet : " + obj.Projet + "\n"
			);   
		});*/
	});
	
}*/


// Autre methode celle qui fonctionne

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
	console.log(file);
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



//for(var file = 0; file< file.length; file++){
	
	/*var data=csv.csvtojson(req.body); 
	console.log(data);
	
	for (var i=0; i< data.length; i++){
		var consultant = new ConsultantModel({
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
//}
	*/

}

// ou encore

/*model.insert = function (data) {

	//var data=csv.csvtojson(req.body); 
	console.log(data);
	var Converter = csvToJson.Converter;
	//var rs=fs.createReadStream(data);
	var converter = new Converter();
	
	converter.on("end_parsed", function (jsonObj) {
		console.log(data);
		
		console.log("Finished parsing");
		
	});
	
	//data.pipe(converter);
	
	/*function BinaryToString(data) {
    var error;

    try {
        return decodeURIComponent(escape(binary));
    } catch (_error) {
        error = _error;
        if (error instanceof URIError) {
            return binary;
        } else {
            throw error;
        }
    }
	}*/
	
	/*var myReadableStreamBuffer = new Buffer();

	// With a buffer
	myReadableStreamBuffer.put(data);
	
	myReadableStreamBuffer.pipe(converter)

	
	for (var i=0; i< data.length; i++){
		var consultant = new ConsultantModel({
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

}*/
