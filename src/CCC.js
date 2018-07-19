var table;
var checkingState = false;
function showLog(){
$("#logStatement").fadeToggle("slow");
}
function showTableLog(){
$("#contents").slideToggle("slow");

//$(".ui-resizable-handle").slideToggle("slow");
}
/*================================================================================
		add fallback to see if something went wrong
==================================================================================*/
function replacecarriage(string){
	var t = string.replace(/\s+/g, ' ').trim();
    return t;
}
		
function INTERRUPTED(errorMessage){
	console.log("can't read the table");
	var text;
	switch (errorMessage) {
		case 1: text = 'Please enter your valid feed url into the field "InsertFeedURL..." or use the "UploadFile" button and choose the correct format either CSV or XML';
		break;
		case 2: text = "There was an error processing your feed url. Please check if the provided url is available and accessable and then please try again." +"<br>"+"<strong>"+"Remember: "+"</strong>"+ "choose the correct format either CSV or XML!" + "<br>"+"<strong>"+"Hint: "+"</strong>"+ "Sometimes the feed detective is blocked by the external server, you can download the feed manually and upload the feed via the uploadFile button!";
		break;
		case 3: text = 'It seems like the feed detective could not read the whole feed, either because its really empty or the feed was loaded wrong'+'<br>'+'<strong>'+'Remember: '+'</strong>'+ 'choose the correct format either CSV or XML!' +'<br>'+'<strong>'+'Hint: '+'</strong>'+ 'If the feed was wrongly loaded and you need to specificy some settings check out the <input type="button" value="log" onclick="showTableLog()"/> <br><i>e.g. for xml feeds may you need to set "XML Root Node"(mostly 1st Level xml Nodes in the log) &amp; "XML Item Node"(mostly one of the 2nd Level xml Nodes in the log) manually!</i>';
		break;
		default: text = 'The feed detective could not find at least 4 Attributes, you can try to change the mapping via Mapping Attribute'+'<br>'+'<strong>'+'Remember: '+'</strong>'+ 'choose the correct format either CSV or XML!' +'<br>'+'<strong>'+'Hint: '+'</strong>'+ 'It can also happen the feed was wrongly loaded and you need to specificy some settings e.g. wrong charset, wrong parent node etc. check out the <input type="button" value="log" onclick="showTableLog()"/> if neccessary';
	}
	document.getElementById("errorstatements").innerHTML = text;
	$("#errorstatements").slideDown("slow");
}
function FIXEDINTERRUPTED(){
	//console.log("found values");
	document.getElementById("contents").innerHTML == "";
	$("#contents").fadeOut("fast");
	$("#errorstatements").fadeOut("fast");
}
function clearAllArrays(){
	resetTemplate();
	FIXEDINTERRUPTED();
	MappingArray = [];
	HeaderArray = [];
	NewMappingArray = [];
	percentArray = [];
	duplicatesArray = [];
	duplicatesPercentArray = [];
	emptyCellsArray= [];
	DuplicateImageSamplesArray = [];
	DuplicateDeepLinkSamplesArray = [];
}
function getNamingAttribute(value){
var selection = {
0:"SKU",
1:"Name",
2:"Price",
3:"Description",
4:"Image",
5:"Deep URL",
6:"Category",
7:"Subcategory",
8:"Subcategory 2",
9:"Old Price",
10:"Base Price",
11:"Gender",
12:"Brand",
13:"Size",
14:"Color",
15:"CPC",
16:"Material",
17:"Shipping",
18:"Availability",
19:"AuxImage",
20:"Energy Label",
21:"mCPC",
22:"GTIN",
"default":"notInList"}
return (selection[value]||selection['default']);
}

function resetTemplate(){
	//==========================================================first column
			 $('input[id="encodingfeedbuilder"]').prop('checked', true);
			 $('input[id="feedstructurebuilder"]').prop('checked', true);
			 $('input[id="articlenumberbuilder"]').prop('checked', true);
			 $('input[id="productnamebuilder"]').prop('checked', true);
			 $('input[id="maincategorybuilder"]').prop('checked', true);
			 $('input[id="subcategorybuilder"]').prop('checked', true);
			 $('input[id="2ndsubcategorybuilder"]').prop('checked', true);
			 $('input[id="genderbuilder"]').prop('checked', true);
			 $('input[id="colorbuilder"]').prop('checked', true);
			 $('input[id="brandbuilder"]').prop('checked', true);
			 $('input[id="materialbuilder"]').prop('checked', true);
			 $('input[id="descriptionbuilder"]').prop('checked', true);
			 $('input[id="pricebuilder"]').prop('checked', true);
			 $('input[id="oldpricebuilder"]').prop('checked', true);
			 $('input[id="pricesStartFrombuilder"]').prop('checked', true);
			 $('input[id="energylabelbuilder"]').prop('checked', true);
			 $('input[id="pricePerUnitbuilder"]').prop('checked', true);
			 $('input[id="shippingcostsbuilder"]').prop('checked', true);
			 $('input[id="shippingtimebuilder"]').prop('checked', true);
			 $('input[id="sizebuilder"]').prop('checked', true);
			 $('input[id="filtersbuilder"]').prop('checked', true);
			 $('input[id="ImageURLbuilder"]').prop('checked', true);
			 $('input[id="AuxImageURLbuilder"]').prop('checked', true);
			 $('input[id="DeepURLbuilder"]').prop('checked', true);
			//==========================================================second column 
			 $('input[class="encoding"]').prop('checked', false);
			 $('input[class="feedstructure"]').prop('checked', false);
			 $('input[class="articlenumber"]').prop('checked', false);
			 $('input[class="productname"]').prop('checked', false);
			 $('input[class="maincategory"]').prop('checked', false);
			 $('input[class="subcategory"]').prop('checked', false);
			 $('input[class="2ndsubcategory"]').prop('checked', false);
			 $('input[class="gender"]').prop('checked', false);
			 $('input[class="color"]').prop('checked', false);
			 $('input[class="brand"]').prop('checked', false);
			 $('input[class="material"]').prop('checked', false);
			 $('input[class="description"]').prop('checked', false);
			 $('input[class="price"]').prop('checked', false);
			 $('input[class="oldprice"]').prop('checked', false);
			 $('input[class="pricesStartFrom"]').prop('checked', false);
			 $('input[class="energylabel"]').prop('checked', false);
			 $('input[class="pricePerUnit"]').prop('checked', false);
			 $('input[class="shippingcosts"]').prop('checked', false);
			 $('input[class="shippingtime"]').prop('checked', false);
			 $('input[class="size"]').prop('checked', false);
			 $('input[class="filters"]').prop('checked', false);
			 $('input[class="ImageURL"]').prop('checked', false);
			 $('input[class="AuxImageURL"]').prop('checked', false);
			 $('input[class="DeepURL"]').prop('checked', false);
			 //==========================================================third column
			 $("#selectArticlenumber").val("yes");
			 $("#selectProductname").val("yes");
			 $("#selectMaincategory").val("yes");
			 $("#selectSubcategory").val("yes");
			 $("#select2ndsubcategory").val("yes");
			 $("#selectGender").val("yes");
			 $("#selectColor").val("yes");
			 $("#selectBrand").val("yes");
			 $("#selectMaterial").val("yes");
			 $("#selectDescription").val("yes");
			 $("#selectPrice").val("yes");
			 $("#selectOldprice").val("yes");
			 $("#selectPricesStartFrom").val("yes");
			 $("#selectEnergylabel").val("yes");
			 $("#selectPricePerUnit").val("yes");
			 $("#selectShippingcosts").val("yes");
			 $("#selectShippingtime").val("yes");
			 $("#selectSize").val("yes");
			 $("#selectFilters").val("yes");
			 $("#selectImageURL").val("yes");
			 $("#selectAuxImageURL").val("yes");
			 $("#selectDeepURL").val("yes");
}
$(document).ready(function() {   
	    $('#hide').click(function() {
			 $("#my_form").slideToggle("slow");
			 $("#my_inputs").fadeOut("slow");
			 $("#my_inputs2").fadeOut("slow");
			 $("#my_inputs3").fadeOut("slow");
			 });
		/*	 
		$('#hidePreview').click(function() {
			mycrossSign();
			 $("#contents").slideToggle("slow");
			 $(".ui-resizable-handle").slideToggle("slow");
			 });
		
		*/
		$('#hidePreview').click(function() {
			mycrossSign();
			var tableLength = document.getElementById('FeedTable').rows[0].cells.length;
			var maxLines =  document.getElementById('FeedTable').rows.length;
			var value = document.getElementById('FeedTable').rows[0].innerHTML;
			maxLines += -1;
			var writelocation = document.getElementById("clusterizeHeader");
			writelocation.innerHTML = "";
			var TableHeaderRow = document.createElement("TR");
			var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML = "Line"
				TableHeaderRow.appendChild(TableWindowHeaderValue);
			for (var i = 0; i < tableLength; i++) {
				var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML = document.getElementById('FeedTable').rows[0].cells[i].innerHTML
				TableHeaderRow.appendChild(TableWindowHeaderValue);
			}
				
			writelocation.appendChild(TableHeaderRow);
			
			var data = [];
			for (var i = 1; i <= maxLines; i++) {
			var value = document.getElementById('FeedTable').rows[i].innerHTML;
			data.push('<tr>'+'<td>'+i+'</td>'+value+'</tr>');
			}
			
			var clusterize = new Clusterize({
			rows: data,
			scrollId: 'scrollArea',
			contentId: 'contentArea'
			}),
			dataToggle = false;
			
			
			
			numberClick();
			});
			 
		$('#callCostum').click(function() {
			 $("#my_inputs2").fadeOut();
			 $("#my_inputs3").fadeOut();
			 $("#my_inputs").slideToggle("slow");
			 });
		$('#callCostum2').click(function() {
			 $("#my_inputs").fadeOut();
			 $("#my_inputs3").fadeOut();
			 $("#my_inputs2").slideToggle("slow");
			 });	 
		$('#callCostum3').click(function() {
			 $("#my_inputs2").fadeOut();
			 $("#my_inputs").fadeOut();
			 $("#my_inputs3").slideToggle("slow");
			 });
		
		$('#callModal').click(function() {
			mycrossSign();
			 $(".modal").fadeIn();
			 $(".modal_main").show();
			 checkedKey = true;
			 });
		
		$('.closer').click(function() {
			 $(".modal").fadeOut();
			 $(".modal_main").fadeOut();
			 checkedKey = false;
			 });
		
		$('.closer2').click(function() {
			 $(".response").fadeOut();
			 $(".responseBox").fadeOut();
			 $(".modal").fadeOut();
			 $(".modal_main").fadeOut();
			 checkedKey = false;
			 });
		$('#Jira').click(function() {
			 //$(".response").fadeIn();
			 //$(".responseBox").show();
			 generateSuggestions();
			 openPopUp();
			 });
		$('#close').click(function() {
			 document.getElementById("suggestions").innerHTML == "";
			 $(".response").fadeOut();
			 $(".responseBox").fadeOut();
			 });
		$('#MappingClose').click(function() {
			 $("#MappingWrapper").fadeToggle("slow");
			 });
		$('.buttonToolwrapper').click(function() {
			 $("#quicklinkswrapper").fadeToggle("slow");
			 });
		
    });
	
	
	$(document).ready(function() {   
	    $('#resetTemplateFunction').click(function() {
			//==========================================================first column
			 $('input[id="encodingfeedbuilder"]').prop('checked', true);
			 $('input[id="feedstructurebuilder"]').prop('checked', true);
			 $('input[id="articlenumberbuilder"]').prop('checked', true);
			 $('input[id="productnamebuilder"]').prop('checked', true);
			 $('input[id="maincategorybuilder"]').prop('checked', true);
			 $('input[id="subcategorybuilder"]').prop('checked', true);
			 $('input[id="2ndsubcategorybuilder"]').prop('checked', true);
			 $('input[id="genderbuilder"]').prop('checked', true);
			 $('input[id="colorbuilder"]').prop('checked', true);
			 $('input[id="brandbuilder"]').prop('checked', true);
			 $('input[id="materialbuilder"]').prop('checked', true);
			 $('input[id="descriptionbuilder"]').prop('checked', true);
			 $('input[id="pricebuilder"]').prop('checked', true);
			 $('input[id="oldpricebuilder"]').prop('checked', true);
			 $('input[id="pricesStartFrombuilder"]').prop('checked', true);
			 $('input[id="energylabelbuilder"]').prop('checked', true);
			 $('input[id="pricePerUnitbuilder"]').prop('checked', true);
			 $('input[id="shippingcostsbuilder"]').prop('checked', true);
			 $('input[id="shippingtimebuilder"]').prop('checked', true);
			 $('input[id="sizebuilder"]').prop('checked', true);
			 $('input[id="filtersbuilder"]').prop('checked', true);
			 $('input[id="ImageURLbuilder"]').prop('checked', true);
			 $('input[id="AuxImageURLbuilder"]').prop('checked', true);
			 $('input[id="DeepURLbuilder"]').prop('checked', true);
			//==========================================================second column 
			 $('input[class="encoding"]').prop('checked', false);
			 $('input[class="feedstructure"]').prop('checked', false);
			 $('input[class="articlenumber"]').prop('checked', false);
			 $('input[class="productname"]').prop('checked', false);
			 $('input[class="maincategory"]').prop('checked', false);
			 $('input[class="subcategory"]').prop('checked', false);
			 $('input[class="2ndsubcategory"]').prop('checked', false);
			 $('input[class="gender"]').prop('checked', false);
			 $('input[class="color"]').prop('checked', false);
			 $('input[class="brand"]').prop('checked', false);
			 $('input[class="material"]').prop('checked', false);
			 $('input[class="description"]').prop('checked', false);
			 $('input[class="price"]').prop('checked', false);
			 $('input[class="oldprice"]').prop('checked', false);
			 $('input[class="pricesStartFrom"]').prop('checked', false);
			 $('input[class="energylabel"]').prop('checked', false);
			 $('input[class="pricePerUnit"]').prop('checked', false);
			 $('input[class="shippingcosts"]').prop('checked', false);
			 $('input[class="shippingtime"]').prop('checked', false);
			 $('input[class="size"]').prop('checked', false);
			 $('input[class="filters"]').prop('checked', false);
			 $('input[class="ImageURL"]').prop('checked', false);
			 $('input[class="AuxImageURL"]').prop('checked', false);
			 $('input[class="DeepURL"]').prop('checked', false);
			 //==========================================================third column
			 $("#selectArticlenumber").val("yes");
			 $("#selectProductname").val("yes");
			 $("#selectMaincategory").val("yes");
			 $("#selectSubcategory").val("yes");
			 $("#select2ndsubcategory").val("yes");
			 $("#selectGender").val("yes");
			 $("#selectColor").val("yes");
			 $("#selectBrand").val("yes");
			 $("#selectMaterial").val("yes");
			 $("#selectDescription").val("yes");
			 $("#selectPrice").val("yes");
			 $("#selectOldprice").val("yes");
			 $("#selectPricesStartFrom").val("yes");
			 $("#selectEnergylabel").val("yes");
			 $("#selectPricePerUnit").val("yes");
			 $("#selectShippingcosts").val("yes");
			 $("#selectShippingtime").val("yes");
			 $("#selectSize").val("yes");
			 $("#selectFilters").val("yes");
			 $("#selectImageURL").val("yes");
			 $("#selectAuxImageURL").val("yes");
			 $("#selectDeepURL").val("yes");
			 
			 });
	});


	var schalter = false;
	
		$(document).ready(function() {
		$(".schalter").click(function(){
				if($(".switch").css("left")=="0px"){
					$(".switch").animate({
						right:"0px",
						left:"40px"
						},150);
				$(".schalter").animate({
					backgroundColor: "#289ea2"
					},150);
					schalter = false;
					
					} 
				else {$(".switch").animate({
						left:"0px",
						right:"50px"
						},150);
					$(".schalter").animate({
						backgroundColor:"#e83062"
						},150);
					schalter = true;
					
					}
			});
		});
		/*======================================================================
		*
		*functions after Ajax Call
		*=======================================================================
		*/
		$(document).ajaxStop(function() {
			
			$('#loading2').show();
			
			
			$(document).ready(function() {
					mycrossSign();
					ValidatePreview();
					setMapping();
					
			});
			
			
			
			$(document).ready(function() {
				$('#loading2').hide();
				
			});

		});

		
		$(document).ready(function() {

			$('#submit1').click(function() {

				var input1 = document.getElementById('feedURL').value;
				input1 = input1.trim();
				clearAllArrays();
				
				if($(".switch").css("left")=="0px"){
					$.ajax({
						type: "POST",
						url: "feedcheckerCSV.php",
						data: {feedURL: input1},
						success: function(data) {				
						 $("#contents2").html(data);
						 },
					 error: function(){
						 // will fire when timeout is reached
						 $("#contents2").html("<h1>connection to the server failed!</h1>");
						 },
						 timeout: 120000
						 });
				}else{
					$.ajax({
						type: "POST",
						url: "feedcheckerCSV.php",
						data: {feedURL: input1},
						success: function(data) {				
						 $("#contents").html(data);
						 },
					 error: function(){
						 // will fire when timeout is reached
						 $("#contents").html("<h1>connection to the server failed!!</h1>");
						 },
						 timeout: 120000
						 });
					
				}
			});
		
		});
		
		$(document).ready(function() {
		
		
        $('#submit2').click(function() {
			if($(".switch").css("left")=="0px"){
				var input1 = document.getElementById('feedURL').value;
				input1 = input1.trim();
				clearAllArrays();
				
				console.log(input1);
				$.ajax({
					type: "POST",
					url: "feedcheckerXML.php",
					data: {feedURL: input1},
					success: function(data) {
				  					 $("#contents2").html(data);
									 },
									 error: function(){
										 // will fire when timeout is reached
										 $("#contents2").html("<h1>connection to the server failed!!</h1>");
									},
									timeout: 120000
					});			
			}else{
				var input1 = document.getElementById('feedURL').value;
				clearAllArrays();
				console.log(input1);
				$.ajax({
					type: "POST",
					url: "feedcheckerXML.php",
					data: {feedURL: input1},
					success: function(data) {
				  					 $("#contents").html(data);
									 },
									 error: function(){
										 // will fire when timeout is reached
										 $("#contents").html("<h1>connection to the server failed!!</h1>");
									},
									timeout: 120000
					});			
				
				
			}
       });
	
	  });

	
	
	
	
	
	
	$(document).ready(function() {
		
       $('#submit3').click(function() {
		 
		 if($(".switch").css("left")=="0px"){ 
		   
		   var input1 = document.getElementById('feedURL').value;
		   input1 = input1.trim();
		   var input2 = document.getElementById('parentnode').value;
		   input2 = input2.trim();
		   var input3 = document.getElementById('itemnode').value;
		   input3 = input3.trim();
		   clearAllArrays();
		   
		   console.log(input1);
		   console.log(input2);
		   console.log(input3);
          $.ajax({
             type: "POST",
             url: "feedcheckerXML2.php",
             data: { feedURL: input1, parentnode: input2, itemnode: input3 },
			 dataType: "text",
             success: function(data) {
				 $("#contents2").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			 $("#contents2").html("<h1>connection to the server failed!!</h1>");
			},
			timeout: 120000
          });
		 }else{    
		   var input1 = document.getElementById('feedURL').value;
		   input1 = input1.trim();
		   var input2 = document.getElementById('parentnode').value;
		   input2 = input2.trim();
		   var input3 = document.getElementById('itemnode').value;
		   input3 = input3.trim();
		   clearAllArrays();
		   
		   console.log(input1);
		   console.log(input2);
		   console.log(input3);
          $.ajax({
             type: "POST",
             url: "feedcheckerXML2.php",
             data: { feedURL: input1, parentnode: input2, itemnode: input3 },
			 dataType: "text",
             success: function(data) {
				 $("#contents").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			 $("#contents").html("<h1>connection to the server failed!!</h1>");
			},
			timeout: 120000
          });			
				
				
			}
       });
	
	  });   
	
	$(document).ready(function() {
		
	
       $('#submit4').click(function() {
		   clearAllArrays();

		 if($(".switch").css("left")=="0px"){  
		   var input1 = document.getElementById('feedURL').value;
		   input1 = input1.trim();
		   var input2 = document.getElementById('parentnode').value;
		   input2 = input2.trim();
		   var input3 = document.getElementById('itemnode').value;
		   input3 = input3.trim();
		   console.log(input1);
		   console.log(input2);
		   console.log(input3);
          $.ajax({
             type: "POST",
             url: "feedcheckerXML3.php",
             data: { feedURL: input1, parentnode: input2, itemnode: input3 },
			 dataType: "text",
             success: function(data) {
				 $("#contents2").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			 $("#contents2").html("<h1>connection to the server failed!!</h1>");
			},
			timeout: 120000
          });
		}else{  	  
		   var input1 = document.getElementById('feedURL').value;
		   input1 = input1.trim();
		   var input2 = document.getElementById('parentnode').value;
		   input2 = input2.trim();
		   var input3 = document.getElementById('itemnode').value;
		   input3 = input3.trim();
		   console.log(input1);
		   console.log(input2);
		   console.log(input3);
          $.ajax({
             type: "POST",
             url: "feedcheckerXML3.php",
             data: { feedURL: input1, parentnode: input2, itemnode: input3 },
			 dataType: "text",
             success: function(data) {
				 $("#contents").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			 $("#contents").html("<h1>connection to the server failed!!</h1>");
			},
			timeout: 120000
			});			
				
				
			}
       });
	
	  });   

	
	$(document).ready(function() {
		
		
       $('#submit5').click(function() {
		   clearAllArrays();

		  if($(".switch").css("left")=="0px"){  
		   var input1 = document.getElementById('feedURL').value;
		   var input2 = document.getElementById('delimiter').value;
		   var input3 = document.getElementById('charset').value;
		   var input4 = document.getElementById('enclosure').value;
		   console.log(input1);
		   console.log(input2);
		   console.log(input3);
		   console.log(input4);
          $.ajax({
             type: "POST",
             url: "feedcheckerCSV2.php",
             data: { feedURL: input1, delimiter: input2, charset: input3, enclosure: input4 },
			 dataType: "text",
             success: function(data) {
				 $("#contents2").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			$("#contents2").html("<h1>connection to the server failed!!</h1>");
			},
			timeout: 120000
          });
		 }else{   
		   var input1 = document.getElementById('feedURL').value;
		   var input2 = document.getElementById('delimiter').value;
		   var input3 = document.getElementById('charset').value;
		   var input4 = document.getElementById('enclosure').value;
		   console.log(input1);
		   console.log(input2);
		   console.log(input3);
		   console.log(input4);
          $.ajax({
             type: "POST",
             url: "feedcheckerCSV2.php",
             data: { feedURL: input1, delimiter: input2, charset: input3, enclosure: input4 },
			 dataType: "text",
             success: function(data) {
				 $("#contents").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			$("#contents").html("<h1>connection to the server failed!!</h1>");
			},
			timeout: 120000
          });
		 }


       });
	
	});
