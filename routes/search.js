/* GET search page. */
exports.search = function(req, res){
 //var jsonContent = require("../jsoncontent.json");
// Get Value from JSON
 //console.log("User Name:", jsonContent[0].DocType);
  var jsonContent = [];
  res.render('Search',{"MKData": jsonContent});
};

