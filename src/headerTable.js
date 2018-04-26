function changeHeader(){
	
		document.querySelectorAll('#FeedTable tr')[0].style.position = "fixed";
		/*
		var maxtableColumns =  document.getElementById('FeedTable').rows[0].cells.length;
		var maxLines =  document.getElementById('FeedTable').rows.length;
		maxLines += -1;
		var tester =  document.getElementById('FeedTable').rows[0].innerHTML;
		var tester2 =  document.getElementById('FeedTable').rows[1].innerHTML;
		var TableWindow = document.createElement("TABLE");
			TableWindow.setAttribute("id", "TableWindow");
		var writelocation = document.getElementById("headerPopUp");
		writelocation.innerHTML = "";
		var TableROW = document.createElement("TR");
		TableROW.innerHTML = tester;
		writelocation.appendChild(TableROW);
		var TableROW = document.createElement("TR");
		TableROW.innerHTML = tester2;
		writelocation.appendChild(TableROW);
		document.querySelectorAll('div#headerPopUp')[0].style.position = "fixed";
		//document.querySelectorAll('div#headerPopUp tr')[1].style.visibility = "hidden";
		var x,i; 
		//= document.querySelectorAll('table#FeedTableHeader td')[0].offsetWidth;
		//document.querySelectorAll('table#FeedTable tr')[0].style.position = "fixed";
		//document.querySelectorAll('table#FeedTable tr')[0].style.overflow = "hidden";
	
		/*
		for (i = 0; i < maxtableColumns ; i++){
			x = document.querySelectorAll('table#FeedTable td')[i].clientWidth;
			document.querySelectorAll('table#FeedTable th')[i].style.width = x+"px";
		}
		for (i = 0; i < maxtableColumns ; i++){
			x = document.querySelectorAll('table#FeedTable th')[i].clientWidth;
			document.querySelectorAll('table#FeedTable td')[i].style.width = x+"px";
		}
		for (i = 0; i < maxtableColumns ; i++){
			x = document.querySelectorAll('table#FeedTable td')[i].clientWidth;
			document.querySelectorAll('table#FeedTable th')[i].style.width = x+"px";
		}
		*/
	}