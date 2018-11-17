var express = require('express');
var nib = require('nib');
var home = require('./routes/home');
var search = require('./routes/search');
var update = require('./routes/update');
var newf = require('./routes/new');

var app = express();

app.set('views',__dirname + '/views')
app.set('view engine','jade')

app.use("/src",express.static("./Source"));
app.use(express.static(__dirname + '/public'))

/* Router set up*/
/*app.use(app.router);*/
app.get('/', home.home);
app.get('/home', home.home);
app.get('/Search', search.search);
app.get('/update', update.update);
app.get('/new', newf.new);

app.get('/fetchdata', function(req, res, next) {
	console.log("inside fetchdata");
  //var id = req.query.id;
  var docs = require("./public/jsoncontent.json");
// Get Value from JSON
  console.log("User Name:", docs[0].DocType);
  res.send(docs);
  //res.render('Search',{"MKData": docs});
  
});

app.get('/clicks', (req, res) => {
  console.log("inside get Clicks");
  //var id = req.query.id;
  var docs = require("./public/jsoncontent.json");
// Get Value from JSON
  console.log("User Name:", docs[0].DocType);
  //res.render('Search',{"MKData": docs});
  res.send(docs);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function(){
	console.log("Server running at port 3000");
})