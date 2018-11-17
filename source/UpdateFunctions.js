console.log('update code running');

document.addEventListener('DOMContentLoaded', function() {
    console.log('update code running');
	populateUpdateTable();
}, false);

function populateUpdateTable(){
	console.log("inside populateUpdateTable 3:", sessionStorage['DocPath']);
	var docpath= sessionStorage['DocPath'];
	var data = {
          "MKDDoc": [
  {"DocType": "Swapcurve", "DocPath": "swapcurve/official/today/AMH", "System": "Reuter", "User": "ABC", "Level": 0},
  {"DocType": "Swapcurve1", "DocPath": "AMH", "System": "summit", "User": "ABC", "Level": 1},
  {"DocType": "Swapcurve2", "DocPath": "AMH", "System": "Sophis", "User": "ABC", "Level": 2}
  ]
    };
    res = JSON.search( data, '//MKDDoc[DocPath="' + docpath + '"]' );

console.log("System:", res[0].System);
console.log("User:", res[0].User);
console.log("Level:", res[0].Level);
}