// SERVER-SIDE JAVASCRIPT
// run npm install to install all required packages before starting server

var express = require('express');
var app = express();


// MIDDLEWARE
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Allow CORS:
// not necessary since we'll be making requests from a js file
  // that we are also serving (as static assets in public)
// app.use(function(request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// ROUTES
// Root Route
app.get('/', function (request, response) {
  response.sendFile('views/index.html' , { root : __dirname});
});

// Gallery View Route
app.get('/art-gallery', function (request, response) {
  response.sendFile('views/art-gallery.html' , { root : __dirname});
});

// The Number Guessing Game
var targetNumber = 7;

app.get('/pick-a-number', function(request, response){
  var num = parseInt(request.query.number);
  if (num === targetNumber){
    response.send('Nailed it!');
  } else if (num > targetNumber){
    response.send('Too High!');
  } else if (num < targetNumber) {
    response.send('Too Low');
  } else {
    console.log('Something odd happened! target:', targetNumber, typeof(targetNumber),'num:', num, typeof(num));
    response.send('Your guess is beyond compare!');
  }
});

app.post('/pick-a-number', function(request, response){
  targetNumber = parseInt(request.body.number);
  response.status(200).send('Number updated successfully!');
});

// Gallery


// SERVER START
var port = 3000;
app.listen(port, function(){
  console.log('Server Running at localhost:3000/');
});
