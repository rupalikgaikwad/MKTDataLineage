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
  var pDocPath = req.query.DocPath;
  var pDocType = req.query.DocType;
  var pUser = req.query.User;
  var pSystem = req.query.System;
  console.log(req.query);
  var docs = require("./public/SourceSystem.json");
// Get Value from JSON
  var result = docs.filter(function(v, i) {
	  var isValid = true;
	  if((pDocPath != null) && (pDocPath != "") && (v["DocPath"].toUpperCase() != pDocPath.toUpperCase())){
		  isValid = false;
	  }
	  //console.log("pDocPath ",pDocPath+isValid);
	  if((pDocType != null) && (pDocType != "") && (v["DocType"].toUpperCase() != pDocType.toUpperCase())){
		  isValid = false;
	  }
	  //console.log("pDocType ",pDocPath+isValid);
	  if((pUser != null) && (pUser != "") && (v["User"].toUpperCase() != pUser.toUpperCase())){
		  isValid = false;
	  }
	  //console.log("pUser ",pDocPath+isValid);
	  if((pSystem != null) && (pSystem != "") && (v["System"].toUpperCase() != pSystem.toUpperCase())){
		  isValid = false;
	  }
	  /*if(v["SystemLevel"] != 0){
		  isValid = false;
	  }*/
	  //console.log("pSystem ",pDocPath+isValid);
    return isValid;
  })
  res.send(result);
  
});


app.get('/getDocData', function(req, res, next) {
  try{
  console.log("inside getDocData");
  var id = req.query.DocPath;
  var docs = require("./public/SourceSystem.json");
  console.log(docs);
  var feedingSys = "";
  var result = docs.filter(function(v, i) {
	if((v["SystemLevel"] ==0)&&(v["DocPath"].toUpperCase() == id.toUpperCase())){
		feedingSys = v["SourceSystem"];
	}
    return (v["DocPath"].toUpperCase() == id.toUpperCase());
  })
  result.push({"ParentSystem":feedingSys,"SourceSystem":"XDS"});
// Get Value from JSON
  console.log("update Name:", id);
  
  res.render('update',{MKData:result});
  }catch(ex)
  { console.log("server error:",ex);}
  
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