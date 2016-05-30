var model = module.exports;
var fs = require('fs');
model.insert = function(req, res){
	
	var Converter=require("csvtojson").Converter;
	var columArrData=__dirname+"/consultant.csv";
	
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
	
}