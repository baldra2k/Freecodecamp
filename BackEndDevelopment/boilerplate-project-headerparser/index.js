// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//
// API Project: Request Header Parser Microservice
// Example Usage:
// [base url]/api/whoami
// Example Output:
// {"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5",
// "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) 
// Gecko/20100101 Firefox/50.0"}
//
// by freeCodeCamp
app.get('/api/whoami', function (req, res) {

   //Get ip
   // console.log(req.connection.remoteAddress) ;

   // get OS info
   let osInfo = req.headers["user-agent"].split(/[()]/)[1]; 
   // console.log(osInfo)
  
   // get first language info 
   let languageInfo = req.headers["accept-language"].split(',')[0]; 
   // console.log(languageInfo)

   // build the response
    res.json(
       {
      "ipaddress": req.connection.remoteAddress,
      "language": languageInfo,
      "software": osInfo
       }  
    );
      
  });

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
