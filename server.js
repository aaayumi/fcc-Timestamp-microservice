'use strict';

var express = require('express');
var app = express();

var moment = require('moment');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.get('/:unix', (req, res)=>{
	console.log("query" + req.params.unix);
	console.log("unix" + Math.floor(new Date() / 1000)); 
var req = req.params.unix;

// from unix value

var re = new RegExp(/^\d{10}$/)
if(re.test(req)){
	console.log("valid")
    var d = new Date(req* 1000),
    var yyyy = d.getFullYear(),
    var mm = ('0' + (d.getMonth() + 1)).slice(-2),
    var dd = ('0' + d.getDate()).slice(-2)
    
    if(mm==1){ mm="January";}
    if(mm==2){ mm="February";}
    if(mm==3){ mm="March";}
    if(mm==4){ mm="April";}
    if(mm==5){ mm="May";}
    if(mm==6){ mm="June";}
    if(mm==7){ mm="July";}
    if(mm==8){ mm="August";}
    if(mm==9){ mm="September";}
    if(mm==10){ mm="October";}
    if(mm==11){ mm="November";}
    if(mm==12){ mm="December";}

    var time = mm + ' ' + dd + ', ' + yyyy;

	res.send({ "unix": req, "natural" : time })

// from natural language date

} else if(req.match(/\w{3,9}?\s\d{1,2}\,\s\d{1,4}/)) {
	var timeStamp = new Date(req).getTime() / 1000
	res.send({ "unix": timeStamp, "natural" : req })
} else {
	res.send({ "unix": null, "natural" : null})
}
})

app.listen(3000, () => {
	console.log('Listening on port 3000');
});

module.exports = app;