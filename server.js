// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// to use static files
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// just for testing... 
app.get("/api/hello", function (req, res) {
  res.json({testing: 'hello API'});
});

// when the string is empty
app.get("/api/timestamp", function(req, res) {
  var date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// API endpoints...
app.get("/api/timestamp/:date_string", function(req, res) {
  var d = req.params.date_string;
  
  // if it's a date string
  var date = new Date(d);
  if(isNaN(d)){ // if it's in date format
    if (isNaN(date.getTime())){ // when the date is not valid
      //res.json({unix: null, utc : "Invalid Date" });
      res.json({error: "Invalid Date"});
    } else {
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
  }
  // when it's a unix timestamp
  var date = new Date(d * 1000);
  if(date.toUTCString()==="Invalid Date"){
      //res.json({unix: null, utc : "Invalid Date" });
    res.json({error: "Invalid Date"});
    }
  else {
    res.json({unix: d, utc: date.toUTCString()});
    
  }
});
/*app.get("/api/timestamp/:date_string", function(req, res) {
  var d = req.params.date_string;
  if(new Date(d).getTime()==d){
    var date = new Date(d);
    res.json({unix: d, utc: date.toUTCString()});
  }
  // if the date is valid
  if(!isNaN(Date.parse(d))){
    var date = new Date(d);
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
  else {
    res.json({error: "Invalid Date"});
  }*/
  /*if (d) { 
    var date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
  // when the date is not valid
  else { 
    var date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }*/
  // res.json({date: date});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});