/*	==============================================doesn't work, need to review======
	$(document).ready(function() {
		
		
       $('#submit6').click(function() {
		   var fileData = $('#uploadFile')[0].files;
		   var formData = new FormData();
		   formData.append('file', fileData);
		   console.log(formData);
		    console.log(fileData);
          $.ajax({
             type: "POST",
			 method: 'POST',
             url: "feedcheckerUploadCSV.php",
             data: formData,
			 processData: false,  
			 contentType: false,  
             success: function(data) {
				 $("#contents").html(data);
             },
			 error: function(){
			// will fire when timeout is reached
			},
			timeout: 30000
          });


       });
	
	});
*/	
	$(document).ready(function (e) {
	$("#uploadfile").on('submit',(function(e) {
		clearAllArrays();
		var uploadCheck = document.getElementById("uploadFormat").value;
		console.log(uploadCheck);
		if (uploadCheck == "csv"){
		 console.log("upload CSV");
		 if($(".switch").css("left")=="0px"){
		
		e.preventDefault();
		$.ajax({url: "upload.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
				{	
				$("#contents2").html(data);
				}
			  });
		}else{  	
		e.preventDefault();
		$.ajax({url: "upload.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
				{	
				$("#contents").html(data);
				}
			  });
		
		}
		}else{
		 console.log("upload XML");
		 
		e.preventDefault();
		$.ajax({url: "XMLUpload.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
				{	
				$("#contents").html(data);
				}
			  });
		
		
		}
		
		
		}));
	
	});
	
	$(document).ajaxStart(function(){
		$('#loading').show();
		}).ajaxStop(function(){
		$('#loading').hide();
	});
	
	
	
	
	/*
	$(document).ready(function() {
	window.onload = function(){
		document.querySelectorAll("INPUT[type='radio']").forEach(function(rd){rd.addEventListener("mousedown",
	function(){
		if (this.checked) {this.onclick=function(){this.checked=false}} else{this.onclick=null}
		})})
		};
	});
	*/
	

	function mycrossSign() {
			$("#my_inputs").fadeOut("slow");
			 $("#my_inputs2").fadeOut("slow");
			 $("#my_inputs3").fadeOut("slow");
			var crossSign = document.querySelector("#crossSign");
			crossSign.classList.toggle("change");
			/*var crossSignIMG = document.querySelector(".bar1");
			crossSignIMG.classList.toggle("change");*/
			var backgroundmenu = document.querySelector(".backgroundmenu");
			//backgroundmenu.classList.toggle("change");
			if($('.backgroundmenu').hasClass('change') ){
				$(".containermenu").fadeOut("fast");
				$('.backgroundmenu').fadeOut("fast");
				$('.backgroundmenu').removeClass('change');
			}else{
				$('.backgroundmenu').fadeIn("fast");
				$(".containermenu").fadeIn("fast");
				$('.backgroundmenu').addClass('change');
			}

			

			
			
		}
		
	function toolSign() {
			var toolSign = document.querySelector("#toolSign");
			toolSign.classList.toggle("change");

			
			
			
		}
	
	
	
	var allNames = ["SKU","Name","Price","Description","Image","DeepURL","Top_Category","Category","Category_2","Old_Price","Base_Price","Gender","Brand","Sizes","Color","CPC","Material","ShippingCost","DeliveryTime","AuxImage","EnergyLabel","mCPC","GTIN"];
	var allNamesLength = allNames.length;
	var MappingArray = [];
	var HeaderArray = [];
	var NewMappingArray = [];
	var percentArray = [];
	var duplicatesArray = [];
	var duplicatesPercentArray = [];
	var emptyCellsArray= [];
	var DuplicateImageSamplesArray = [];
	var DuplicateDeepLinkSamplesArray = [];
	
	var validateNew = false;
	
	function ValidatePreview() {
				
		if (document.getElementById('FeedTable') != undefined ){
			var maxtableColumns =  document.getElementById('FeedTable').rows[0].cells.length;
			var tableLines = document.getElementById('FeedTable').rows.length;
		}else{
			var urlRegex = /\b(?:(?:https?|ftp|file):\/\/\/?|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/;
			if (document.getElementById('feedURL').value.length == 0 || !document.getElementById('feedURL').value.match(urlRegex) ){
				INTERRUPTED(1);
			}else{
				INTERRUPTED(2);
			}
			
		}
		/*==============================================================================================
		 RegEx Section
		*==============================================================================================*/
	
		var skuAliases = /^sku|^offer[\s\_\-]*id|art[\s\_\-]*num[mb]er|produ[ck]t[\s\_\-]*id|arti[kc][el][el]\s*nu?m?[mb]?e?r|^id|^aid|^référence[\s\_\-]*de[\s\_\-]*l\'article|^numéro[\s\_\-]*article|^idproduit$|^identifiant[\s\_\-]*unique|^code[\s\_\-]*article$|^numero[\s\_\-]*articolo|^numero[\s\_\-]*prodotto|^id[\s\_\-]*prodotto|^id[\s\_\-]*articolo|^codice[\s\_\-]*articolo|^codice[\s\_\-]*prodotto|^número[\s\_\-]*de[\s\_\-]*artículo|^identificador|^nome$|^codigo$|^tuotenumero|^numer[\s\_\-]*produktu|^číslo[\s\_\-]*produktu|^gyártási[\s\_\-]*szám|^item\_*id$|^číslo[\s\_\-]*produktu/;
		var productnameAliases = /produ[ck]t\_*\s*name|art\_*name|artikel\s*name|^name$|^tit[el][el]|^produ[ck]t\-name|^produktbezeichnung|^désignation|^nom[\s\_\-]*d[u|e][\s\_\-]*produit|^titre$|^nome[\s\_\-]*d?e?l?[\s\_\-]*prodotto|^nome[\s\_\-]*articolo|^titolo$|^nombre|^nombre[\s\_\-]*del[\s\_\-]*producto|^título$|^nome[\s\_\-]*do[\s\_\-]*produto|^tuotenimi|^produ[ck]tna[am][nm]|^nazwa[\s\_\-]*produktu|^meno[\s\_\-]*produktu|^názov$|^meno$|^termék[\s\_\-]*név|^jméno[\s\_\-]*produktu/;
		var priceAliases = /price[\s\_\-]*vat|^price|^preis|^search[\s\_\-]*price|^prix$|^prix[\s\_\-]*TTC$|^prezzo$|^precio$|^precio[\s\_\-]*rebajado|^preço$|^preco[\s\_\-]*por|^hinta$|^prij?s$|^cena$|^cena[\s\_\-]*dph$|^ár$/;
		var descriptionAliases = /^description|^beschreibung|^produkt[\s\_\-]*beschreibung|^i?t?e?m?[\s\_\-]*product[\s\_\-]*description|^desc$|long[\s\_\-]*description|^description[\s\_\-]*du[\s\_\-]*produit|^descrizione|^descripción|^descrição|^tuotekuvaus|^kuvaus|^beskrivning|^produktbeskrivning|^omschrijving|^opis$|^opis[\s\_\-]*produktu|^popis[\s\_\-]*produktu|^leírás$|^popis$/;
		var imageURLAliases = /^bild|^ima?ge?n?|^item[\s\_\-]*image|^product[\s\_\-]*image[\s\_\-]*url|^picture[\s\_\-]*url|^item[\s\_\-]*bild|^link[\s\_\-]*produktbild|merchant[\s\_\-]*image[\s\_\-]*url|^product[\s\_\-]*images?|^URL[\s\_\-]*de[\s\_\-]*l\'image|^immagine$|^url[\s\_\-]*immagine|^immagine[\s\_\-]*url|^imagem$|^kuvalinkki$|^linki?[\s\_\-]*do[\s\_\-]*zdjęć|^obrázok$|^fotka[\s\_\-]*url|^link[\s\_\-]*produktu|^kép[\s\_\-]*url$|^url[\s\_\-]*obrázku$/;		
		var deepURLAliases = /^deep|^link|^url|^product\-*producturl|^item\-*deepurl|^produ[ck]t\-*url|^aw[\s\_\-]*deep[\s\_\-]*link|^lien[\s\_\-]*produit|^lien[\s\_\-]*profond|^url[\s\_\-]*produit|^url[\s\_\-]*profonde|^url[\s\_\-]*de[\s\_\-]*redirection|^url[\s\_\-]*article|^url[\s\_\-]*prodotto|^url[\s\_\-]*articolo|^url[\s\_\-]*del[\s\_\-]*producto|^tuotelinkki|^syvälinkki|^link[\s\_\-]*do[\s\_\-]*strony|^produktovéurl/;	
		var top_CategoryAliases = /^hauptkategorie|^top\_*category|^product\-*t?d?categoryname|^m?a?i?n?\_*[ck]ategor[iy]e?$|^item\-*hauptkategorie|^google\_product\_category|^categorytext|^shop\_*cat|category[\s\_\-]*path|^product[\s\_\-]*category|^categories$|^catégorie[\s\_\-]*principale|^top[\s\_\-]*catégorie|^categor[i|í]a[\s\_\-]*principale?|^categor[i|í]a$|^top[\s\_\-]*categor[i|í]a|^pääkategoria|^huvudkategori|^kategori$|^główna[\s\_\-]*kategoria|^obchod[\s\_\-]*kategória|^kategória[\s\_\-]*meno|^hlavná[\s\_\-]*kategória|^kategórie$|^názov[\s\_\-]*kategórie[\s\_\-]*produktu|^ová[\s\_\-]*[c|k]ategória|^főkategória|^hlavní[\s\_\-]*kategorie/;
		var categoryAliases = /^1?\.?\s*unterkategorie|^item[\s\_\-]*unterkategorie|^sub[\s\_\-]*categor[y|i]e?s?|^product[\s\_\-]*type|^merchant[\s\_\-]*category|^sous[\s\_\-]*catégorie|^sub[\s\_\-]*categor[i|í]a|^sottocategoria|^alakategoria|^subkategori|^pod[\s\_\-]*kateg[o|ó]ri[a|e]|^alkategória/;
		var category_2Aliases = /^unterkategorie[\s\_\-]*2|^category[\s\_\-]*2|^2\.*t?e?[\s\_\-]*unterkategorie|sub[\s\_\-]*sub[\s\_\-]*categor[yi]e?s?|^seconde[\s\_\-]*sous[\s\_\-]*catégorie|^sous[\s\_\-]*catégorie[\s\_\-]*2|^seconda[\s\_\-]*sottocategoria|^2a[\s\_\-]*sottocategoria|^2a[\s\_\-]*sub[\s\_\-]*categoria|^seconda[\s\_\-]*sub[\s\_\-]*categoria|^2d?a[\s\_\-]*sub[\s\_\-]*categor[i|í]a|^segunda[\s\_\-]*sub[\s\_\-]*categoría|^2\.[\s\_\-]*alakategoria|^sub[\s\_\-]*sub[\s\_\-]*kategori|^2a[\s\_\-]*sub[\s\_\-]*kategori|^druga[\s\_\-]*podkategoria|^pod[\s\_\-]*pod[\s\_\-]*kategória|^druhá[\s\_\-]*podkategória|^2[\s\_\-]*podkategória|^második[\s\_\-]*alkategória|^2\.[\s\_\-]*pod[\s\_\-]*kategorie/;
		var old_PriceAliases = /alter[\s\_\-]*preis|old[\s\_\-]*price|previous[\s\_\-]*price|price[\s\_\-]*old|preis[\s\_\-]*alt|streich[\s\_\-]*preis|^sale[\s\_\-]*price|^ancien[\s\_\-]*prix$|^prezzo[\s\_\-]*vecchio|^prezzo[\s\_\-]*intero|^precio[\s\_\-]*antiguo|^preço[\s\_\-]*antigo|^preco[\s\_\-]*de|^vanha[\s\_\-]*hinta|^alkuperäinen[\s\_\-]*hinta|^ursprungligt[\s\_\-]*pris|^tidigare[\s\_\-]*pris|^ordinarie[\s\_\-]*pris|^ord\.[\s\_\-]*pris|^oude[\s\_\-]*prijs|^poprzednia[\s\_\-]*cena|^star[a|á][\s\_\-]*cena|^cena[\s\_\-]*star[a|á]|^régi[\s\_\-]*ár|^cena[\s\_\-]*před[\s\_\-]*slevou/;
		var base_PriceAliases = /grundpreis|base\_*price|^ppu$|price[\s\_\-]*per[\s\_\-]*unit|^prix[\s\_\-]*à[\s\_\-]*l'unité|^prezzo[\s\_\-]*al[\s\_\-]*pezzo|^prezzo[\s\_\-]*per[\s\_\-]*unità|^prezzo[\s\_\-]*base|^precio[\s\_\-]*por[\s\_\-]*unidad|^yksikköhinta|^enhetspris|^prijs[\s\_\-]*per[\s\_\-]*eenheid|^cena[\s\_\-]*jednostkowa|^cena[\s\_\-]*za[\s\_\-]*kus|^egységár|^cena[\s\_\-]*jednotky/;
		var genderAliases = /geschlecht|gender|^sex|^item\-*geschlecht|^gene?re$|^sexe&|^g[é|ê]nero|^sukupuoli|^kön$|^geslacht|^płeć&|^rodzaj$|^pohlavie$|^nem$|^pohlaví/;	
		var brandAliases = /marke|^brand$|manufacturer|^brand[\s\_\-]*name|^product[\s\_\-]*brand|^hersteller|^supplier|^marque|^fabricant|^nom[\s\_\-]*de[\s\_\-]*la[\s\_\-]*marque|^m[á]r[c|k]a|^marchio|^nome[\s\_\-]*marca|^marca|^fabricante|^tuotemerkki|^märke$|^varumärke|^merk$|^značka/;
		var sizeAliases = /^größen?|^sizes?|^ma\ße|^item[\s\_\-]*groessen?|^groe?ssen?|^abmessunge?n?|clothing[\s\_\-\:]*size|fashion[\s\_\-\:]*size|^dimensione?s?$|availablesizes?|^tailles?$|^taglia|^misura|^talla|^tamaño|^tamanhos|^koko$|^koot$|^storlek|^maat$|^rozmiar|^veľkosť|^méret|^velikosti/;
		var colorAliases = /^farbe|^colou?re?$|^item\-*farbe|^couleur|^cor$|^väri$|^färg$|^kleur$|^kolor|^farba|^szín|^barva/;			
		var cpcAliases = /^cpc$|^de?s?k?t?o?p?[\s\_\-]*cpc$|cpc[\s\_\-]*de?s?k?t?o?p?|^dc$/;
		var materialAliases = /^materiaa?le?|fashion[\s\_\-\:]*material|clothing[\s\_\-\:]*material|^matériaux|^matériel|^matière|^materiaali|^materi[á][l|ł]|^anyag/;
		var shippingcostAliases = /versandk[o|s][s|o]ten|^shipping$|shipping[\s\_\-]*costs?|^shipping[\s\_\-]*price|^shipping[\s\_\-]*delay|^de?li?ve?r?y?[\s\_\-]*costs?|^product[\s\_\-]*shippingcost|versand[\s\_\-]*konditionen|^item\-*versandkosten|^versand$|^conditions[\s\_\-]*de[\s\_\-]*livraison|^frais[\s\_\-]*de[\s\_\-]*port|^costi[\s\_\-]*di[\s\_\-]*spedizione|^spese[\s\_\-]*di[\s\_\-]*spedizione|^spese[\s\_\-]*di[\s\_\-]*consegna|^costi[\s\_\-]*di[\s\_\-]*consegna|^gastos[\s\_\-]*de[\s\_\-]*envío|^costos[\s\_\-]*de[\s\_\-]*envío|^custo[\s\_\-]*de[\s\_\-]*entrega|^custos[\s\_\-]*de[\s\_\-]*envio|^toimituskulut|^leveranskostnader|^leverans$|^fraktkostnader|^verzend[\s\_\-]*kosten|^koszty[\s\_\-]*wysyłki|^cena[\s\_\-]*poštovného|^szállítási[\s\_\-]*költség/;
		var deliverytimeAliases = /de?li?ve?r?y?[\s\_\-]*time|liefer[\s\_\-]*zeit|^product\-*deliverytime|^item\-*lieferzeit|de?li?ve?r?y?[\s\_\-]*date|de?li?ve?r?y?[\s\_\-]*period|shipping[\s\_\-]*time|^délais?[\s\_\-]*de[\s\_\-]*livraison|^disponibilité$|^temp[i|o][\s\_\-]*di[\s\_\-]*spedizione|^tempi[\s\_\-]*di[\s\_\-]*consegna|^tiempo[\s\_\-]*de[\s\_\-]*envío|^tiempo[\s\_\-]*de[\s\_\-]*entrega|^prazo[\s\_\-]*de[\s\_\-]*entrega|^toimitusaika|^leveranstid|^levertijd|^czas[\s\_\-]*wysyłki|^czas[\s\_\-]*realizacji|^czas[\s\_\-]*dostawy|^čas[\s\_\-]*dodania|^szállítási[\s\_\-]*idő|^doba[\s\_\-]*lhůta/;
		var auxImageAliases = /aux[\s\_\-]*bild|aux[\s\_\-]*ima?ge?|aux[\s\_\-]*url|^product\-*fields\-*imageurl\_*1|bild[\s\_\-]*url[\s\_\-]*2|^picture[\s\_\-]*url[\s\_\-]*2|^ima?ge?[\s\_\-]*url[\s\_\-]*2|^item\-*auxbild\_*2|additional[\s\_\-]*ima?ge?[\s\_\-]*link|^img[\s\_\-]*url[\s\_\-]*[1-2]|alternate[\s\_\-]*ima?ge?|ima?ge?[\s\_\-]*2|^image[\s\_\-]*auxilliaire|^aux[\s\_\-]*immagine|^immagini[\s\_\-]*supplementari|^imagen[\s\_\-]*auxiliar|^aux[\s\_\-]*kuvat?|^lisäkuvat?|^dodatkowy[\s\_\-]*link[\s\_\-]*do[\s\_\-]*zdjęć|^ďalší[\s\_\-]*obrázok[\s\_\-]*linka|^obrázok[\s\_\-]*url[\s\_\-]*2|^aux[\s\_\-]*kép[\s\_\-]*url/;
		var eekAliases = /^eek$|^eec$|energie[\s\_\-]*effizienz[\s\_\-]*klasse|energy[\s\_\-]*effici?ency[\s\_\-]*class|energ[i|y]e?[\s\_\-]*label|^label[\s\_\-]*énergie|^étiquette[\s\_\-]*énergie|^etichetta[\s\_\-]*energetica|^consumo[\s\_\-]*energetico|^etiqueta[\s\_\-]*energética|^energiamerkintä|^energimärkning|^etykieta[\s\_\-]*energetyczna|^energicky[\s\_\-]*efektívna[\s\_\-]*trieda|^energetická[\s\_\-]*trieda|^energia[\s\_\-]*címke|^energia[\s\_\-]*osztály|^energetický[\s\_\-]*štítek/;
		var mcpcAliases = /mo?b?i?l?e?[\s\_\-]*cpc$|cpc[\s\_\-]*mo?b?i?l?e?|^dc$/;
		var gtinAliases = /^gtin$|^ean$/;
		var allAliases = [skuAliases,productnameAliases,priceAliases,descriptionAliases,imageURLAliases,deepURLAliases,top_CategoryAliases,categoryAliases,category_2Aliases,old_PriceAliases,base_PriceAliases,genderAliases,brandAliases,sizeAliases,colorAliases,cpcAliases,materialAliases,shippingcostAliases,deliverytimeAliases,auxImageAliases,eekAliases,mcpcAliases,gtinAliases];
		
		var arrFalse = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
		
		var table = document.getElementById('FeedTable');
		
		function tableHeadertoLowerCase() {
			for ( var i = 0 ; i < maxtableColumns ; i++){
					x = table.rows[0].cells[i].innerHTML;
					x = x.toLowerCase();
					//console.log(x);
					table.rows[0].cells[i].innerHTML = x;
			}
			
		}
		tableHeadertoLowerCase();
		
		function removeXMLhabbits(){
			var regExStringReplacement = /item-g*:*|[Cc][Ff]\_|g:/;
			
			for ( var i = 0 ; i < maxtableColumns ; i++){
					x = table.rows[0].cells[i].innerHTML;
					x = x.replace(regExStringReplacement,"");
					//console.log(x);
					table.rows[0].cells[i].innerHTML = x;
			}			
		}
		removeXMLhabbits();
	
		/*
		document.getElementById("validateContent").innerHTML = "The Amount of Columns: "+ maxtableColumns + "<br>";
		document.getElementById("validateContent").innerHTML += "The Amount of Lines: "+ tableLines + "<br>";
		*/
		
		
		
		function preSelectionTemplateCol1True(Col1){
			/*
			*
			*- (x) erste Spalte wenn "pattern" gefunden wird + flawless bei encoding&feed structure
			- wenn mind.pattern machted dann checked + record "yes" 
			-> wenn mind. 1 wert fehlt -> partially
			-> wenn komplett voll ist -> yes
			-> wenn komplett leer ist -> no
			-> wenn spalte nicht gefunden wird, dann record existing -> NO			
			*/
			//==========================================================first column
			 /*
			 $('input[id="articlenumber"]').prop('checked', false);
			 $('input[id="productname"]').prop('checked', false);
			 $('input[id="maincategory"]').prop('checked', false);
			 $('input[id="subcategory"]').prop('checked', false);
			 $('input[id="2ndsubcategory"]').prop('checked', false);
			 $('input[id="gender"]').prop('checked', false);
			 $('input[id="color"]').prop('checked', false);
			 $('input[id="brand"]').prop('checked', false);
			 $('input[id="material"]').prop('checked', false);
			 $('input[id="description"]').prop('checked', false);
			 $('input[id="price"]').prop('checked', false);
			 $('input[id="oldprice"]').prop('checked', false);
			 $('input[id="pricesStartFrom"]').prop('checked', false);
			 $('input[id="energylabel"]').prop('checked', false);
			 $('input[id="pricePerUnit"]').prop('checked', false);
			 $('input[id="shippingcosts"]').prop('checked', false);
			 $('input[id="shippingtime"]').prop('checked', false);
			 $('input[id="size"]').prop('checked', false);
			 $('input[id="filters"]').prop('checked', false);
			 $('input[id="ImageURL"]').prop('checked', false);
			 $('input[id="AuxImageURL"]').prop('checked', false);
			 $('input[id="DeepURL"]').prop('checked', false);
			//==========================================================second column 
			 $('input[class="encoding"]').prop('checked', false);
			 $('input[class="feedstructure"]').prop('checked', false);
			 $('input[class="articlenumber"]').prop('checked', false);
			 $('input[class="productname"]').prop('checked', false);
			 $('input[class="maincategory"]').prop('checked', false);
			 $('input[class="subcategory"]').prop('checked', false);
			 $('input[class="2ndsubcategory"]').prop('checked', false);
			 $('input[class="gender"]').prop('checked', false);
			 $('input[class="color"]').prop('checked', false);
			 $('input[class="brand"]').prop('checked', false);
			 $('input[class="material"]').prop('checked', false);
			 $('input[class="description"]').prop('checked', false);
			 $('input[class="price"]').prop('checked', false);
			 $('input[class="oldprice"]').prop('checked', false);
			 $('input[class="pricesStartFrom"]').prop('checked', false);
			 $('input[class="energylabel"]').prop('checked', false);
			 $('input[class="pricePerUnit"]').prop('checked', false);
			 $('input[class="shippingcosts"]').prop('checked', false);
			 $('input[class="shippingtime"]').prop('checked', false);
			 $('input[class="size"]').prop('checked', false);
			 $('input[class="filters"]').prop('checked', false);
			 $('input[class="ImageURL"]').prop('checked', false);
			 $('input[class="AuxImageURL"]').prop('checked', false);
			 $('input[class="DeepURL"]').prop('checked', false);
			 //==========================================================third column
			 $("#selectArticlenumber").val("yes");
			 $("#selectProductname").val("yes");
			 $("#selectMaincategory").val("yes");
			 $("#selectSubcategory").val("yes");
			 $("#select2ndsubcategory").val("yes");
			 $("#selectGender").val("yes");
			 $("#selectColor").val("yes");
			 $("#selectBrand").val("yes");
			 $("#selectMaterial").val("yes");
			 $("#selectDescription").val("yes");
			 $("#selectPrice").val("yes");
			 $("#selectOldprice").val("yes");
			 $("#selectPricesStartFrom").val("yes");
			 $("#selectEnergylabel").val("yes");
			 $("#selectPricePerUnit").val("yes");
			 $("#selectShippingcosts").val("yes");
			 $("#selectShippingtime").val("yes");
			 $("#selectSize").val("yes");
			 $("#selectFilters").val("yes");
			 $("#selectImageURL").val("yes");
			 $("#selectAuxImageURL").val("yes");
			 $("#selectDeepURL").val("yes");
			 var allAliases = [skuAliases,productnameAliases,priceAliases,descriptionAliases,imageURLAliases,deepURLAliases,top_CategoryAliases,categoryAliases,category_2Aliases,old_PriceAliases,base_PriceAliases,genderAliases,brandAliases,sizeAliases,colorAliases,cpcAliases];
			*/
			
			
			
			
			
			$('input[id="encodingfeedbuilder"]').prop('checked', true);
			$("input[class=encoding][value='flawless']").prop("checked",true);
			$('input[id="feedstructurebuilder"]').prop('checked', true);
			$("input[class=feedstructure][value='flawless']").prop("checked",true);
			if ( Col1 == allNames[0]){
				$('input[id="articlenumberbuilder"]').prop('checked', true);
				$("input[class=articlenumber][value='yes']").prop("checked",true);
				arrFalse[0] = true;
			}
			if ( Col1 == allNames[1]){
				$('input[id="productnamebuilder"]').prop('checked', true);
				$("input[class=productname][value='yes']").prop("checked",true);
				arrFalse[1] = true;
			}
			if ( Col1 == allNames[2]){
				$('input[id="pricebuilder"]').prop('checked', true);
				$("input[class=price][value='yes']").prop("checked",true);
				arrFalse[2] = true;
			}
			if ( Col1 == allNames[3]){
				$('input[id="descriptionbuilder"]').prop('checked', true);
				$("input[class=description][value='yes']").prop("checked",true);
				arrFalse[3] = true;
			}
			if ( Col1 == allNames[4]){
				$('input[id="ImageURLbuilder"]').prop('checked', true);
				$("input[class=ImageURL][value='yes']").prop("checked",true);
				arrFalse[4] = true;
			}
			if ( Col1 == allNames[5]){
				$('input[id="DeepURLbuilder"]').prop('checked', true);
				$("input[class=DeepURL][value='yes']").prop("checked",true);
				arrFalse[5] = true;
			}
			if ( Col1 == allNames[6]){
				$('input[id="maincategorybuilder"]').prop('checked', true);
				$("input[class=maincategory][value='yes']").prop("checked",true);
				arrFalse[6] = true;
			}
			if ( Col1 == allNames[7]){
				$('input[id="subcategorybuilder"]').prop('checked', true);
				$("input[class=subcategory][value='yes']").prop("checked",true);
				arrFalse[7] = true;
			}
			if ( Col1 == allNames[8]){
				$('input[id="2ndsubcategorybuilder"]').prop('checked', true);
				$("input[class=2ndsubcategory][value='yes']").prop("checked",true);
				arrFalse[8] = true;
			}
			if ( Col1 == allNames[9]){
				$('input[id="oldpricebuilder"]').prop('checked', true);
				$("input[class=oldprice][value='yes']").prop("checked",true);
				arrFalse[9] = true;
			}
			if ( Col1 == allNames[10]){
				$('input[id="pricePerUnitbuilder"]').prop('checked', true);
				$("input[class=pricePerUnit][value='yes']").prop("checked",true);
				arrFalse[10] = true;
			}
			if ( Col1 == allNames[11]){
				$('input[id="genderbuilder"]').prop('checked', true);
				$("input[class=gender][value='yes']").prop("checked",true);
				arrFalse[11] = true;
			}
			if ( Col1 == allNames[12]){
				$('input[id="brandbuilder"]').prop('checked', true);
				$("input[class=brand][value='yes']").prop("checked",true);
				arrFalse[12] = true;
			}
			if ( Col1 == allNames[13]){
				$('input[id="sizebuilder"]').prop('checked', true);
				$("input[class=size][value='yes']").prop("checked",true);
				arrFalse[13] = true;
			}
			if ( Col1 == allNames[14]){
				$('input[id="colorbuilder"]').prop('checked', true);
				$("input[class=color][value='yes']").prop("checked",true);
				arrFalse[14] = true;
			}
			if ( Col1 == allNames[15]){
				// CPC Suggestions doesn't exist
				arrFalse[15] = true;
			}
			if ( Col1 == allNames[16]){
				$('input[id="materialbuilder"]').prop('checked', true);
				$("input[class=material][value='yes']").prop("checked",true);
				arrFalse[16] = true;
			}
			if ( Col1 == allNames[17]){
				$('input[id="shippingcostsbuilder"]').prop('checked', true);
				$("input[class=shippingcosts][value='yes']").prop("checked",true);
				arrFalse[17] = true;
			}
			if ( Col1 == allNames[18]){
				$('input[id="shippingtimebuilder"]').prop('checked', true);
				$("input[class=shippingtime][value='yes']").prop("checked",true);
				arrFalse[18] = true;
			}
			if ( Col1 == allNames[19]){
				$('input[id="AuxImageURLbuilder"]').prop('checked', true);
				$("input[class=AuxImageURL][value='yes']").prop("checked",true);
				arrFalse[19] = true;
			}
			if ( Col1 == allNames[20]){
				$('input[id="energylabelbuilder"]').prop('checked', true);
				$("input[class=energylabel][value='yes']").prop("checked",true);
				arrFalse[20] = true;
			}
			if ( Col1 == allNames[21]){
				// mCPC Suggestions doesn't exist
				arrFalse[21] = true;
			}
			if ( Col1 == allNames[22]){
				$('input[id="GTINbuilder"]').prop('checked', true);
				$("input[class=GTIN][value='yes']").prop("checked",true);
				arrFalse[22] = true;
			}
			
		}
		
		
		function preSelectionTemplateCol2False(arrFalse){
			if ( arrFalse[0] == false ){
				$('input[id="articlenumberbuilder"]').prop('checked', true);
				$("input[class=articlenumber][value='no']").prop("checked",true);
			}
			if ( arrFalse[1] == false ){
				$('input[id="productnamebuilder"]').prop('checked', true);
				$("input[class=productname][value='no']").prop("checked",true);
			}
			if ( arrFalse[2] == false ){
				$('input[id="pricebuilder"]').prop('checked', true);
				$("input[class=price][value='no']").prop("checked",true);
			}
			if ( arrFalse[3] == false ){
				$('input[id="descriptionbuilder"]').prop('checked', true);
				$("input[class=description][value='no']").prop("checked",true);
			}
			if ( arrFalse[4] == false ){
				$('input[id="ImageURLbuilder"]').prop('checked', true);
				$("input[class=ImageURL][value='no']").prop("checked",true);
				
			}
			if ( arrFalse[5] == false ){
				$('input[id="DeepURLbuilder"]').prop('checked', true);
				$("input[class=DeepURL][value='no']").prop("checked",true);
				
			}
			if ( arrFalse[6] == false ){
				$('input[id="maincategorybuilder"]').prop('checked', true);
				$("input[class=maincategory][value='no']").prop("checked",true);
				
			}
			if ( arrFalse[7] == false ){
				$('input[id="subcategorybuilder"]').prop('checked', true);
				$("input[class=subcategory][value='no']").prop("checked",true);
				
			}
			if ( arrFalse[8] == false ){
				$('input[id="2ndsubcategorybuilder"]').prop('checked', true);
				$("input[class=2ndsubcategory][value='no']").prop("checked",true);
			
			}
			if ( arrFalse[9] == false ){
				$('input[id="oldpricebuilder"]').prop('checked', true);
				$("input[class=oldprice][value='no']").prop("checked",true);
			
			}
			if ( arrFalse[10] == false ){
				$('input[id="pricePerUnitbuilder"]').prop('checked', true);
				$("input[class=pricePerUnit][value='no']").prop("checked",true);
			
			}
			if ( arrFalse[11] == false ){
				$('input[id="genderbuilder"]').prop('checked', true);
				$("input[class=gender][value='no']").prop("checked",true);
		
			}
			if ( arrFalse[12] == false ){
				$('input[id="brandbuilder"]').prop('checked', true);
				$("input[class=brand][value='no']").prop("checked",true);
		
			}
			if ( arrFalse[13] == false ){
				$('input[id="sizebuilder"]').prop('checked', true);
				$("input[class=size][value='no']").prop("checked",true);

			}
			if ( arrFalse[14] == false ){
				$('input[id="colorbuilder"]').prop('checked', true);
				$("input[class=color][value='no']").prop("checked",true);

			}
			if ( arrFalse[15] == false ){
				// CPC Suggestions doesn't exist
				//arrFalse[15] == false
			}
			if ( arrFalse[16] == false ){
				$('input[id="materialbuilder"]').prop('checked', true);
				$("input[class=material][value='no']").prop("checked",true);
			}
			if ( arrFalse[17] == false ){
				$('input[id="shippingcostsbuilder"]').prop('checked', true);
				$("input[class=shippingcosts][value='no']").prop("checked",true);
			}
			if ( arrFalse[18] == false ){
				$('input[id="shippingtimebuilder"]').prop('checked', true);
				$("input[class=shippingtime][value='no']").prop("checked",true);
			}
			if ( arrFalse[19] == false ){
				$('input[id="AuxImageURLbuilder"]').prop('checked', true);
				$("input[class=AuxImageURL][value='no']").prop("checked",true);
			}
			if ( arrFalse[20] == false ){
				$('input[id="energylabelbuilder"]').prop('checked', true);
				$("input[class=energylabel][value='no']").prop("checked",true);
			}
			if ( arrFalse[21] == false ){
				//mCPC
			}
			if ( arrFalse[22] == false ){
				$('input[id="GTINbuilder"]').prop('checked', true);
				$("input[class=GTIN][value='no']").prop("checked",true);
			}
			
		}
		
		
		
		
		
		function mappingArray(x,i){
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
				MappingArray[q] = i;
				}
			}
			//x.map(x => x * 2);
		}
		
		function mappingEmptyArray(x,i,countingEmptyCells){
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
				countingEmptyCells += 1;
				emptyCellsArray[q] = tableLines  - countingEmptyCells;
				}
			}
			
		}
		
		function mappingPercentArray(x,i,calc100,countingEmptyCells){
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
					
					if (calc100 == undefined){
						percentArray[q] = "100 %";
					}else{
						percentArray[q] =  calc100+" %";
					}
				}
			}
			
		}
		
		function mappingDuplicateArray(x,i,amountDuplicates){
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
					if (amountDuplicates == undefined){
						duplicatesArray[q] = " ";
					}else{
						duplicatesArray[q] =  amountDuplicates;
					}
				}
			}
			
		}
		
		function mappingDuplicatePercentArray(x,i,percent){
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
					if (duplicatesPercentArray == undefined){
						duplicatesPercentArray[q] = "-";
					}else{
						duplicatesPercentArray[q] =  percent;
					}
				}
			}
			
		}
		function mappingDuplicateImageSamplesArray(x,i,value){
			
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
					if (value == undefined){
						DuplicateImageSamplesArray.push(" ");
					}else{
						DuplicateImageSamplesArray.push(value);
					}
				}
			}
			
		}
		function mappingDuplicateDeepLinkSamplesArray(x,i,value){
			
			for (var q = 0; q <= allNames.length ; q++) {		
			if (x == allNames[q] ){
					if (value == undefined){
						DuplicateDeepLinkSamplesArray.push(" ");
					}else{
						DuplicateDeepLinkSamplesArray.push(value);
					}
				}
			}
			
		}
		/*============================================================================================================================
		==============================================================================================================================
		===================================== start to look for Column headers amd give response! ====================================
		=====================================  depending on the amount on the data ! ======================================
		==============================================================================================================================*/
	
			function validateTable(x,y){  // x = name | y = regEx | i = 
				/*
				if(validateNew == true){
						document.getElementById("validateContent").innerHTML += "<strong>mapping Check for " + x + " </strong><br>";
				}else{
						document.getElementById("validateContent").innerHTML += "<strong>Check for " + x + " </strong><br>";
				}
				*/
				var countingEmptyCells = 0;
			
			
			
				//console.log("Starting Point RegEx for Name: " + x);
				for (var i = 0; i < maxtableColumns; i++) {
					var tableCellValue = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;
					
					
					var positionI = i;
					
					
					tableCellValue = tableCellValue.replace(/\uFEFF/g,"");
					//console.log(document.getElementById('FeedTable').rows[0].cells[i]);
					//console.log(y.test(tableCellValue));
					if (y.test(tableCellValue) || validateNew == true) {
						/*
						if(validateNew == true){
						document.getElementById("validateContent").innerHTML += "take " + x + " ";
						}else{
						document.getElementById("validateContent").innerHTML += "found " + x + " ";
						}
						*/
						
						if(validateNew == true){
							
							for(var z=0; z < allNames.length; z++){
								if (x == allNames[z]){
								i = NewMappingArray[z];
								}
							}
							if(i != "nothing"){
								//document.getElementById("validateContent").innerHTML += "from HeaderColumn " + i + "<br>";
							}else{
								//document.getElementById("validateContent").innerHTML += "for no validation <br>";
								break
							}
						}else{
							//document.getElementById("validateContent").innerHTML += "in HeaderColumn " + i + "<br>";	
						}
						
						preSelectionTemplateCol1True(x);
						
						mappingArray(x,i);
						//console.log(MappingArray);

						/*============================================================================================================================
						=======================================CHECK DUPLUICATES=====================================================================		==============================================================================================================================*/
						if (x == allNames[0] || x == allNames[4] || x == allNames[5]){ // 0 = SKU ; 4 = Image ; 5 = DeepUrl
							
							var checkCellValue  = document.getElementById('FeedTable').rows[0].cells[i];
								if (checkCellValue != null){
									
									var textCell = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;
									
								}else{
									//do nothing
								}
							
							
							
							
							var tableCellArray = [];
						
							for (var j = 1; j < tableLines; j++) {
									var checkCellValue  = document.getElementById('FeedTable').rows[j].cells[i];
									if (checkCellValue != null){
										var textCell = document.getElementById('FeedTable').rows[j].cells[i].innerHTML;
										textCell = textCell.trim();
									}
									
									if(textCell.length != 0 && checkCellValue != null ){
										tableCellArray.push(textCell);
									}
							}
						
						//document.getElementById("validateContent").innerHTML += "Array is " + tableCellArray + " <br> ";
						var sorted_arr = tableCellArray.slice().sort();
						
						var results = [];
						for (var l = 0; l < sorted_arr.length - 1; l++) {
							if (sorted_arr[l + 1] == sorted_arr[l]) {
							results.push(sorted_arr[l]);
							}
						}
						var amountDuplicates = results.length;
						if (amountDuplicates > 0) {
							var percent = ' '+ Math.floor((amountDuplicates / (tableLines-1) ) * 100) + ' %';
							
							/*
							document.getElementById("validateContent").innerHTML += "found <strong class='red'> " + amountDuplicates + percent + " " + x + " Duplicates </strong><br> ";
							
							*/
						}else{
							/*
							document.getElementById("validateContent").innerHTML += "found <strong class='green'> " + amountDuplicates + " " + x + " Duplicates </strong><br> ";
							
							*/
						}
						
						mappingDuplicateArray(x,i,amountDuplicates);
						mappingDuplicatePercentArray(x,i,percent);;
						
						if ( amountDuplicates > 0 ){
							/*
							document.getElementById("validateContent").innerHTML += "Example Duplicates: <br>";
												
							var maxDuplucate = 5;
							for (var m = 0; m < maxDuplucate ; m++) {
							if ( results[m] != undefined ){
								document.getElementById("validateContent").innerHTML += " " + results[m] + "<hr> ";
								var value = results[m];
									if (x == allNames[4]){
									mappingDuplicateImageSamplesArray(x,i,value);
									}
									if (x == allNames[5]){
									mappingDuplicateDeepLinkSamplesArray(x,i,value);
									}
								}
							}
							*/
						}
						
						
						}
						/*============================================================================================================================
						=======================================CHECK DUPLUICATES ENDS ================================================================		==============================================================================================================================*/
						
						
						/*============================================================================================================================
						*                                        PROVIDE Image SAMPLES START	==============================================================================================================================*/
						if (x == allNames[4]){
							
							
							var checkCellValue  = document.getElementById('FeedTable').rows[0].cells[i];
								if (checkCellValue != null){
									
									var ImageURLCell = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;
									
								}else{
									//do nothing
								}
							
							
							
							var tableImageCellArray = [];
							/*
							document.getElementById("validateContent").innerHTML += "<strong>Image Samples: </strong><br>";
							function createImage(src) {
								var x = document.createElement("IMG");
								x.setAttribute("src", src);
								x.setAttribute("height", "100");
								x.setAttribute("width", "100");
								x.setAttribute( "title","ExampleImage");
								document.getElementById("validateContent").appendChild(x);
								
								}
							
							for (var j = 1; j < tableLines; j++) { 
								var checkCellValue  = document.getElementById('FeedTable').rows[j].cells[i];
								if (checkCellValue != null){
									
									var ImageURLCell = document.getElementById('FeedTable').rows[j].cells[i].innerHTML;
								}else{
									//do nothing
								}
							
								
								tableImageCellArray.push(ImageURLCell);
								
								
								}
							for (var j = 1; j < 11; j++) { 
								var ImageURLCell = tableImageCellArray[Math.floor(Math.random() * tableImageCellArray.length)];
								createImage(ImageURLCell);
							}
							
							
							

							document.getElementById("validateContent").innerHTML += "<br>";
						*/
						}
						/*============================================================================================================================
						*                                        PROVIDE Image SAMPLES ENDS		==============================================================================================================================*/
						
						/*============================================================================================================================
						*                                        PROVIDE DEEPURL SAMPLES START	==============================================================================================================================*/
						
						
						if (x == allNames[5]){
							/*
							var checkCellValue  = document.getElementById('FeedTable').rows[0].cells[i];
								if (checkCellValue != null){
									
									var DeepURLCell = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;
									
								}else{
									//do nothing
								}
							
							
							var tableDeepURLCellArray = [];
							document.getElementById("validateContent").innerHTML += "<strong>DeepLink Samples: </strong><br>";
				
							function createDeepLink(src) {
								if (src == undefined)
								{
									src = "empty";
									var ExampleLink = "empty"
								}else{
									var ExampleLink = "ExampleLink"
								}
									
								//console.log(src);
								var a = document.createElement("a");
								a.title = "Link";
								a.href = src;
								a.text = ExampleLink+j;
								a.target ="_blank";
								document.getElementById("validateContent").appendChild(a);
								a.setAttribute( 'title', ExampleLink);
								a.setAttribute( 'class','removeAmp');
								document.getElementById("validateContent").innerHTML += " | ";
								}
							
							for (var j = 1; j < tableLines; j++) {
								var checkCellValue  = document.getElementById('FeedTable').rows[j].cells[i];
								//console.log(checkCellValue);
								if (checkCellValue != null){
									
									var DeepURLCell = document.getElementById('FeedTable').rows[j].cells[i].innerHTML;
								}else{
									//do nothing
								}
								
								//console.log(DeepURLCell);
								tableDeepURLCellArray.push(DeepURLCell);
								
								}
							for (var j = 1; j < 21; j++) {
								var DeepURLCell = tableDeepURLCellArray[Math.floor(Math.random() * tableDeepURLCellArray.length)];
								createDeepLink(DeepURLCell);
								}
							
							
							
							document.getElementById("validateContent").innerHTML += "<br>";
							
							
							
							*/
						}
						
						/*============================================================================================================================
						*                                        PROVIDE DEEPURL SAMPLES ENDS		==============================================================================================================================*/
						
			
						for (var j = 0; j < tableLines; j++) {
							var checkCellValue = table.rows[j].cells.item(i);
						
								if (checkCellValue != null){
									var checkCellValue = table.rows[j].cells.item(i).innerHTML.length;
					
									if (checkCellValue < 1 ){
										countingEmptyCells++;
									}else{
									//do nothing
									}
							
								}else{
								countingEmptyCells++;
								}
					
						}
					
					
						mappingEmptyArray(x,i,countingEmptyCells);
						
						if (countingEmptyCells > 0 ){
							
								
							var percent = '  '+ Math.floor((countingEmptyCells / (tableLines) ) * 100) + ' %';
							
							var calc100 = Math.abs(100-((countingEmptyCells / (tableLines-1) )*100));
							
							calc100 = roundToTwo(calc100);
							/*
							document.getElementById("validateContent").innerHTML += "found <strong class='red'>" + countingEmptyCells + " " + percent +"</strong> Amount of Empty Values within the Column <br>";
							
							*/
							
						}else{
							/*
							document.getElementById("validateContent").innerHTML += "found <strong class='green'>" + countingEmptyCells + "</strong> Amount of Empty Values within the Column <br>";	
							
							*/
						}
					
						mappingPercentArray(x,i,calc100,countingEmptyCells);
					
					
					
					
					{ break; }
					}else{
				
					}
				}	
		
			}
	
		for (var k = 0; k < allAliases.length ; k++) {
			validateTable(allNames[k],allAliases[k]);
			}
		preSelectionTemplateCol2False(arrFalse);
		
		
		
		validationTableWindow();
		
		$(".removeAmp").attr('href', function(i, value) {
			return value.replace(/&amp;/g, "&");
			});
		
		
		
		//console.log(arrFalse);
		
	
		
		
		/*============================================================================================================================
		============================================================ENDS!=============================================================
		==============================================================================================================================*/
		
		
		/*============================================================================================================================
		==============================================================================================================================
		===================================== take response and set a nice layout for user =================================================================================================
		=====================================  depending on the amount on the data ! =======================================================================================================
		==============================================================================================================================*/
		function roundToTwo(calc100) {    
						return +(Math.round(calc100 + "e+2")  + "e-2");
						}
		
		function preSelectionTemplateCol3Partially(x,y,z){
			if ( x == allNames[0] && y == true && z < 100 ){
				$("#selectArticlenumber").val("partially");
				//console.log("select partially for SKU!!!");
			}
			if ( x == allNames[1] && y == true && z < 100 ){
				 $("#selectProductname").val("partially");
			}
			if ( x == allNames[2] && y == true && z < 100 ){
				$("#selectPrice").val("partially");
			}
			if ( x == allNames[3] && y == true && z < 97 ){
				$("#selectDescription").val("partially");
			}
			if ( x == allNames[4] && y == true && z < 100 ){
				$("#selectImageURL").val("partially");
				
			}
			if ( x == allNames[5] && y == true && z < 100 ){
				$("#selectDeepURL").val("partially");
				
			}
			if ( x == allNames[6] && y == true && z < 99 ){
				$("#selectMaincategory").val("partially");
				
			}
			if ( x == allNames[7] && y == true && z < 97 ){
				$("#selectSubcategory").val("partially");
				
			}
			if ( x == allNames[8] && y == true && z < 80 ){
				$("#select2ndsubcategory").val("partially");
			
			}
			if ( x == allNames[10] && y == true && z < 10 ){
				$("#selectPricePerUnit").val("partially");
			
			}
			if ( x == allNames[11] && y == true && z < 80 ){
				 $("#selectGender").val("partially");
		
			}
			if ( x == allNames[12] && y == true && z < 97 ){
				 $("#selectBrand").val("partially");
		
			}
			if ( x == allNames[13] && y == true && z < 80 ){
				$("#selectSize").val("partially");

			}
			if ( x == allNames[14] && y == true && z < 80 ){
				$("#selectColor").val("partially");

			}
			if ( x == allNames[15] && y == true && z > 0 ){
				// CPC Suggestions doesn't exist
				//arrFalse[15] = false;
			}
			if ( x == allNames[16] && y == true && z < 80 ){
				$("#selectMaterial").val("partially");
			}
			if ( x == allNames[17] && y == true && z < 100 ){
				 $("#selectShippingcosts").val("partially");
			}
			if ( x == allNames[18] && y == true && z < 100 ){
				$("#selectShippingtime").val("partially");
			}
			if ( x == allNames[22] && y == true && z < 90 ){
				$("#selectGTIN").val("partially");
			}
			if ( x == allNames[19] && y == true && z < 75 ){
				$("#selectAuxImageURL").val("partially");
			}
			if ( x == allNames[20] && y == true && z < 10 ){
				$("#selectEnergylabel").val("partially");
			}
			
		}
		
		function preSelectionTemplateCol3No(x,y,z){
			
			if ( x == allNames[0] && y == true && z == 0 ){
				$("#selectArticlenumber").val("no");
				//console.log("select no for SKU!!!");
			}
			if ( x == allNames[1] && y == true && z == 0 ){
				 $("#selectProductname").val("no");
			}
			if ( x == allNames[2] && y == true && z == 0 ){
				$("#selectPrice").val("no");
			}
			if ( x == allNames[3] && y == true && z == 0 ){
				$("#selectDescription").val("no");
			}
			if ( x == allNames[4] && y == true && z == 0 ){
				$("#selectImageURL").val("no");
				
			}
			if ( x == allNames[5] && y == true && z == 0 ){
				$("#selectDeepURL").val("no");
				
			}
			if ( x == allNames[6] && y == true && z == 0 ){
				$("#selectMaincategory").val("no");
				
			}
			if ( x == allNames[7] && y == true && z == 0 ){
				$("#selectSubcategory").val("no");
				
			}
			if ( x == allNames[8] && y == true && z == 0 ){
				$("#select2ndsubcategory").val("no");
			
			}
			if ( x == allNames[9] && y == true && z == 0 ){
				$("#selectOldprice").val("no");
			
			}
			if ( x == allNames[10] && y == true && z == 0 ){
				$("#selectPricePerUnit").val("no");
			
			}
			if ( x == allNames[11] && y == true && z == 0 ){
				 $("#selectGender").val("no");
		
			}
			if ( x == allNames[12] && y == true && z == 0 ){
				 $("#selectBrand").val("no");
		
			}
			if ( x == allNames[13] && y == true && z == 0 ){
				$("#selectSize").val("no");

			}
			if ( x == allNames[14] && y == true && z == 0 ){
				$("#selectColor").val("no");

			}
			if ( x == allNames[15] && y == true && z == 0 ){
				// CPC Suggestions doesn't exist
				//arrFalse[15] = false;
			}
			if ( x == allNames[16] && y == true && z == 0 ){
				$("#selectMaterial").val("no");
			}
			if ( x == allNames[17] && y == true && z == 0 ){
				 $("#selectShippingcosts").val("no");
			}
			if ( x == allNames[18] && y == true && z == 0 ){
				$("#selectShippingtime").val("no");
			}
			if ( x == allNames[22] && y == true && z == 0 ){
				$("#selectGTIN").val("no");
			}
			if ( x == allNames[19] && y == true && z == 0 ){
				$("#selectAuxImageURL").val("no");
			}
			if ( x == allNames[20] && y == true && z == 0 ){
				$("#selectEnergylabel").val("no");
			}
		}
		
		function preSelectionTemplateAgeGroup(x,y){
			
			if( x == allNames[11] && y != false ){
				//console.log("gender was found");
				var agegroup = /age\s*\_*group/;
				var table = document.getElementById("FeedTable");
				
				// look for attribute age group in all headers
				var HeaderAmount = table.rows[0].cells.length;
				for(var i = 0; i < HeaderAmount; i++){
					var tester = table.rows[0].cells[i].innerHTML;
						if ( agegroup.test(tester) == true ){
							//console.log("found agegroup in Column [i] !!!")
							
							//look in all Cells if you find at least one value in AgeGroup
							var RowAmount = table.rows.length;
							RowAmount = RowAmount - 1;
							
							for (var j = 1; j < RowAmount; j++) {
									var checkCellValue = table.rows[j].cells.item(i);
								
										if (checkCellValue != null){
											var checkCellValue = table.rows[j].cells.item(i).innerHTML;
											checkCellValue = checkCellValue.trim();
											
											
											if (checkCellValue.length < 1 ){
												//console.log("found not a value");
											}else{
												//console.log("found a value");
												//console.log(table.rows[j].cells.item(i).innerHTML);
												$("#selectGender").val("age group");
												break
											}
									
										}else{
											//console.log("found not a value");
										}
							}
						}
					}
			}
		}
		
		//x = AttributeName; y = state found attribute ; z = position of founding the value within the sheet ; el = empty lines for this attribute
		function preSelectionMultipleInfo(x,y,z,el){
			//allNames[2] = price ; allNames[9] = oldprice ; allNames[14] = color ; allNames[16] = material
			
			
			if( x == allNames[2] && y != false && el > 1){
				//console.log("price was found");
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
									var checkCellValue = table.rows[j].cells.item(z);
								
											if (checkCellValue != null){
											var checkCellValue = table.rows[j].cells.item(z).innerHTML;
											checkCellValue = checkCellValue.trim();
												if (checkCellValue.length < 1 ){
													//console.log("found not a value");
												}else{
													var countParameter = (checkCellValue.match(/\s*\€|[Ee][Uu][Rr]|�\s*/g) || [] ).length;
													//console.log(checkCellValue);
													//console.log(countParameter);
													if (countParameter > 0 ){
														//console.log(checkCellValue);
														$("#selectPrice").val("with currency");
														break
													}
													
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					}
			
			}
			
			if( x == allNames[9] && y != false && el > 1){
				//console.log("oldprice was found");
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
									var checkCellValue = table.rows[j].cells.item(z);
								
											if (checkCellValue != null){
											var checkCellValue = table.rows[j].cells.item(z).innerHTML;
											checkCellValue = checkCellValue.trim();
												if (checkCellValue.length < 1){
													//console.log("found not a value");
												}else{
													var countParameter = (checkCellValue.match(/\s*\€|[Ee][Uu][Rr]|�\s*/g) || [] ).length;
													//console.log(checkCellValue);
													//console.log(countParameter);
													if (countParameter > 0 ){
														//console.log(checkCellValue);
														$("#selectOldprice").val("with currency");
														break
													}
													
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					}
			
			}
			
			if( x == allNames[10] && y != false && el > 1 ){
				//console.log("baseprice was found and not empty");
				
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
									var checkCellValue = table.rows[j].cells.item(z);
								
											if (checkCellValue != null){
											var checkCellValue = table.rows[j].cells.item(z).innerHTML;
											checkCellValue = checkCellValue.trim();
												if (checkCellValue.length < 1 ){
													//console.log("found not a value");
												}else{
													var countParameter = (checkCellValue.match(/\s*\€|[Ee][Uu][Rr]|�\s*/g) || [] ).length;
													//console.log(checkCellValue);
													//console.log(countParameter);
													if (countParameter < 1 ){
														//console.log(checkCellValue);
														$("#selectPricePerUnit").val("currency missing");
														break
													}
													
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					}
			
			}
			
			if( x == allNames[14] && y != false && el > 1){
				//console.log("color was found");
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
									var checkCellValue = table.rows[j].cells.item(z);
								
											if (checkCellValue != null){
											var checkCellValue = table.rows[j].cells.item(z).innerHTML;
											checkCellValue = checkCellValue.trim();
												if (checkCellValue.length < 1 ){
												//console.log("found not a value");
												}else{
													//console.log(checkCellValue);
													//console.log(countParameter);
													var countParameter = (checkCellValue.match(/\,/g) || [] ).length;
													
													if (countParameter > 0 ){
														//console.log(checkCellValue);
														$("#selectColor").val("multiple information");
														break
													}
													
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					}
			
			}
			
			if( x == allNames[16] && y != false && el > 1){
				//console.log("material was found");
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
									var checkCellValue = table.rows[j].cells.item(z);
								
											if (checkCellValue != null){
											var checkCellValue = table.rows[j].cells.item(z).innerHTML;
											checkCellValue = checkCellValue.trim();
												if (checkCellValue.length < 1 ){
													//console.log("found not a value");
												}else{
													//console.log(checkCellValue);
													//console.log(countParameter);
													var countParameter = (checkCellValue.match(/\,/g) || [] ).length;
													var countParameterPercent = (checkCellValue.match(/\%/g) || [] ).length;
													
													if (countParameter > 0 &&  countParameterPercent < 1 ){
														//console.log(checkCellValue);
														$("#selectMaterial").val("multiple information");
														break
													}
													
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					}
					
					for (var j = 1; j < RowAmount; j++) {
						var checkCellValue = table.rows[j].cells.item(z);
											if (checkCellValue != null){
												var checkCellValue = table.rows[j].cells.item(z).innerHTML;
												checkCellValue = checkCellValue.trim();
												checkCellValue = checkCellValue.length;
												//console.log(checkCellValue);
												if (checkCellValue > 125 ){
													$("#selectMaterial").val("too precise");
													break
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					
					}
			}
			
			if( x == allNames[17] && y != false && el > 1){
				//console.log("shippingcost was found");
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
						var checkCellValue = table.rows[j].cells.item(z);
											if (checkCellValue != null){
												var checkCellValue = table.rows[j].cells.item(z).innerHTML;
												checkCellValue = checkCellValue.trim();
												checkCellValue = checkCellValue.length;
												//console.log(checkCellValue);
												if (checkCellValue > 22 ){
													$("#selectShippingcosts").val("text only");
													break
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					
					}
			}
			
			if( x == allNames[18] && y != false && el > 1){
				//console.log("shippingtime was found");
				var table = document.getElementById("FeedTable");
				var RowAmount = table.rows.length;
					
					for (var j = 1; j < RowAmount; j++) {
						var checkCellValue = table.rows[j].cells.item(z);
											if (checkCellValue != null){
												var checkCellValue = table.rows[j].cells.item(z).innerHTML;
												checkCellValue = checkCellValue.trim();
												checkCellValue = checkCellValue.length;
												//console.log(checkCellValue);
												if (checkCellValue > 20 ){
													$("#selectShippingtime").val("text only");
													break
												}
											}else{
											//console.log("skip this unreadable cell");
											}
					
					}
			}
		}
		
		function validationTableWindow(){
			

			tableLines -= 1;
			var HeaderAmount = document.getElementById("FeedTable").rows[0].cells.length;
			var HeaderCheck = HeaderAmount - 1;
			if (schalter === true){
				var writelocation = document.getElementById("check2");
			}else{
				var writelocation = document.getElementById("check");
			}
			
	
				for(var i = 0; i < HeaderAmount; i++){
				var HeaderValues = document.getElementById("FeedTable").rows[0].cells[i].innerHTML;
				HeaderArray.push(HeaderValues);
				}
			/*
			var Divwindow = document.createElement("DIV");
			Divwindow.setAttribute("id", "html-content-holder");
			writelocation.appendChild(Divwindow);
			var writelocation = document.getElementById("html-content-holder");
			*/
			
			writelocation.innerHTML = '<h2 id="underlineHeader"><strong style="font-size: 30px;font-family: Raleway;">Feed Analysis </strong></h2>';
			
			
			var Divwindow = document.createElement("DIV");
			Divwindow.setAttribute("id", "analyzeOverview");
			writelocation.appendChild(Divwindow);
			
			var SpanWindow = document.createElement("SPAN");
			SpanWindow.setAttribute("id", "analyzeProducts");
			SpanWindow.innerHTML += 'Products <h1 style="margin: 0;">'+ tableLines + '</h1>';
			Divwindow.appendChild(SpanWindow);
			
			var SpanWindow = document.createElement("SPAN");
			SpanWindow.setAttribute("id", "analyzeProducts");
			SpanWindow.innerHTML += 'Attributes <h1 style="margin: 0;">'+ maxtableColumns + '</h1>';
			Divwindow.appendChild(SpanWindow);
			
			var SpanWindow = document.createElement("SPAN");
			SpanWindow.setAttribute("id", "analyzeProducts");
			
			if (arrFalse[22] == false || emptyCellsArray[22] <= 0 ){
				SpanWindow.setAttribute("class", "noDeal");
				SpanWindow.innerHTML += 'GTIN <h1 style="margin: 0;">'+ "&#10008;" + '</h1>';				
			}else{
				SpanWindow.innerHTML += 'GTIN <h1 style="margin: 0;">'+ "&#10004;" + '</h1>';
			}
			Divwindow.appendChild(SpanWindow);
			
			Divwindow.innerHTML += '<h1 style="font-size: 20px;color: #999999ff;margin-right: 10px;margin-top: 42px;">&#9474;</h1>';
			
			var SpanWindow = document.createElement("SPAN");
			SpanWindow.setAttribute("id", "analyzeProducts");
			
			if (arrFalse[15] == false || emptyCellsArray[15] <= 0 ){
				SpanWindow.setAttribute("class", "noDeal");
				SpanWindow.innerHTML += 'CPC <h1 style="margin: 0;">'+ "&#10008;" + '</h1>';				
			}else{
				SpanWindow.innerHTML += 'CPC <h1 style="margin: 0;">'+ "&#10004;" + '</h1>';
			}
			Divwindow.appendChild(SpanWindow);
			
			var SpanWindow = document.createElement("SPAN");
			SpanWindow.setAttribute("id", "analyzeProducts");
			
			if (arrFalse[21] == false || emptyCellsArray[21] <= 0 ){
				SpanWindow.setAttribute("class", "noDeal");
				SpanWindow.innerHTML += 'mCPC <h1 style="margin: 0;">'+ "&#10008;" + '</h1>';				
			}else{
				SpanWindow.innerHTML += 'mCPC <h1 style="margin: 0;">'+ "&#10004;" + '</h1>';
			}
			Divwindow.appendChild(SpanWindow);
			
			/*
			writelocation.innerHTML += "Amount of Attributes: "+ maxtableColumns + "<br>";
			writelocation.innerHTML += "Amount of Lines: "+ tableLines + "<br><br>";
			*/
			
			
			/**************************************************************************************************************************
			setting up the FIRST analyze table 
			*/
			var Divwindow = document.createElement("DIV");
			Divwindow.setAttribute("id", "analyzeMandatory");
			writelocation.appendChild(Divwindow);
			
			var TableWindow = document.createElement("TABLE");
			TableWindow.setAttribute("id", "TableWindow");
			
			
			Divwindow.appendChild(TableWindow);
			
			/**************************************************************************************************************************
			setting up the Header mandatory 
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Header");
			
			var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML += "mandatory feed attributes"
				TableWindowRow.appendChild(TableWindowHeaderValue);
				TableWindowHeaderValue.setAttribute("colspan", "5");
				TableWindowHeaderValue.setAttribute("class", "mandatoryfeedattributes");
			TableWindow.appendChild(TableWindowRow);
			
			/**************************************************************************************************************************
			setting up the Header important 
			*/
			var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML += "important feed attributes"
				TableWindowRow.appendChild(TableWindowHeaderValue);
				TableWindowHeaderValue.setAttribute("colspan", "5");
				TableWindowHeaderValue.setAttribute("class", "importantfeedattributes");
			TableWindow.appendChild(TableWindowRow);
			/**************************************************************************************************************************
			setting up the Header Field
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Header");
			
			var myNamingNumbers = [0,1,2,4,5];
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				TableWindowHeaderValue.innerHTML += getNamingAttribute([myNamingNumbers[q]]);
				TableWindowHeaderValue.setAttribute("class", "mandatoryfeedattributes");
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
			var myNamingNumbers = [6,3,9,12,18];
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				TableWindowHeaderValue.innerHTML += getNamingAttribute([myNamingNumbers[q]]);
				TableWindowHeaderValue.setAttribute("class", "importantfeedattributes");
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
			
			TableWindow.appendChild(TableWindowRow);
			
			
			/**************************************************************************************************************************
			setting up the 2nd Row
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Value");
			
			var myNamingNumbers = [0,1,2,4,5];
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
					if(arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.innerHTML += "&#10008;"
					}else{
						TableWindowHeaderValue.innerHTML += "&#10004;"
					}
					if(arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.setAttribute("class", "missing");
					}else{
						TableWindowHeaderValue.setAttribute("class", "found");
					}
					
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
				
			var myNamingNumbers = [6,3,9,12,18];			
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
					if(arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.innerHTML += "&#10008;"
					}else{
						TableWindowHeaderValue.innerHTML += "&#10004;"
					}
					if(arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.setAttribute("class", "missing");
					}else{
						TableWindowHeaderValue.setAttribute("class", "found");
					}
					
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
			
			TableWindow.appendChild(TableWindowRow);
			
			
			/************************************************************************************************************************
			setting up the 3rd Row
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Value");
			
			var myNamingNumbers = [0,1,2,4,5];
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.innerHTML += "" //allNames[MappingArray[q]]
						TableWindowHeaderValue.setAttribute("class", "missing");
				}else{
						TableWindowHeaderValue.innerHTML += "" + HeaderArray[MappingArray[myNamingNumbers[q]]] + "" //allNames[MappingArray[q]]
				}
				
									
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
				
			var myNamingNumbers = [6,3,9,12,18];	
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.innerHTML += "" //allNames[MappingArray[q]]
						TableWindowHeaderValue.setAttribute("class", "missing");
				}else{
						TableWindowHeaderValue.innerHTML += "" + HeaderArray[MappingArray[myNamingNumbers[q]]] + "" //allNames[MappingArray[q]]
				}
				
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
				
			TableWindow.appendChild(TableWindowRow);
			
			/************************************************************************************************************************
			setting up the 4th Row //allNames[MappingArray[q]] -> is the Name of Mapping Attributes // tester is % of
			*/
			var checkemptycounter = 0;
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Value");
			
			var myNamingNumbers = [0,1,2,4,5];
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				if (emptyCellsArray[myNamingNumbers[q]] == 0){
					checkemptycounter++;
				}
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						checkemptycounter++;
						TableWindowHeaderValue.innerHTML += "" 
				}else{
						TableWindowHeaderValue.innerHTML += "<strong>" + percentArray[myNamingNumbers[q]] + " </strong>" + "<br> (" + emptyCellsArray[myNamingNumbers[q]] + "/" + tableLines + ") "//allNames[MappingArray[q]]
				}
				var tester = percentArray[myNamingNumbers[q]];
				if(tester != undefined){
					tester = tester.replace(' %', '');
				}
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.setAttribute("class", "missing");	
				}else if(tester <= Number(10) ){
						TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
				}else if(tester <= Number(50) ){
						TableWindowHeaderValue.setAttribute("class", "missinghalf");
				}else{
					TableWindowHeaderValue.setAttribute("class", "data");
				}
				
								
				TableWindowRow.appendChild(TableWindowHeaderValue);
				preSelectionTemplateCol3Partially(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],tester);
				preSelectionTemplateCol3No(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],emptyCellsArray[myNamingNumbers[q]]);
				preSelectionTemplateAgeGroup(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]]);
				//console.log(HeaderArray[MappingArray[q]]);
				//console.log(MappingArray[q]);
				preSelectionMultipleInfo(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],MappingArray[myNamingNumbers[q]],emptyCellsArray[myNamingNumbers[q]]);
			}
			
			var myNamingNumbers = [6,3,9,12,18];	
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				if (emptyCellsArray[myNamingNumbers[q]] == 0){
					checkemptycounter++;
				}
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						checkemptycounter++;
						TableWindowHeaderValue.innerHTML += "" 
				}else{
						TableWindowHeaderValue.innerHTML += "<strong>" + percentArray[myNamingNumbers[q]] + " </strong>" + "<br> (" + emptyCellsArray[myNamingNumbers[q]] + "/" + tableLines + ") "//allNames[MappingArray[q]]
				}
				var tester = percentArray[myNamingNumbers[q]];
				if(tester != undefined){
					tester = tester.replace(' %', '');
				}
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.setAttribute("class", "missing");	
				}else if(tester <= Number(10) ){
						TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
				}else if(tester <= Number(50) ){
						TableWindowHeaderValue.setAttribute("class", "missinghalf");
				}else{
					TableWindowHeaderValue.setAttribute("class", "data");
				}
				
								
				TableWindowRow.appendChild(TableWindowHeaderValue);
				preSelectionTemplateCol3Partially(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],tester);
				preSelectionTemplateCol3No(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],emptyCellsArray[myNamingNumbers[q]]);
				preSelectionTemplateAgeGroup(allNames[q],arrFalse[q]);
				//console.log(HeaderArray[MappingArray[q]]);
				//console.log(MappingArray[q]);
				preSelectionMultipleInfo(allNames[q],arrFalse[q],MappingArray[q],emptyCellsArray[q]);
			}
			
			TableWindow.appendChild(TableWindowRow);
			
			/**************************************************************************************************************************
			setting up the SECOND analyze table 
			*/
			var Divwindow = document.createElement("DIV");
			Divwindow.setAttribute("id", "analyzeOther");
			writelocation.appendChild(Divwindow);
			
			var TableWindow = document.createElement("TABLE");
			TableWindow.setAttribute("id", "TableWindow");
			
			
			Divwindow.appendChild(TableWindow);
			
			/**************************************************************************************************************************
			setting up the Header other 
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "otherHeader");
			
			var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML += "other feed attributes"
				TableWindowRow.appendChild(TableWindowHeaderValue);
				TableWindowHeaderValue.setAttribute("colspan", "10");
				TableWindowHeaderValue.setAttribute("class", "otherfeedattributes");
			TableWindow.appendChild(TableWindowRow);
			
			
			/**************************************************************************************************************************
			setting up the Header Field
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Header");
			
			var myNamingNumbers = [7,8,14,16,13,19,17,11,10,20];
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				TableWindowHeaderValue.innerHTML += getNamingAttribute([myNamingNumbers[q]]);
				TableWindowHeaderValue.setAttribute("class", "otherfeedattributes");
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
			
			TableWindow.appendChild(TableWindowRow);
			
			
			/**************************************************************************************************************************
			setting up the 2nd Row
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Value");
			
			
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
					if(arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.innerHTML += "&#10008;"
					}else{
						TableWindowHeaderValue.innerHTML += "&#10004;"
					}
					if(arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.setAttribute("class", "othermissing");
					}else{
						TableWindowHeaderValue.setAttribute("class", "otherfound");
					}
					
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
				
			
			TableWindow.appendChild(TableWindowRow);
			
			
			/************************************************************************************************************************
			setting up the 3rd Row
			*/
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Value");
			
			
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.innerHTML += "" //allNames[MappingArray[q]]
				}else{
						TableWindowHeaderValue.innerHTML += "" + HeaderArray[MappingArray[myNamingNumbers[q]]] + "" //allNames[MappingArray[q]]
				}
				
									
				TableWindowRow.appendChild(TableWindowHeaderValue);
				}
				
				
			TableWindow.appendChild(TableWindowRow);
			
			/************************************************************************************************************************
			setting up the 4th Row //allNames[MappingArray[q]] -> is the Name of Mapping Attributes // tester is % of
			*/
			
			var TableWindowRow = document.createElement("TR");
			TableWindowRow.setAttribute("id", "Value");
			
			
			
			for (var q = 0 ; q < myNamingNumbers.length ; q++){
				//TableWindowRow.innerHTML += "<th>MyHeader</th>"
				var TableWindowHeaderValue = document.createElement("TD");
				if (emptyCellsArray[myNamingNumbers[q]] == 0){
					checkemptycounter++;
				}
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						checkemptycounter++;
						TableWindowHeaderValue.innerHTML += "" 
				}else{
						TableWindowHeaderValue.innerHTML += "<strong>" + percentArray[myNamingNumbers[q]] + " </strong>" + "<br> (" + emptyCellsArray[myNamingNumbers[q]] + "/" + tableLines + ") "//allNames[MappingArray[q]]
				}
				var tester = percentArray[myNamingNumbers[q]];
				if(tester != undefined){
					tester = tester.replace(' %', '');
				}
				if(HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false ){
						TableWindowHeaderValue.setAttribute("class", "missingwithNumber");	
				}else if(tester <= Number(10) ){
						TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
				}else{
					TableWindowHeaderValue.setAttribute("class", "data");
				}
				
				TableWindowRow.appendChild(TableWindowHeaderValue);
				
				
				
				
				
				preSelectionTemplateCol3Partially(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],tester);
				preSelectionTemplateCol3No(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],emptyCellsArray[myNamingNumbers[q]]);
				preSelectionTemplateAgeGroup(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]]);
				//console.log(HeaderArray[MappingArray[q]]);
				//console.log(MappingArray[q]);
				preSelectionMultipleInfo(allNames[myNamingNumbers[q]],arrFalse[myNamingNumbers[q]],MappingArray[myNamingNumbers[q]],emptyCellsArray[myNamingNumbers[q]]);
			}
			
			
			
			/*make partially test for GTIN/EAN
			* 
			*/
			var tester = percentArray[22];
				if(tester != undefined){
					tester = tester.replace(' %', '');
				}
			preSelectionTemplateCol3Partially(allNames[22],arrFalse[22],tester);
			preSelectionTemplateCol3No(allNames[22],arrFalse[22],emptyCellsArray[22]);
			
			
			TableWindow.appendChild(TableWindowRow);
			
			
			
			if (allNames.length - checkemptycounter < 4 ){
				INTERRUPTED();
			}else{
				FIXEDINTERRUPTED();
			}
			
			
			
			writelocation.innerHTML += "";
			
			var Divwindow = document.createElement("DIV");
			Divwindow.setAttribute("id", "analyzeDuplicateOverview");
			writelocation.appendChild(Divwindow);
			
			
			/************************************************************************************************************************
			setting up Duplicate Image Analysis / Deeplink & SKU Analysis
			var SpanWindow = document.createElement("SPAN");
			SpanWindow.setAttribute("id", "analyzeProducts");
			SpanWindow.innerHTML += 'Attributes <h1 style="margin: 0;">'+ maxtableColumns + '</h1>';
			Divwindow.appendChild(SpanWindow);
			*/
			if( arrFalse[0] != false ){
				var SpanWindow = document.createElement("SPAN");
				SpanWindow.setAttribute("id", "analyzeDuplicateProducts");
				SpanWindow.setAttribute("class", "noDeal");
				
				//SpanWindow.innerHTML += 'Products <h1 style="margin: 0;">'+ tableLines + '</h1>';
				
				
				
				SpanWindow.innerHTML += "SKU duplicates<br>";
				if(duplicatesArray[0] == 0){
					SpanWindow.innerHTML += '<h1 style="margin: 0;">0%</h1>';
				}else{
					//SpanWindow.innerHTML += duplicatesArray[0];
				}
				if(duplicatesPercentArray[0] != undefined ){
					SpanWindow.innerHTML += '<h1 style="margin: 0;">'+ duplicatesPercentArray[0] + '</h1><br>';
					var tester = duplicatesPercentArray[0].replace(' %', '');
					if ( tester > 20 ){
						$("#selectArticlenumber").val("duplicate");
					}
				}else{
					SpanWindow.innerHTML += "<br>";
				}
				
				Divwindow.appendChild(SpanWindow);
			}
			
			if( arrFalse[4] != false ){
				var SpanWindow = document.createElement("SPAN");
				SpanWindow.setAttribute("id", "analyzeDuplicateProducts");
				SpanWindow.setAttribute("class", "noDeal");
				
				SpanWindow.innerHTML += "Image duplicates<br>";
				if(duplicatesArray[4] == 0){
					SpanWindow.innerHTML += '<h1 style="margin: 0;">0%</h1>';
				}else{
					//writelocation.innerHTML += duplicatesArray[4];
				}
				
				if (duplicatesPercentArray[4] != undefined){
					SpanWindow.innerHTML += '<h1 style="margin: 0;">'+ duplicatesPercentArray[4] +'</h1><br>';
				} else {
					SpanWindow.innerHTML += "<br>";
				}
				if ( DuplicateImageSamplesArray.length > 0 ){
						SpanWindow.innerHTML += '<strong><i><span style="font-size:0.8em">sample products: </span></i></strong><br> ';
						for(var i = 0; i < DuplicateImageSamplesArray.length ; i++){
								SpanWindow.innerHTML += '<u><i><span style="font-size:0.8em">' + DuplicateImageSamplesArray[i] + '</span></i></u><br>';
						}
						SpanWindow.innerHTML += "<br> ";
				}
				DuplicateImageSamplesArray = [];
				
				Divwindow.appendChild(SpanWindow);
			}
			
			if( arrFalse[5] != false ){
				var SpanWindow = document.createElement("SPAN");
				SpanWindow.setAttribute("id", "analyzeDuplicateProducts");
				SpanWindow.setAttribute("class", "noDeal");
				
				
				SpanWindow.innerHTML += "DeepURL duplicates<br>";
				if(duplicatesArray[5] == 0){
					SpanWindow.innerHTML += '<h1 style="margin: 0;">0%</h1>';
				}else{
					//writelocation.innerHTML += duplicatesArray[5];
				}
				//console.log(duplicatesPercentArray[5]);
				if (duplicatesPercentArray[5] != undefined){
					SpanWindow.innerHTML += '<h1 style="margin: 0;">'+ duplicatesPercentArray[5] + '</h1><br>';
					
				} else {
					SpanWindow.innerHTML += "<br>";
				}
				if ( DuplicateDeepLinkSamplesArray.length > 0 ){
						SpanWindow.innerHTML += '<strong><i><span style="font-size:0.8em">samples: </span></i></strong><br> ';
						for(var i = 0; i < DuplicateDeepLinkSamplesArray.length ; i++){
								SpanWindow.innerHTML += '<u><i><span style="font-size:0.8em">' + DuplicateDeepLinkSamplesArray[i] + '</span></i></u><br>';
						}
						SpanWindow.innerHTML += "<br> ";
				}
				DuplicateDeepLinkSamplesArray = [];
				
				Divwindow.appendChild(SpanWindow);
			}
			
			
			writelocation.innerHTML += "";
			if (schalter === true){
				var writelocation = document.getElementById("check2");
			}else{
				var writelocation = document.getElementById("check");
			}
			/************************************************************************************************************************
			setting up Sample Table Bild[4]	DeepLink[5] Name[1] Price[2] Old_Price[9] ShippingCost[17] DeliveryTime[18] Color[14]
			*/
			var FeedLocation = document.getElementById("FeedTable");
			
			writelocation.innerHTML += '<h2 id="underlineHeader"><strong style="font-size: 18px;font-family: Raleway;">sample products from feed</strong></h2><br>';
			var UL = document.createElement("UL");
				UL.setAttribute("id", "Samples");
				UL.setAttribute("class", "products");
				writelocation.appendChild(UL);
			
			if (maxSamples <= 0 ) {
				maxSamples = 1;
			}
			if (maxSamples >= 50 ) {
				maxSamples = 50;
			}
			
			for ( q = 0; q < maxSamples ; q++){
				var maxNumber = tableLines-1;
				
				var getRandomNumber = Math.floor((Math.random() * maxNumber) + 1);
				var randomtester;
				//console.log(getRandomNumber);
				
					//randomtester = FeedLocation.rows[getRandomNumber].cells[MappingArray[4]];
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[4]] != undefined){
						var randomImage = FeedLocation.rows[getRandomNumber].cells[MappingArray[4]].innerHTML;
					}else{
						var randomImage = "";
					}
			
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[5]] != undefined){
						var randomDeepURL = FeedLocation.rows[getRandomNumber].cells[MappingArray[5]].innerHTML;
					}else{
						var randomDeepURL = "";
					}
				
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[1]] != undefined){
						var randomName = FeedLocation.rows[getRandomNumber].cells[MappingArray[1]].innerHTML;
						if (randomName.length > 100 ){
							randomName = randomName.substr(0, 100) + "\u2026";
						}
					}else{
						var randomName = "";
					}
				
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[2]] != undefined){
						var randomPrice = FeedLocation.rows[getRandomNumber].cells[MappingArray[2]].innerHTML;
					}else{
						var randomPrice = "";
					}
				
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[9]] != undefined){
						var randomOld_price = FeedLocation.rows[getRandomNumber].cells[MappingArray[9]].innerHTML;
					}else{
						var randomOld_price = "";
					}
				
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[17]] != undefined){
						var randomShippingCost = FeedLocation.rows[getRandomNumber].cells[MappingArray[17]].innerHTML;
					}else{
						var randomShippingCost = "";
					}
				
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[18]] != undefined){
						var randomDeliveryTime = FeedLocation.rows[getRandomNumber].cells[MappingArray[18]].innerHTML;
					}else{
						var randomDeliveryTime = "";
					}
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[14]] != undefined){
						var randomColor = FeedLocation.rows[getRandomNumber].cells[MappingArray[14]].innerHTML;
					}else{
						var randomColor = "";
					}
					if(FeedLocation.rows[getRandomNumber].cells[MappingArray[0]] != undefined){
						var randomSKU = FeedLocation.rows[getRandomNumber].cells[MappingArray[0]].innerHTML;
					}else{
						var randomSKU = "";
					}
				
			
				
				var LI = document.createElement("LI");
					var aLink = document.createElement("A");
					aLink.setAttribute("href", randomDeepURL);
					aLink.setAttribute("target", "_blank");
					aLink.setAttribute( 'class','removeAmp');
					var aImage = document.createElement("IMG");
					aImage.setAttribute("src", randomImage);
					aImage.setAttribute("width", "100px");
					aImage.setAttribute("height", "100px");
				
					var aTitle = document.createElement("H4");
					aTitle.innerHTML += randomName;
					LI.appendChild(aLink);
					aLink.appendChild(aImage);
					aLink.appendChild(aTitle);
				
				var aParagraph = document.createElement("P");
				var aSpan = document.createElement("SPAN");
				if(randomOld_price.length > 0 ){
						aSpan.setAttribute("class", "red");
				}else{
						aSpan.setAttribute("class", "nothing");
				}
				if(Math.floor(randomOld_price) <= Math.floor(randomPrice) ){
						aSpan.setAttribute("class", "nothing");
				}
				aSpan.innerHTML += "Price: "+randomPrice+"<br>";
				aParagraph.appendChild(aSpan);
				
				var aSpan = document.createElement("SPAN");
				aSpan.innerHTML += " Old_Price: "+randomOld_price;
				aParagraph.appendChild(aSpan);
				
				LI.appendChild(aParagraph);
				
				var aParagraph = document.createElement("P");
				aParagraph.innerHTML += "ShippingCost: "+randomShippingCost;
				LI.appendChild(aParagraph);
				
				var aParagraph = document.createElement("P");
				aParagraph.innerHTML += "Delivery Time: "+randomDeliveryTime;
				LI.appendChild(aParagraph);
				
				var aParagraph = document.createElement("P");
				aParagraph.innerHTML += "Color: "+randomColor;
				LI.appendChild(aParagraph);
				
				var aParagraph = document.createElement("P");
				aParagraph.innerHTML += "SKU: "+randomSKU;
				LI.appendChild(aParagraph);
				
				UL.appendChild(LI);
			}
			
			
			writelocation.innerHTML += '<br>';
			//<br><h2><strong>Feed preview</strong></h2>
			if (tableLines == 1 ){
				INTERRUPTED(3);
			}
		}
		
		
		
		/*==============================================================================================================================================================
		============================================================ENDS!===============================================================================================
		==============================================================================================================================*/


	
	
	}
	/*============================================================================================================================
	==============================================================================================================================
	======================================PopUp Window take Content into new Window ==============================================
	==============================================================================================================================
	==============================================================================================================================*/
	
	function openPopUp() {
    var divText = document.getElementById("suggestions").outerHTML;
    var myWindow = window.open('  ', 'Suggestions', 'location=no,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=800,height=800');
	var doc = myWindow.document;
    doc.open();
	myWindow.document.write('<html><head><title>Feedback</title><link rel="stylesheet" type="text/css" href="CCC.css"></head><body>');
    doc.write(divText);
    doc.close();
	}
	
	function openTablePopUp() {
		mycrossSign();
		
		
		var HeaderAmount = document.getElementById("FeedTable").rows[0].cells.length;
			var tableLines = document.getElementById('FeedTable').rows.length;
			
			
			
			var TableWindow = document.createElement("TABLE");
			TableWindow.setAttribute("id", "NewFeedTable");
			TableWindow.setAttribute("class", "display");
			
			
			var TableWindowRow = document.createElement("TR");
			
			for (var i = 0 ; i < HeaderAmount ; i++){
				
							if ( document.getElementById('FeedTable').rows[0].cells[i] != undefined ){
									var HeaderValue = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;
							}else{
									var HeaderValue = "-";
							}
				
				var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML += HeaderValue
				TableWindowRow.appendChild(TableWindowHeaderValue);
			}
			TableWindow.appendChild(TableWindowRow);
			
			
			tableLines -= 1;
			if(tableLines > 2000 ){
					for (var q = 1 ; q < 2000 ; q++){
						var TableWindowRow = document.createElement("TR");
						
						for (var i = 0 ; i < HeaderAmount ; i++){
							
							if ( document.getElementById('FeedTable').rows[q].cells[i] != undefined ){
									var HeaderValue = document.getElementById('FeedTable').rows[q].cells[i].innerHTML;
							}else{
									var HeaderValue = "-";
							}
							
							var TableWindowHeaderValue = document.createElement("TD");
							TableWindowHeaderValue.innerHTML += HeaderValue
							TableWindowRow.appendChild(TableWindowHeaderValue);
						}
						TableWindow.appendChild(TableWindowRow);
					}
			}else{
				for (var q = 1 ; q < tableLines ; q++){
						var TableWindowRow = document.createElement("TR");
						
						for (var i = 0 ; i < HeaderAmount ; i++){
							
							if ( document.getElementById('FeedTable').rows[q].cells[i] != undefined ){
								var HeaderValue = document.getElementById('FeedTable').rows[q].cells[i].innerHTML;
							}else{
								var HeaderValue = "-";
							}
							
							var TableWindowHeaderValue = document.createElement("TD");
							TableWindowHeaderValue.innerHTML += HeaderValue
							TableWindowRow.appendChild(TableWindowHeaderValue);
						}
						TableWindow.appendChild(TableWindowRow);
				}
			}
		
		
		
		//var divTable = document.getElementById("FeedTable").outerHTML;
				
		var myWindowTable = window.open('  ', 'Table', 'location=no,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=800,height=800');
		var docTable = myWindowTable.document;
		
	
		
		docTable.open();
		docTable.write("<html><head><title>Table</title><link rel='stylesheet' type='text/css' href='CCC.css'></head><body>");
		
		
		docTable.write('<div id="PopUpFeedTable"> </div> ');
		TableWindow.setAttribute("id", "FeedTable");
		docTable.body.appendChild(TableWindow);
		docTable.close();
		
		//docTable.write('<input type="button" value="setHeader" onclick="changeHeader()" />');
		//docTable.write('<div id="headerPopUp"> </div> ');
		//docTable.write(divTable);
		/*
		var script = document.createElement('script');
		script.src = "headerTable.js";
		docTable.getElementsByTagName('head')[0].appendChild(script);
		var script = document.createElement('script');
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
		docTable.getElementsByTagName('head')[0].appendChild(script);
		var script = document.createElement('script');
		script.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
		docTable.getElementsByTagName('head')[0].appendChild(script);
		*/
		//docTable.close();
	}
	
	/*============================================================================================================================
	==============================================================================================================================
	======================================PopUp Window take Content into new Window ENDS==========================================
	==============================================================================================================================
	==============================================================================================================================*/
	
	
	/*============================================================================================================================
	==============================================================================================================================
	======================================Set Mapping Data to evalute Table by Hand ==============================================
	==============================================================================================================================
	==============================================================================================================================*/
	function MappingOpen(){
		mycrossSign();
		 $("#MappingWrapper").toggle();
	}
	
	function MappingClose(){
		 $("#MappingWrapper").toggle();
	}
	
	
	function showLoading(){
		document.getElementById("loading2").style.display = "block";
		$(document).ready(function() {
			$('#loading2').show();
		});
		
		
	}
	
	function MappingValidate(){
		showLoading();
		
		var delayInMilliseconds = 500;
		setTimeout(function() {
			
			  $(document).ready(function() {
					//document.getElementById("outputMapping").innerHTML += "new check";
						//==========================================================first column
							 $('input[id="encodingfeed"]').prop('checked', false);
							 $('input[id="feedstructure"]').prop('checked', false);
							 $('input[id="articlenumber"]').prop('checked', false);
							 $('input[id="productname"]').prop('checked', false);
							 $('input[id="maincategory"]').prop('checked', false);
							 $('input[id="subcategory"]').prop('checked', false);
							 $('input[id="2ndsubcategory"]').prop('checked', false);
							 $('input[id="gender"]').prop('checked', false);
							 $('input[id="color"]').prop('checked', false);
							 $('input[id="brand"]').prop('checked', false);
							 $('input[id="material"]').prop('checked', false);
							 $('input[id="description"]').prop('checked', false);
							 $('input[id="price"]').prop('checked', false);
							 $('input[id="oldprice"]').prop('checked', false);
							 $('input[id="pricesStartFrom"]').prop('checked', false);
							 $('input[id="energylabel"]').prop('checked', false);
							 $('input[id="pricePerUnit"]').prop('checked', false);
							 $('input[id="shippingcosts"]').prop('checked', false);
							 $('input[id="shippingtime"]').prop('checked', false);
							 $('input[id="size"]').prop('checked', false);
							 $('input[id="filters"]').prop('checked', false);
							 $('input[id="ImageURL"]').prop('checked', false);
							 $('input[id="AuxImageURL"]').prop('checked', false);
							 $('input[id="DeepURL"]').prop('checked', false);
							//==========================================================second column 
							 $('input[class="encoding"]').prop('checked', false);
							 $('input[class="feedstructure"]').prop('checked', false);
							 $('input[class="articlenumber"]').prop('checked', false);
							 $('input[class="productname"]').prop('checked', false);
							 $('input[class="maincategory"]').prop('checked', false);
							 $('input[class="subcategory"]').prop('checked', false);
							 $('input[class="2ndsubcategory"]').prop('checked', false);
							 $('input[class="gender"]').prop('checked', false);
							 $('input[class="color"]').prop('checked', false);
							 $('input[class="brand"]').prop('checked', false);
							 $('input[class="material"]').prop('checked', false);
							 $('input[class="description"]').prop('checked', false);
							 $('input[class="price"]').prop('checked', false);
							 $('input[class="oldprice"]').prop('checked', false);
							 $('input[class="pricesStartFrom"]').prop('checked', false);
							 $('input[class="energylabel"]').prop('checked', false);
							 $('input[class="pricePerUnit"]').prop('checked', false);
							 $('input[class="shippingcosts"]').prop('checked', false);
							 $('input[class="shippingtime"]').prop('checked', false);
							 $('input[class="size"]').prop('checked', false);
							 $('input[class="filters"]').prop('checked', false);
							 $('input[class="ImageURL"]').prop('checked', false);
							 $('input[class="AuxImageURL"]').prop('checked', false);
							 $('input[class="DeepURL"]').prop('checked', false);
							 //==========================================================third column
							 $("#selectArticlenumber").val("yes");
							 $("#selectProductname").val("yes");
							 $("#selectMaincategory").val("yes");
							 $("#selectSubcategory").val("yes");
							 $("#select2ndsubcategory").val("yes");
							 $("#selectGender").val("yes");
							 $("#selectColor").val("yes");
							 $("#selectBrand").val("yes");
							 $("#selectMaterial").val("yes");
							 $("#selectDescription").val("yes");
							 $("#selectPrice").val("yes");
							 $("#selectOldprice").val("yes");
							 $("#selectPricesStartFrom").val("yes");
							 $("#selectEnergylabel").val("yes");
							 $("#selectPricePerUnit").val("yes");
							 $("#selectShippingcosts").val("yes");
							 $("#selectShippingtime").val("yes");
							 $("#selectSize").val("yes");
							 $("#selectFilters").val("yes");
							 $("#selectImageURL").val("yes");
							 $("#selectAuxImageURL").val("yes");
							 $("#selectDeepURL").val("yes");
							 //============================================================encoding feed structure = flawless
							$('input[id="encodingfeed"]').prop('checked', true);
							$("input[class=encoding][value='flawless']").prop("checked",true);
							$('input[id="feedstructure"]').prop('checked', true);
							$("input[class=feedstructure][value='flawless']").prop("checked",true);
						validateNew = true;
						maxSamples = document.getElementById("InputNumberField").value;

						for (i = 0; i < allNames.length ;i++){
							
							
							var checkgetMappingValue = document.getElementById(allNames[i]);
							if (checkgetMappingValue != null ){
								var getMappingValue = document.getElementById(allNames[i]).value;
								NewMappingArray[i] = getMappingValue;
								//console.log(NewMappingArray);
							}else{
								//console.log("nothing");
							}
						
						}
						
						ValidatePreview();
						$(document).ready(function() {
							$('#loading2').hide();
						});
						
			});
			
			
		}, delayInMilliseconds);
		
		
		
	
		validateNew = false;
		
	}
	function setMapping(){
		document.getElementById("MappingSelection").innerHTML = "<h6>Mapping Setting </h6>"
		var HeaderAmount = document.getElementById("FeedTable").rows[0].cells.length;
		var HeaderCheck = HeaderAmount - 1;
	
		for(var i = 0; i < HeaderAmount; i++){
		var HeaderValues = document.getElementById("FeedTable").rows[0].cells[i].innerHTML;
		HeaderArray.push(HeaderValues);
		}

		for(var i = 0; i < allNames.length ; i++){
			document.getElementById("MappingSelection").innerHTML += allNames[i];
			var alpha = document.createElement("SELECT");
			alpha.setAttribute("id", allNames[i]);
			//document.getElementById("MappingSelection").innerHTML += alpha;
			document.getElementById("MappingSelection").appendChild(alpha);
				for(var j = 0; j <= HeaderAmount; j++){
					var beta = document.createElement("option");
					beta.setAttribute("id", j);
					beta.value = j;
					beta.innerHTML = HeaderArray[j];
					alpha.appendChild(beta);
				}
			beta.setAttribute("id", "nothing");
			beta.value = "nothing";
			beta.innerHTML = "no Validation";
			alpha.appendChild(beta);

			document.getElementById("MappingSelection").innerHTML += "<br>";
		}
		var button = document.createElement("BUTTON");
		button.setAttribute("id", "MappingValidate");
		button.value = "Validate";
		button.innerHTML = "Validate";
		button.setAttribute('onclick','MappingValidate();');
		document.getElementById("MappingSelection").appendChild(button);
		document.getElementById("MappingSelection").innerHTML += "<br>";
		var button2 = document.createElement("BUTTON");
		button2.setAttribute("id", "MappingClose");
		button2.value = "Close";
		button2.innerHTML = "Close";
		button2.setAttribute('onclick','MappingClose();');
		document.getElementById("MappingSelection").appendChild(button2);
		document.getElementById("MappingSelection").innerHTML += "<br>";
		
		document.getElementById("MappingSelection").innerHTML += "&#35; Samples:";
		var InputNumberField = document.createElement("INPUT");
		InputNumberField.setAttribute("id", "InputNumberField");
		InputNumberField.setAttribute("type", "number");
		InputNumberField.setAttribute("min", 1);
		InputNumberField.setAttribute("max", 50);
		InputNumberField.value = maxSamples;
		document.getElementById("MappingSelection").appendChild(InputNumberField);
	
	
		for(var q = 0; q < allNames.length; q++){
			if (MappingArray[q] != undefined) {
			document.getElementById(allNames[q]).selectedIndex = MappingArray[q];
			} else{
				var setNoValidation = HeaderAmount;
				document.getElementById(allNames[q]).selectedIndex = setNoValidation;
			}
			
			
			
		}
	
	
	}
	
	/*============================================================================================================================
	==============================================================================================================================
	======================================Set Mapping Data to evalute Table by Hand ==============================================
	=============================================         ENDS      ==============================================================
	==============================================================================================================================*/
	
	
	
	/*============================================================================================================================
	==============================================================================================================================
	======================================evaluate the form and set up the response from the JSON file ============================
	==============================================================================================================================
	==============================================================================================================================*/
	
	
		function generateSuggestions() {
		/*var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				myFunction(this);
				}
			};
		xhttp.open("GET", "template.xml", true);
		xhttp.send();
		*/
		
			var valueCheck = document.getElementById("language").value;
			//console.log(valueCheck);
			if (valueCheck == "EN"){
				var language = 0;
			} else if(valueCheck == "DE"){
				var language = 1;
			} else if(valueCheck == "NL"){
				var language = 2;
			} else if(valueCheck == "FR"){
				var language = 3;
			} else if(valueCheck == "IT"){
				var language = 4;
			} else if(valueCheck == "ES"){
				var language = 5;
			} else if(valueCheck == "BR"){
				var language = 6;
			} else if(valueCheck == "PL"){
				var language = 7;
			} else if(valueCheck == "HU"){
				var language = 8;
			} else if(valueCheck == "SK"){
				var language = 9;
			} else if(valueCheck == "CZ"){
				var language = 10;
			} else if(valueCheck == "FI"){
				var language = 11;
			} 
		
			//var xmlDoc = xml.responseXML;
			
			document.getElementById("suggestions").innerHTML = "h2. *??important things to fix??*<br>----<br>";
			
			if (document.getElementById("encodingfeedbuilder").checked == true){//-------------------- check if Encoding is checked
				//------------------------------------------------------------------- if check other
				if (document.getElementsByClassName("encoding")[1].checked == true){
					document.getElementById("suggestions").innerHTML += reply.encodingfeed.others[language]+"<br><br>";
				}
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("feedstructurebuilder").checked == true){//-------------------- check if feedstructure is checked
				//------------------------------------------------------------------- if check CSV Issues
				if (document.getElementsByClassName("feedstructure")[1].checked == true){
					document.getElementById("suggestions").innerHTML += reply.feedstructure.csvissues[language]+"<br><br>";
				}
				//------------------------------------------------------------------- if check XML Issues
				if (document.getElementsByClassName("feedstructure")[2].checked == true){
					document.getElementById("suggestions").innerHTML += reply.feedstructure.xmlissues[language]+"<br><br>";
				}
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("articlenumberbuilder").checked == true){//-------------------- check if articlenumber is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("articlenumber")[0].checked == true){
					
					var valueCheck = document.getElementById("selectArticlenumber").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
						document.getElementById("suggestions").innerHTML += reply.articlenumber.yes[language] ;
						} else if(valueCheck == "no"){
						document.getElementById("suggestions").innerHTML += reply.articlenumber.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
						document.getElementById("suggestions").innerHTML += reply.articlenumber.partially[language] +"<br><br>";
						} else if(valueCheck == "duplicate"){
						document.getElementById("suggestions").innerHTML += reply.articlenumber.duplicate[language] +"<br><br>";
						} else if(valueCheck == "changed"){
						document.getElementById("suggestions").innerHTML += reply.articlenumber.changed[language] +"<br><br>";
						} 
					
				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("articlenumber")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.articlenumber.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("productnamebuilder").checked == true){//-------------------- check if productname is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("productname")[0].checked == true){
					
					var valueCheck = document.getElementById("selectProductname").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
						document.getElementById("suggestions").innerHTML += reply.productname.yes[language] ;
						} else if(valueCheck == "no"){
						document.getElementById("suggestions").innerHTML += reply.productname.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
						document.getElementById("suggestions").innerHTML += reply.productname.partially[language] +"<br><br>";
						} else if(valueCheck == "different language"){
						document.getElementById("suggestions").innerHTML += reply.productname.differentlanguage[language] +"<br><br>";
						} 
						
					 
				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("productname")[1].checked == true){
					var x = reply.productname.empty[language] +"&#10;";
					document.getElementById("suggestions").innerHTML += x+"<br><br>"; 
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("genderbuilder").checked == true){//-------------------- check if gender is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("gender")[0].checked == true){
					
					var valueCheck = document.getElementById("selectGender").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.gender.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.gender.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.gender.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.gender.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "kids inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.gender.kidsinaccurate[language] +"<br><br>";
						} else if(valueCheck == "age group"){
							document.getElementById("suggestions").innerHTML += reply.gender.agegroup[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("gender")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.gender.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("pricebuilder").checked == true){//-------------------- check if price is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("price")[0].checked == true){
					
					var valueCheck = document.getElementById("selectPrice").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.price.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.price.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.price.partially[language] +"<br><br>";
						} else if(valueCheck == "wrong"){
							document.getElementById("suggestions").innerHTML += reply.price.wrong[language] +"<br><br>";
						} else if(valueCheck == "sale price"){
							document.getElementById("suggestions").innerHTML += reply.price.saleprice[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("price")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.price.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("pricesStartFrombuilder").checked == true){//-------------------- check if pricesStartFrom is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("pricesStartFrom")[0].checked == true){
					
					var valueCheck = document.getElementById("selectPricesStartFrom").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.partially[language] +"<br><br>";
						} else if(valueCheck == "wrong"){
							document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.wrong[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("pricesStartFrom")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("energylabelbuilder").checked == true){//-------------------- check if energylabel is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("energylabel")[0].checked == true){
					
					var valueCheck = document.getElementById("selectEnergylabel").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.energylabel.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.energylabel.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.energylabel.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.energylabel.inaccurate[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("energylabel")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.energylabel.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("pricePerUnitbuilder").checked == true){//-------------------- check if pricePerUnit is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("pricePerUnit")[0].checked == true){
					
					var valueCheck = document.getElementById("selectPricePerUnit").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "units"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.units[language] +"<br><br>";
						} else if(valueCheck == "currency missing"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.currencymissing[language] +"<br><br>";
						} else if(valueCheck == "value divided"){
							document.getElementById("suggestions").innerHTML += reply.priceperunit.valuedivided[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("pricePerUnit")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.priceperunit.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("shippingcostsbuilder").checked == true){//-------------------- check if shippingcosts is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("shippingcosts")[0].checked == true){
					
					var valueCheck = document.getElementById("selectShippingcosts").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.partially[language] +"<br><br>";
						} else if(valueCheck == "wrong"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.wrong[language] +"<br><br>";
						} else if(valueCheck == "text only"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.textonly[language] +"<br><br>";
						} else if(valueCheck == "minimum order"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.minimumorder[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("shippingcosts")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.shippingcosts.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("shippingtimebuilder").checked == true){//-------------------- check if shippingtime is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("shippingtime")[0].checked == true){
					
					var valueCheck = document.getElementById("selectShippingtime").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.yes[language] ;
						} else if(valueCheck == "out of stock"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.outofstock[language] +"<br><br>";
						} 

				}
				
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("sizebuilder").checked == true){//-------------------- check if size is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("size")[0].checked == true){
					
					var valueCheck = document.getElementById("selectSize").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.size.yes[language] ;
						} else if(valueCheck == "out of stock"){
							document.getElementById("suggestions").innerHTML += reply.size.outofstock[language] +"<br><br>";
						} else if(valueCheck == "price difference"){
							document.getElementById("suggestions").innerHTML += reply.size.pricedifference[language] +"<br><br>";
						} 

				}
				
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("ImageURLbuilder").checked == true){//-------------------- check if ImageURL is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("ImageURL")[0].checked == true){
					
					var valueCheck = document.getElementById("selectImageURL").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.partially[language] +"<br><br>";
						} else if(valueCheck == "duplicate content"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.duplicatecontent[language] +"<br><br>";
						} else if(valueCheck == "big picture"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.bigpicture[language] +"<br><br>";
						} else if(valueCheck == "quality"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.quality[language] +"<br><br>";
						} else if(valueCheck == "multiple products"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.multipleproducts[language] +"<br><br>";
						} else if(valueCheck == "placeholder"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.placeholder[language] +"<br><br>";
						} else if(valueCheck == "not working"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.notworking[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("ImageURL")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.imageurl.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("DeepURLbuilder").checked == true){//-------------------- check if DeepURL is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("DeepURL")[0].checked == true){
					
					var valueCheck = document.getElementById("selectDeepURL").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.deepurl.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.deepurl.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.deepurl.partially[language] +"<br><br>";
						} else if(valueCheck == "wrong"){
							document.getElementById("suggestions").innerHTML += reply.deepurl.wrong[language] +"<br><br>";
						} else if(valueCheck == "not working"){
							document.getElementById("suggestions").innerHTML += reply.deepurl.notworking[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("DeepURL")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.deepurl.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			
			if (document.getElementById("AuxImageURLbuilder").checked == true){//-------------------- check if AuxURL is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("AuxImageURL")[0].checked == true){
					
					var valueCheck = document.getElementById("selectAuxImageURL").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if(valueCheck == "not working"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.notworking[language] +"<br><br>";
						} 
	
				}
				
			
			}

			
			//-------------------------------------------------------------------SUGGESTIONS START!
			
			document.getElementById("suggestions").innerHTML += "<br>h2. ??suggestions for improvement??<br>----<br>";
			
			if (document.getElementById("encodingfeedbuilder").checked == true){//-------------------- check if Encoding is checked
				//------------------------------------------------------------------- if check flawless
				if (document.getElementsByClassName("encoding")[0].checked == true){

					document.getElementById("suggestions").innerHTML += reply.encodingfeed.flawless[language];
					
				}
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("feedstructurebuilder").checked == true){//-------------------- check if feedstructure is checked
				//------------------------------------------------------------------- if check flawless
				if (document.getElementsByClassName("feedstructure")[0].checked == true){
					document.getElementById("suggestions").innerHTML += reply.feedstructure.flawless[language];
				}
			//------------------------------------------------------------------- end
			
			}
			
			
			if (document.getElementById("productnamebuilder").checked == true){//-------------------- check if productname is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("productname")[0].checked == true){
					
					var valueCheck = document.getElementById("selectProductname").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
						document.getElementById("suggestions").innerHTML += reply.productname.yes[language];
						} else if(valueCheck == "inaccurate"){
						document.getElementById("suggestions").innerHTML += reply.productname.inaccurate[language] +"<br><br>";
						} 
					 
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			
			if (document.getElementById("maincategorybuilder").checked == true){//-------------------- check if maincategory is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("maincategory")[0].checked == true){
					
					var valueCheck = document.getElementById("selectMaincategory").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.maincategory.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.maincategory.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.maincategory.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.maincategory.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.maincategory.inappropriate[language] +"<br><br>";
						} 
				
				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("maincategory")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.maincategory.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("subcategorybuilder").checked == true){//-------------------- check if subcategory is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("subcategory")[0].checked == true){
					
					var valueCheck = document.getElementById("selectSubcategory").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.inappropriate[language] +"<br><br>";
						} else if(valueCheck == "can be divided"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.canbedivided[language] +"<br><br>";
						} else if(valueCheck == "identical"){
							document.getElementById("suggestions").innerHTML += reply.subcategory.identical[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("subcategory")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.subcategory.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("2ndsubcategorybuilder").checked == true){//-------------------- check if 2ndsubcategory is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("2ndsubcategory")[0].checked == true){
					
					var valueCheck = document.getElementById("select2ndsubcategory").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.inappropriate[language] +"<br><br>";
						} else if(valueCheck == "can be divided"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.canbedivided[language] +"<br><br>";
						} else if(valueCheck == "identical"){
							document.getElementById("suggestions").innerHTML += reply.secondsubcategory.identical[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("2ndsubcategory")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.secondsubcategory.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("genderbuilder").checked == true){//-------------------- check if gender is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("gender")[0].checked == true){
					
					var valueCheck = document.getElementById("selectGender").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.gender.yes[language] ;
						} else if(valueCheck == "only kids"){
							document.getElementById("suggestions").innerHTML += reply.gender.onlykids[language] +"<br><br>";
						} 
						

				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("colorbuilder").checked == true){//-------------------- check if color is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("color")[0].checked == true){
					
					var valueCheck = document.getElementById("selectColor").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.color.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.color.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.color.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.color.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.color.inappropriate[language] +"<br><br>";
						} else if(valueCheck == "multiple information"){
							document.getElementById("suggestions").innerHTML += reply.color.multipleinformation[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("color")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.color.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("brandbuilder").checked == true){//-------------------- check if brand is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("brand")[0].checked == true){
					
					var valueCheck = document.getElementById("selectBrand").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.brand.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.brand.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.brand.partially[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("brand")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.brand.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("materialbuilder").checked == true){//-------------------- check if material is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("material")[0].checked == true){
					
					var valueCheck = document.getElementById("selectMaterial").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.material.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.material.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.material.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.material.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.material.inappropriate[language] +"<br><br>";
						} else if(valueCheck == "multiple information"){
							document.getElementById("suggestions").innerHTML += reply.material.multipleinformation[language] +"<br><br>";
						} else if(valueCheck == "too precise"){
							document.getElementById("suggestions").innerHTML += reply.material.tooprecise[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("material")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.material.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("descriptionbuilder").checked == true){//-------------------- check if description is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("description")[0].checked == true){
					
					var valueCheck = document.getElementById("selectDescription").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.description.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.description.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.description.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.description.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.description.inappropriate[language] +"<br><br>";
						} else if(valueCheck == "incomplete"){
							document.getElementById("suggestions").innerHTML += reply.description.incomplete[language] +"<br><br>";
						} else if(valueCheck == "bad form"){
							document.getElementById("suggestions").innerHTML += reply.description.badform[language] +"<br><br>";
						} else if(valueCheck == "different language"){
							document.getElementById("suggestions").innerHTML += reply.description.differentlanguage[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("description")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.description.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("pricebuilder").checked == true){//-------------------- check if price is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("price")[0].checked == true){
					
					var valueCheck = document.getElementById("selectPrice").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.price.yes[language] ;
						} else if(valueCheck == "with currency"){
							document.getElementById("suggestions").innerHTML += reply.price.withcurrency[language] +"<br><br>";
						} 
						

				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("oldpricebuilder").checked == true){//-------------------- check if oldprice is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("oldprice")[0].checked == true){
					
					var valueCheck = document.getElementById("selectOldprice").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.oldprice.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.oldprice.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.oldprice.partially[language] +"<br><br>";
						} else if(valueCheck == "wrong"){
							document.getElementById("suggestions").innerHTML += reply.oldprice.wrong[language] +"<br><br>";
						} else if(valueCheck == "with currency"){
							document.getElementById("suggestions").innerHTML += reply.oldprice.withcurrency[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("oldprice")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.oldprice.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			
			if (document.getElementById("shippingcostsbuilder").checked == true){//-------------------- check if shippingcosts is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("shippingcosts")[0].checked == true){
					
					var valueCheck = document.getElementById("selectShippingcosts").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.yes[language] ;
						} else if(valueCheck == "payment method"){
							document.getElementById("suggestions").innerHTML += reply.shippingcosts.paymentmethod[language] +"<br><br>";
						} 
						

				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("shippingtimebuilder").checked == true){//-------------------- check if shippingtime is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("shippingtime")[0].checked == true){
					
					var valueCheck = document.getElementById("selectShippingtime").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "wrong"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.wrong[language] +"<br><br>";
						} else if(valueCheck == "text only"){
							document.getElementById("suggestions").innerHTML += reply.shippingtime.textonly[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("shippingtime")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.shippingtime.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("sizebuilder").checked == true){//-------------------- check if size is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("size")[0].checked == true){
					
					var valueCheck = document.getElementById("selectSize").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.size.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.size.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.size.partially[language] +"<br><br>";
						} else if(valueCheck == "inaccurate"){
							document.getElementById("suggestions").innerHTML += reply.size.inaccurate[language] +"<br><br>";
						} else if(valueCheck == "inappropriate"){
							document.getElementById("suggestions").innerHTML += reply.size.inappropriate[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("size")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.size.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("filtersbuilder").checked == true){//-------------------- check if filters is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("filters")[0].checked == true){
					
					var valueCheck = document.getElementById("selectFilters").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.filters.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.filters.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.filters.partially[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("filters")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.filters.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("GTINbuilder").checked == true){//-------------------- check if GTIN is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("GTIN")[0].checked == true){
					
					var valueCheck = document.getElementById("selectGTIN").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.GTIN.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.GTIN.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.GTIN.partially[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("GTIN")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.GTIN.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("ImageURLbuilder").checked == true){//-------------------- check if ImageURL is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("ImageURL")[0].checked == true){
					
					var valueCheck = document.getElementById("selectImageURL").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.yes[language] ;
						} else if(valueCheck == "small picture"){
							document.getElementById("suggestions").innerHTML += reply.imageurl.smallpicture[language] +"<br><br>";
						} 

				}
				
			//------------------------------------------------------------------- end
			
			}
			
			if (document.getElementById("AuxImageURLbuilder").checked == true){//-------------------- check if AuxImageURL is checked
				//------------------------------------------------------------------- if check YES
				if (document.getElementsByClassName("AuxImageURL")[0].checked == true){
					
					var valueCheck = document.getElementById("selectAuxImageURL").value;
					//console.log(valueCheck);
					//------------------------------------------------------------------- if check YES
					if (valueCheck == "yes"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.yes[language] ;
						} else if(valueCheck == "no"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.no[language] +"<br><br>";
						} else if(valueCheck == "partially"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.partially[language] +"<br><br>";
						} else if(valueCheck == "identical"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.identical[language] +"<br><br>";
						} else if(valueCheck == "big picture"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.bigpicture[language] +"<br><br>";
						} else if(valueCheck == "small picture"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.smallpicture[language] +"<br><br>";
						} else if(valueCheck == "quality"){
							document.getElementById("suggestions").innerHTML += reply.auximageurl.quality[language] +"<br><br>";
						} 
						

				}
				//------------------------------------------------------------------- if check NO
				if (document.getElementsByClassName("AuxImageURL")[1].checked == true){
					
					document.getElementById("suggestions").innerHTML += reply.auximageurl.empty[language] +"<br><br>";
				}
				
			//------------------------------------------------------------------- end
			
			}
				
		}

		/*============================================================================================================================
		============================================================ENDS!=============================================================
		==============================================================================================================================*/
		$(document).ready(function() {
		//console.log(reply.encodingfeed.flawless[0]);
		//document.getElementById("demo").innerHTML += reply.feedstructure.xmlissues[0];
		});
		
		/*============================================================================================================================
		============================================================Resizeable!=======================================================
		==============================================================================================================================*/
		
		$(document).ready(function() {
			
			$( ".empty" )
			.wrap('<div/>')
			.css({'overflow':'hidden'})
			.parent()
            .css({'display':'inline-block',
                  'overflow':'hidden',
                  'height':function(){return $('.empty',this).height();},
                  'width':  function(){return $('.empty',this).width();},
                  'paddingBottom':'12px',
                  'paddingRight':'12px'
                  
                 }).resizable()
                    .find('.empty')
                      .css({overflow:'auto',
                            width:'100%',
                            height:'100%'});;
		});
		
		$(document).ready(function() {
			$( ".empty2" )
			.wrap('<div/>')
			.css({'overflow':'hidden'})
			.parent()
            .css({'display':'inline-block',
                  'overflow':'hidden',
                  'height':function(){return $('.empty2',this).height();},
                  'width':  function(){return $('.empty2',this).width();},
                  'paddingBottom':'12px',
                  'paddingRight':'12px'
                  
                 }).resizable()
                    .find('.empty2')
                      .css({overflow:'auto',
                            width:'100%',
                            height:'100%'});;
		});
		$(document).ready(function() {
			$( "#MappingWrapper" ).draggable();
		});
		$(document).ready(function() {
			$( ".modal_main" ).draggable();
		});
	/*============================================================================================================================
		============================================================Resizeable END!===============================================
		==============================================================================================================================*/


		/*=================================================================================================================================================================================================================================================PressKey!======================================================================================================================*/
		var checkedKey = false;
		var feed2;
		if(typeof maxSamples == "undefined"){
				var maxSamples = 10;
		}

		
		$(document).ready(function() {
			$("#contents").slideToggle("slow");
			$("#quicklinkswrapper").css('display', 'flex').fadeOut(1);
			$(".ui-resizable-handle").slideToggle("slow");
			mycrossSign();
		});
		
		
		
		$(document).ready(function() {
		
			document.onkeyup = function(event) {
			var key_press = String.fromCharCode(event.keyCode);
			var key_code = event.keyCode;
			//console.log(key_press);
			//console.log(key_code);
			//document.getElementById("KP").innerHTML = key_press;
			//document.getElementById("KC").innerHTML = key_code;
				if (checkedKey == false){
					if(key_press == ""){
						$(".modal").fadeIn();
						$(".modal_main").show();
						checkedKey = true;
					}
				}else{
					if (key_press == ""){
					$(".response").fadeOut();
					$(".responseBox").fadeOut();
					$(".modal").fadeOut();
					$(".modal_main").fadeOut();
					checkedKey = false;
					}
				}
				
			}
		 });
		/*================================================================================
		clusterize Table
		==================================================================================*/
		/*function createtable(){
			var tableLength = document.getElementById('FeedTable').rows[0].cells.length;
			var maxLines =  document.getElementById('FeedTable').rows.length;
			var value = document.getElementById('FeedTable').rows[0].innerHTML;
			maxLines += -1;
			var writelocation = document.getElementById("clusterizeHeader");
			var TableHeaderRow = document.createElement("TR");
			for (var i = 0; i < tableLength; i++) {
				var TableWindowHeaderValue = document.createElement("TH");
				TableWindowHeaderValue.innerHTML = document.getElementById('FeedTable').rows[0].cells[i].innerHTML
				TableHeaderRow.appendChild(TableWindowHeaderValue);
			}
				
			writelocation.appendChild(TableHeaderRow);
			
			var data = [];
			for (var i = 1; i <= maxLines; i++) {
			var value = document.getElementById('FeedTable').rows[i].innerHTML;
			data.push('<tr>'+value+'</tr>');
			}
			
			var clusterize = new Clusterize({
			rows: data,
			scrollId: 'scrollArea',
			contentId: 'contentArea'
			}),
			dataToggle = false;
			
		}
		*/
		
		/*================================================================================
		add listiner to table get Number from table and highlighted
		==================================================================================*/
		function numberClick(){
			var numberCell = document.getElementById("contentArea");
			var maxtableColumns =  document.getElementById('FeedTable').rows[0].cells.length;
			numberCell.addEventListener("click", function(){
				
				var text = $(event.target.cellIndex);
				
				if ( text[0] != undefined ){
					var selectorNumber = text[0];
				}else{
					var selectorNumber = 0;
				}
				
				for (i = 0; i <= maxtableColumns ; i++){
					document.querySelectorAll('table#ClusterExample th')[i].style.color = "black";
					}
										
					document.querySelectorAll('table#ClusterExample th')[selectorNumber].style.color = "cornflowerblue";
					
			});
		}
		/*================================================================================
		add listiner to samples get Number from table and show AuxImages
		==================================================================================
		function sampleClick(){
			var sampleItem = document.getElementById("Samples");
			sampleItem.addEventListener("click", function(){
				
				var itemsample = $(event.target);
				console.log(itemsample);
			});
		}
		*/
		/*================================================================================
		add listiner to URL Field to get the FileSize removed because checking and loading blocked sever
		==================================================================================
		function checkFileSize(){
			
				var checkingSizeField = document.getElementById("feedURL");
				checkingSizeField.addEventListener("blur", function(){
					
					console.log(checkingSizeField.value);
					
					var input1 = document.getElementById('feedURL').value;
					input1 = input1.trim();
					
					
					$.ajax({
						type: "POST",
						url: "checkingURL.php",
						data: {feedURL: input1},
						success: function(data) {
										 $("#filesize").html(data);
										 },
										 error: function(){
											 // will fire when timeout is reached
											 $("#contents").html("connection to the server failed");
										},
										timeout: 12000
						});
					
					
				});
			
			
		}
		*/
		/*================================================================================
		add screenshot function  html2canvas						removed because Screenshot looked like blurred
		==================================================================================
		$(document).ready(function(){

		
			$("#btn-Preview-Image").on('click', function () {
				var element = $("#html-content-holder"); 
				var getCanvas; 
				
				 html2canvas(element, {
				 //allowTaint: true,
				 onrendered: function (canvas) {
						$("#previewImage").empty().append(canvas);
						getCanvas = canvas;
					 }
				 });
			});


		});
		*/