var model = module.exports;

model.convert = function(req, res){
	var Converter=require("csvtojson").Converter;
	var columArrData=__dirname+"/consultant.csv";
	var fs = require('fs');
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
	
}
