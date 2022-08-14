require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// URL Shortener Microservice
// Short URL Creation
// Example: POST [project_url]/api/shorturl - https://www.google.com
// 
// URL Shortener
// URL: 
// https://outlook.com
//  
// Example Usage:
// [this_project_url]/api/shorturl/3
// Will Redirect to:
// https://forum.freecodecamp.org/
// 
// By freeCodeCamp
var id=0;
// save the sites
const sites = []; 
const isValidUrl = urlString => {
		let url;
		try { 
	      	url =new URL(urlString); 
	    }
	    catch(e) { 
	      return false; 
	    }
	    return url.protocol === "http:" || url.protocol === "https:";
}	

app.post('/api/shorturl', function(req, res) {
    const { url } = req.body;
    const hostName = new URL(url).hostname;
    if (!isValidUrl(url)) {
      return res.json(
          { error: 'invalid url' }
      );     
    }
  
   dns.lookup( hostName, (err, address, family) => {
      console.log('err    :' + err);
      console.log('address:' + address)
      console.log('family :' + family)
      if (err) {
         return res.json(
              { error: 'invalid url' }
         );     
      }
      else {
         id++;
         const newURL = { original_url :url, short_url: `${id}`};
         sites.push(newURL);
         return res.json(newURL);     
      }
   });
  
});


app.get('/api/shorturl/:number', function(req, res) {

  const id = req.params.number
  const shortURL = sites.find ( el => {
     var str = el.short_url.toString();
     return  (str === id.trim())
   });
   console.log('shortURL:' + shortURL);
  if (shortURL) {
       return res.redirect(shortURL.original_url);
  }
  else {
       return res.json({ error: 'not short url'});    
  }
  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

