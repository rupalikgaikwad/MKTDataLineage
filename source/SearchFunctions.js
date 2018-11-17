console.log('Client-side code running');



$(function(){
	$('#SearchBtn').click(function(e){
		console.log("inside SearchBtn click");
		console.log("DocType:", DocType);
       console.log("DocPath:", DocPath.value);
       console.log("User Name:", User);
       console.log("System:", System);
		var parameters = {DocPath:DocPath.value};
		$.get( '/fetchdata',parameters, function(data) {
			console.log("Doctype:", data[0].DocType);
            var MKData = data;
	  var target = document.getElementById('searchData');
	  for (i = 0; i < data.length; i++) { 
        var eleTR = document.createElement('TR');
		var eleTD = document.createElement('TD');
	    eleTD.innerHTML = data[i].DocType;
        eleTR.appendChild(eleTD);
		var eleTD2 = document.createElement('TD');
	    eleTD2.innerHTML = data[i].DocPath;
        eleTR.appendChild(eleTD2);
		var eleTD3 = document.createElement('TD');
	    eleTD3.innerHTML = data[i].System;
        eleTR.appendChild(eleTD3);
		var eleTD4 = document.createElement('TD');
	    eleTD4.innerHTML = data[i].User;
        eleTR.appendChild(eleTD4);
		var eleTD5 = document.createElement('TD');
	    var eleButton = document.createElement('BUTTON');
		eleButton.setAttribute("class","btn btn-warning btn-sm active");
		eleButton.setAttribute("type","button");
		eleButton.setAttribute("onclick","showDataFlow()");
		eleButton.innerHTML = "Display";
		eleTD5.appendChild(eleButton);
		eleTR.appendChild(eleTD5);
		var eleTD6 = document.createElement('TD');
	    var eleButton2 = document.createElement('BUTTON');
		eleButton2.setAttribute("class","btn btn-warning btn-sm active");
		eleButton2.setAttribute("type","button");
		/*var funcCall = "openUpdatePage('" + data[i].DocPath +"')";
		eleButton2.setAttribute("onclick",funcCall);*/
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
  

$(function(){
	$('#SearchBtn').click(function(e){
		var parameters = {DocPath:DocPath.value};
		$.get( '/fetchdata',parameters, function(data) {
			console.log("Doctype:", data[0].DocType);
            var MKData = data;
	  var target = document.getElementById('searchData');
	  for (i = 0; i < data.length; i++) { 
        var eleTR = document.createElement('TR');
		var eleTD = document.createElement('TD');
	    eleTD.innerHTML = data[i].DocType;
        eleTR.appendChild(eleTD);
		var eleTD2 = document.createElement('TD');
	    eleTD2.innerHTML = data[i].DocPath;
        eleTR.appendChild(eleTD2);
		var eleTD3 = document.createElement('TD');
	    eleTD3.innerHTML = data[i].System;
        eleTR.appendChild(eleTD3);
		var eleTD4 = document.createElement('TD');
	    eleTD4.innerHTML = data[i].User;
        eleTR.appendChild(eleTD4);
		var eleTD5 = document.createElement('TD');
	    var eleButton = document.createElement('BUTTON');
		eleButton.setAttribute("class","btn btn-warning btn-sm active");
		eleButton.setAttribute("type","button");
		eleButton.setAttribute("onclick","showDataFlow()");
		eleButton.innerHTML = "Display";
		eleTD5.appendChild(eleButton);
		eleTR.appendChild(eleTD5);
		var eleTD6 = document.createElement('TD');
	    var eleButton2 = document.createElement('BUTTON');
		eleButton2.setAttribute("class","btn btn-warning btn-sm active");
		eleButton2.setAttribute("type","button");
		var funcCall = "openUpdatePage('" + data[i].DocPath +"')";
		eleButton2.setAttribute("onclick",funcCall);
		eleButton2.innerHTML = "Update";
		eleTD6.appendChild(eleButton2);
		eleTR.appendChild(eleTD6);
		target.appendChild(eleTR);
	  }
      console.log('Client received OK response',data.length);
     });
	});
  
  });
  
function openUpdatePage(pDocPath){
	console.log("inside openUpdatePage:");
	sessionStorage["DocPath"] = pDocPath;
	
	console.log("inside openUpdatePage 3:", sessionStorage);
    window.location.href = 'update';
}



function showDataFlow(){
  var $ = go.GraphObject.make;
  var myDiagram = $(go.Diagram, "flowDiv", 
        {
          initialContentAlignment: go.Spot.Center,
          initialAutoScale: go.Diagram.UniformToFill,
          layout: $(go.LayeredDigraphLayout)
          // other Layout properties are set by the layout function, defined below
        });;
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

  var nodeDataArray = [
    { key: "Reuter", color: "lightblue" },  // note extra property for each node data: color
    { key: "BBG", color: "lightblue" },  // note extra property for each node data: color
    { key: "ICAP", color: "lightblue" },  // note extra property for each node data: color
    { key: "SMITH", color: "lightblue" },  // note extra property for each node data: color
    { key: "GATOR", color: "lightblue" },  // note extra property for each node data: color
    { key: "XDS", color: "green" },  // note extra property for each node data: color
    { key: "SUMMIT", color: "lightblue" }
  ];
  var linkDataArray = [
    { from: "Reuter", to: "SMITH" },
    { from: "BBG", to: "SMITH" },
    { from: "ICAP", to: "SMITH" },
    { from: "SMITH", to: "GATOR" },
    { from: "GATOR", to: "XDS" },
    { from: "XDS", to: "SUMMIT" }
  ];
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}


