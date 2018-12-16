console.log('update code running');

$(function(){
	$('#AddBtn').click(function(e){
		console.log("inside Add click");
	  var target = document.getElementById('newTable');
	  
        var eleTR = document.createElement('TR');
		var eleTD = document.createElement('TD');
	    //eleTD.innerHTML = data[i].DocType;
		eleTD.innerHTML = '<input id="pSystem" name="pSystem" class="form-control">';
        eleTR.appendChild(eleTD);
		var eleTD2 = document.createElement('TD');
	    eleTD2.innerHTML = '<input id="sSystem" name="sSystem" class="form-control">';
        eleTR.appendChild(eleTD2);
		var eleTD3 = document.createElement('TD');
	    eleTD3.innerHTML = '<select id="Type1" class="form-control"><option>Processor</option><option>Source</option></select>';
        eleTR.appendChild(eleTD3);
		var eleTD4 = document.createElement('TD');
	    eleTD4.innerHTML = '<select id="Level1" class="form-control"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>';
        eleTR.appendChild(eleTD4);
		var eleTD5 = document.createElement('TD');
	    var eleButton = document.createElement('BUTTON');
		eleButton.setAttribute("class","btn btn-warning btn-sm active");
		eleButton.setAttribute("type","button");
		var deleteCall = "removeRow(this)";
		eleButton.setAttribute("onclick",deleteCall);
		eleButton.innerHTML = "Delete";
		eleTD5.appendChild(eleButton);
		eleTR.appendChild(eleTD5);
		var eleTD6 = document.createElement('TD');
	    var eleButton2 = document.createElement('BUTTON');
		eleButton2.setAttribute("class","btn btn-warning btn-sm active");
		eleButton2.setAttribute("type","button");
		var funcCall = "openUpdatePage(''); return false;";
		eleButton2.setAttribute("onclick",funcCall);
		eleButton2.setAttribute("id","UpdateBtn");
		eleButton2.innerHTML = "Update";
		eleTD6.appendChild(eleButton2);
		eleTR.appendChild(eleTD6);
		target.appendChild(eleTR);
	});
  
  });
  
  
    // DELETE TABLE ROW.
    function removeRow(oButton) {
		console.log('inside remove row');
        var empTab = document.getElementById('newTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex-1);       // BUTTON -> TD -> TR.
    }