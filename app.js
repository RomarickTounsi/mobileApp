
var application_root = __dirname,
    express = require("express"),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    models = require('./models/modelSchema'),
    insertData = require('./models/insertData'),
    researchData = require('./models/researchData')
    fs = require('fs');

var app = express();

app.use(fileUpload());
app.use(bodyParser.json());

app.get('/api/', function(req, res){
	res.sendFile(application_root+'/view/index.html');
});

app.post('/api/insertConsultant', insertData.insert);
app.get('/api/researchConsultant', researchData.research);
app.get('/api/researchConsultantByID/:id', function (req, res) {
	researchData.researchConsultant(req.params.id, res);
});

app.listen(3000);
console.log('Server running on port 3000');



