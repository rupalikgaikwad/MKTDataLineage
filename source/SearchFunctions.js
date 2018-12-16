console.log('Client-side code running');  

$(function(){
	$('#SearchBtn').click(function(e){
		console.log("inside SearchBtn click");
	  var target = document.getElementById('searchData');
	  // first clear table
	  for(var i = target.rows.length - 1; i >= 0; i--){
		target.deleteRow(i);
	  }
	  
	  // Extract data from server
	  var parameters = {DocPath:DocPath.value, DocType:DocType.value, User:User.value, System:System.value};
	  $.get( '/fetchdata',parameters, function(data) {
		console.log("Doctype:", data[0].DocType);
        var MKData = data;
	    var strData = JSON.stringify(data);
	  
	  // populate table with only one predecessor
	  for (i = 0; i < data.length; i++) {
        if(data[i].SystemLevel != 0){
			continue;
		}
        var eleTR = document.createElement('TR');
		var eleTD = document.createElement('TD');
	    //eleTD.innerHTML = data[i].DocType;
		eleTD.innerHTML = '<a href="http://en.wikipedia.org/">Wikipedia</a><div class="box"><embed  src="http://en.wikipedia.org/" width = "200px" height = "200px"/></div>';
        eleTR.appendChild(eleTD);
		var eleTD2 = document.createElement('TD');
	    eleTD2.innerHTML = data[i].DocPath;
        eleTR.appendChild(eleTD2);
		var eleTD3 = document.createElement('TD');
	    eleTD3.innerHTML = data[i].SourceSystem;
        eleTR.appendChild(eleTD3);
		var eleTD5 = document.createElement('TD');
	    var eleButton = document.createElement('BUTTON');
		eleButton.setAttribute("class","btn btn-warning btn-sm active");
		eleButton.setAttribute("type","button");
		var showCall = "showDataFlow('"+strData + "','"+ data[i].DocPath+"')";
		eleButton.setAttribute("onclick",showCall);
		eleButton.innerHTML = "Display";
		eleTD5.appendChild(eleButton);
		eleTR.appendChild(eleTD5);
		var eleTD6 = document.createElement('TD');
	    var eleButton2 = document.createElement('BUTTON');
		eleButton2.setAttribute("class","btn btn-warning btn-sm active");
		eleButton2.setAttribute("type","button");
		var funcCall = "openUpdatePage('" + data[i].DocPath +"'); return false;";
		eleButton2.setAttribute("onclick",funcCall);
		eleButton2.setAttribute("id","UpdateBtn");
		eleButton2.innerHTML = "Update";
		eleTD6.appendChild(eleButton2);
		eleTR.appendChild(eleTD6);
		target.appendChild(eleTR);
	  }
      console.log('Client received OK response',data.length);
     });
	});
  
  });



function showDataFlow(strData,pDocPath){
  var $ = go.GraphObject.make;
  console.log("inside show data ");
  var olddiag = go.Diagram.fromDiv("flowDiv");
  if (olddiag) olddiag.div = null;
  var myDiagram = $(go.Diagram, "flowDiv", 
        {
          initialContentAlignment: go.Spot.Center,
          initialAutoScale: go.Diagram.UniformToFill,
          layout: $(go.LayeredDigraphLayout)
          // other Layout properties are set by the layout function, defined below
        });
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      $(go.Shape,
        { figure: "RoundedRectangle",
          fill: "white" },  // default Shape.fill value
        new go.Binding("fill", "color")),  // binding to get fill from nodedata.color
      $(go.TextBlock,
        { margin: 5 },
        new go.Binding("text", "key"))  // binding to get TextBlock.text from nodedata.key
    );
	myDiagram.addDiagramListener("ObjectSingleClicked",
      function(e) {
        var part = e.subject.part;
        if (!(part instanceof go.Link)) showMessage("Clicked on " + part.data.key);
      });
	//{ click: function(e, obj) { getNodeData("Clicked on " + obj.part.data.key); }}
  //console.log("inside show data ", pDocPath);
  //console.log("data received: ", data);
  var jsonData = JSON.parse(strData);
  var nodeDataArray = [
    { key: "XDS", color: "green" },  // note extra property for each node data: color
    { key: "SUMMIT", color: "lightblue" }
  ];
  var linkDataArray = [
    { from: "XDS", to: "SUMMIT" }
  ];
  
  jsonData.forEach(function(curObj){
	  if(curObj.DocPath.toUpperCase() == pDocPath.toUpperCase()){
		  //create system node
		  nodeDataArray.push({key:curObj.SourceSystem, color: "lightblue"});
		  // add link from parent system to source system
		  if(curObj.ParentSystem != null){
			linkDataArray.push({from:curObj.ParentSystem, to:curObj.SourceSystem});
		  }
		  // add link to XDS
		  if(curObj.SystemLevel == 0){
			linkDataArray.push({from:curObj.SourceSystem, to: "XDS"});
		  }
	  }
  });
  
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

function showMessage(s) {
	window.open("http://en.wikipedia.org/");
    console.log("show message:",s);
  }
 
 
function openUpdatePage(pDocPath){
	console.log("inside openUpdatePage:",pDocPath);
	sessionStorage["DocPath"] = pDocPath;
	var parameters = {DocPath:pDocPath};
	/*$.ajax({
      url: "/getDocData",
      data: {DocPath:pDocPath},
	  type: "GET", // if you want to send data via the "data" property change this to "POST". This can be omitted otherwise
      success: function(responseData) {
      },
      error: console.error
    });
	$.get( '/getDocData',parameters, function(pDocPath) {
	console.log(" Update Doctype:", pDocPath);*/
    window.location.href = '/getDocData?DocPath='+pDocPath;
	/*})*/
      console.log('update received OK response');
}