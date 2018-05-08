/*   
Nagendra, Sathyasagar    
 Account:  jadrn024
Class: CS645, Spring 2018
Assignment :  Project #1 */

$.get("/perl/jadrn024/check_session.cgi",handle_first_check);	

//if(!getCookie('jadrn024SID')){ window.location.href = "http://jadran.sdsu.edu/~jadrn024/proj1/error.html"; }


//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function() {

    $("#tabs").tabs();  

	clearUpdateDate();
	makeReadOnlyUpdateDate();

	$('#newRecordTab').on('click',function() {
		$('#sku').focus();
    });

	$('#editRecordTab').on('click',function() {
		$('#skuUpdate').focus();
    });

	$('#deleteRecordTab').on('click',function() {
		$('#skuDelete').focus();
    });

	$('#deleteClearButton').on('click',function() {
		clearUpdateDate();
		$('#answerUpdate').html('');
    });

	$('#deleteDeleteClearButton').on('click',function() {
		clearUpdateDate();
		$('#answerDelete').html('');
    });

	$('#deleteInsertClearButton').on('click',function() {
		clearUpdateDate();
		$('#answerInsert').html('');
    });

	$('#skuValidity').text("Required"); 
	$('#categoryValidity').text("Required");
	$('#vendorValidity').text("Required");
	$('#midValidity').text("Required");
	$('#descriptionValidity').text("Required");
	$('#featuresValidity').text("Required");
	$('#costValidity').text("Required");
	$('#retailValidity').text("Required");
	$('#quantityValidity').text("Required");
	$('#fnameValidity').text("Required");

///////// Insert Fields validity check //////////

    $('#sku').on('focus',function() {
		$('#answer').html("");
	    $('#skuValidity').text("");
    });

    $('#category').on('focus',function() {
		$('#answer').html("");
        $('#categoryValidity').text("");
    });
    
    $('#vendor').on('focus',function() {
		$('#answer').html("");
        $('#vendorValidity').text("");
    });

    $('#mid').on('focus',function() {
		$('#answer').html("");
        $('#midValidity').text("");
    });

    $('#description').on('focus',function() {
		$('#answer').html("");
        $('#descriptionValidity').text("");
    });

    $('#features').on('focus',function() {
		$('#answer').html("");
        $('#featuresValidity').text("");
    });

    $('#cost').on('focus',function() {
		$('#answer').html("");
        $('#costValidity').text("");
    });

    $('#retail').on('focus',function() {
		$('#answer').html("");
        $('#retailValidity').text("");
    });

    $('#quantity').on('focus',function() {
		$('#answer').html("");
        $('#quantityValidity').text("");
    });

    $('#sku').on('blur', function() {
		   var sku = $('#sku').val();
		   var skuMatch = sku.match(/^[A-Z]{3}-[0-9]{3}$/);		   
		   if(sku.trim()===""){ $('#skuValidity').text("Required"); }
		   else if(skuMatch === null){$('#skuValidity').text("Enter value like ABC-123");}
		   else { $('#skuValidity').text(""); checkIfSkuExistsInInsert() };
    });

	$('#category').on('blur', function() {
		   var category = $('#category').val();
 		   if(category.trim()=="-1"){ $('#categoryValidity').text("Required"); }
		   else{ $('#categoryValidity').text(""); }
    });
	$('#vendor').on('blur', function() {
		   var vendor = $('#vendor').val();
 		   if(vendor.trim()=="-1"){ $('#vendorValidity').text("Required"); }
		   else{ $('#vendorValidity').text(""); }
    });
	$('#mid').on('blur', function() {
		   var mid = $('#mid').val();
 		   if(mid.trim()===""){ $('#midValidity').text("Required"); }
		   else{ $('#midValidity').text(""); }
    });
	$('#description').on('blur', function() {
		   var description = $('#description').val();
 		   if(description.trim()===""){ $('#descriptionValidity').text("Required"); }
		   else{ $('#descriptionValidity').text(""); }
    });
	$('#features').on('blur', function() {
		   var features = $('#features').val();
 		   if(features.trim()===""){ $('#featuresValidity').text("Required"); }
		   else{ $('#featuresValidity').text(""); }
    });
	$('#cost').on('blur', function() {
		   var cost = $('#cost').val();
 		   if(cost.trim()===""){ $('#costValidity').text("Required"); }
		   else{ $('#costValidity').text(""); }
    });
	$('#retail').on('blur', function() {
		   var retail = $('#retail').val();
 		   if(retail.trim()===""){ $('#retailValidity').text("Required"); }
		   else{ $('#retailValidity').text(""); }
    });
	$('#quantity').on('blur', function() {
		   var quantity = $('#quantity').val();
 		   if(quantity.trim()===""){ $('#quantityValidity').text("Required"); }
 		   else if(quantity.trim()<=0){ $('#quantityValidity').text("Quantity cannot be negative"); }
		   else{ $('#quantityValidity').text(""); }
    });

	$('#product_image').on('change', function() {
		   $('#answer').html("");
		   var product_image = $('#product_image').val();
 		   if(product_image.trim()===""){ $('#fnameValidity').text("Required"); }
		   else{ $('#fnameValidity').text(""); }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Update field validity check ///////////////////////////////////////////////
    $('#skuUpdate').on('blur', function() {
		   var skuUpdate = $('#skuUpdate').val();
		   var skuMatch = skuUpdate.match(/^[A-Z]{3}-[0-9]{3}$/);		   
		   if(skuUpdate.trim()===""){ 
				$('#skuUpdateValidity').text("Required"); 
		   		clearUpdateDate();
			    makeReadOnlyUpdateDate();
		   }
		   else if(skuMatch === null){
				$('#skuUpdateValidity').text("Enter value like ABC-123");
		   		clearUpdateDate();
			    makeReadOnlyUpdateDate();
		   }
		   else { $('#skuUpdateValidity').text(""); checkIfSkuExistsInUpdate() };
    });

    $('#skuUpdate').on('focus', function() {
		   $('#answerUpdate').html("");
		   clearUpdateDate();
		   makeReadOnlyUpdateDate();

    });

	$('#categoryUpdate').on('blur', function() {
		   var categoryUpdate = $('#categoryUpdate').val();
 		   if(categoryUpdate.trim()=="-1"){ $('#categoryUpdateValidity').text("Required"); }
		   else{ $('#categoryUpdateValidity').text(""); }
    });
	$('#vendorUpdate').on('blur', function() {
		   var vendorUpdate = $('#vendorUpdate').val();
 		   if(vendorUpdate.trim()=="-1"){ $('#vendorUpdateValidity').text("Required"); }
		   else{ $('#vendorUpdateValidity').text(""); }
    });
	$('#midUpdate').on('blur', function() {
		   var midUpdate = $('#midUpdate').val();
 		   if(midUpdate.trim()===""){ $('#midUpdateValidity').text("Required"); }
		   else{ $('#midUpdateValidity').text(""); }
    });
	$('#descriptionUpdate').on('blur', function() {
		   var descriptionUpdate = $('#descriptionUpdate').val();
 		   if(descriptionUpdate.trim()===""){ $('#descriptionUpdateValidity').text("Required"); }
		   else{ $('#descriptionUpdateValidity').text(""); }
    });
	$('#featuresUpdate').on('blur', function() {
		   var featuresUpdate = $('#featuresUpdate').val();
 		   if(featuresUpdate.trim()===""){ $('#featuresUpdateValidity').text("Required"); }
		   else{ $('#featuresUpdateValidity').text(""); }
    });
	$('#costUpdate').on('blur', function() {
		   var costUpdate = $('#costUpdate').val();
 		   if(costUpdate.trim()===""){ $('#costUpdateValidity').text("Required"); }
		   else{ $('#costUpdateValidity').text(""); }
    });
	$('#retailUpdate').on('blur', function() {
		   var retailUpdate = $('#retailUpdate').val();
 		   if(retailUpdate.trim()===""){ $('#retailUpdateValidity').text("Required"); }
		   else{ $('#retailUpdateValidity').text(""); }
    });
	$('#quantityUpdate').on('blur', function() {
		   var quantityUpdate = $('#quantityUpdate').val();
 		   if(quantityUpdate.trim()===""){ $('#quantityUpdateValidity').text("Required"); }
 		   else if(quantityUpdate.trim()<=0){ $('#quantityUpdateValidity').text("Quantity cannot be negative"); }
		   else{ $('#quantityUpdateValidity').text(""); }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#skuDelete').on('blur',function(){
		   var skuDelete = $('#skuDelete').val();
		   var skuMatch = skuDelete.match(/^[A-Z]{3}-[0-9]{3}$/);		   
		   if(skuDelete.trim()===""){ 
				$('#skuDeleteValidity').text("Required"); 
		   		clearDeleteDate();
		   }
		   else if(skuMatch === null){
				$('#skuDeleteValidity').text("Enter value like ABC-123");
		   		clearDeleteDate();
		   }
		   else { $('#skuDeleteValidity').text(""); checkIfSkuExistsInDelete(); }		
	});

    $('#skuDelete').on('focus', function() {
		   $('#answerDelete').html("");
		   clearDeleteDate();
    });

    $('#submitButton').bind('click',function(){

       var sku = $('#sku').val();
       var category = $('#category').val();
       var vendor = $('#vendor').val();
       var mid = $('#mid').val();
       var description = $('#description').val();
       var features = $('#features').val();
       var cost = $('#cost').val();
       var retail = $('#retail').val();
       var quantity = $('#quantity').val();  
	   var fname = $('#product_image').val(); 

	   if(validateInsertData(sku, category, vendor, mid, description, features, cost, retail, quantity, fname)===true){
	       checkIfSkuExistsInInsertOnSubmit();
	   }
	   else{
	       $('#submitValidity').text("Please correct the errors");
		   setTimeout(clearSubmitValidity, 2000);
	   }

	});	
    




	$('#submitButtonUpdate').bind('click',function(){
	   var sku = $('#skuUpdate').val();
       var category = $('#categoryUpdate').val();
       var vendor = $('#vendorUpdate').val();
       var mid = $('#midUpdate').val();
       var description = $('#descriptionUpdate').val();
       var features = $('#featuresUpdate').val();
       var cost = $('#costUpdate').val();
       var retail = $('#retailUpdate').val();
       var quantity = $('#quantityUpdate').val();  
	   var fname = $('#product_imageUpdate').val(); 

	   if(validateUpdateData(sku, category, vendor, mid, description, features, cost, retail, quantity, fname)===true){
	   		checkIfSkuExistsInUpdateOnSubmit();	
	   }	   
	   else{
	       $('#submitUpdateValidity').text("Please correct the errors");
		   setTimeout(clearSubmitUpdateValidity, 2000);
	   }
	});

    $('#submitButtonDelete').bind('click',function(){
	   var sku = $('#skuDelete').val();
	   if(validateDeleteData(sku)===true){
	   		checkIfSkuExistsInDeleteOnSubmit();	
	   }	   
	   else{
	       $('#submitDeleteValidity').text("Please correct the errors");
		   setTimeout(clearSubmitDeleteValidity, 2000);
	   }
	});	
});

////////////////////////////////////////////////////////////////////////////////// *** COMMON FUNCTIONS *** //////////////////////////////////////////////////////////////////////////////////

	function clearSubmitValidity() {    
    	$('#submitValidity').html("");
    }

	function clearSubmitUpdateValidity() {    
    	$('#submitUpdateValidity').html("");
    }

	function clearSubmitDeleteValidity() {    
    	$('#submitDeleteValidity').html("");
    }

	function handle_first_check(response){
		if(response.includes("error.html")){ 
			window.location.href = "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
		}
	}

////////////////////////////////////////////////////////////////////////////////// *** FUNCTIONS TO INSERT DATA *** //////////////////////////////////////////////////////////////////////////////////

function validateInsertData(sku, category, vendor, mid, description, features, cost, retail, quantity, fname){
	var returnValue = true;
	if(sku.trim()===""){ $('#skuValidity').text("Required"); returnValue=false;} 

	else if(sku.match(/^[A-Z]{3}-[0-9]{3}$/) === null){$('#skuValidity').text("Enter value like ABC-123"); returnValue=false;}

	if(category.trim()=="-1"){$('#categoryValidity').text("Required"); returnValue=false;} 

	if(vendor.trim()=="-1"){$('#vendorValidity').text("Required"); returnValue=false;} 

	if(mid.trim()===""){$('#midValidity').text("Required"); returnValue=false;} 

	if(description.trim()===""){$('#descriptionValidity').text("Required"); returnValue=false;} 

	if(features.trim()===""){$('#featuresValidity').text("Required"); returnValue=false;} 

	if(cost.trim()===""){$('#costValidity').text("Required"); returnValue=false;} 

	if(retail.trim()===""){$('#retailValidity').text("Required"); returnValue=false;} 

	if(quantity.trim()===""){$('#quantityValidity').text("Required"); returnValue=false;} 

	if(fname.trim()===""){$('#fnameValidity').text("Please upload an image"); returnValue=false;}

	return returnValue;
}

function checkIfSkuExistsInInsert(){
	var sku = $('#sku').val();
    if(!sku) return;
    var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    $.get(url,process_reply);
}	

function process_reply(response) {
	if(response.includes("error.html")){ 
		window.location.href = "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
		return;
	}
    $('#status').show();
	if(response == "OK"){ 
    }	
    else{ 
        $('#skuValidity').html("SKU already exists");
    }    
}  

function checkIfSkuExistsInInsertOnSubmit(){
	var sku = $('#sku').val();
    if(!sku) return;
    var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    $.get(url, process_reply_onSubmit);
}	

function process_reply_onSubmit(response) {
	if(response.includes("error.html")){ 
		window.location.href = "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
		return;
	}
    $('#status').show();
    if(response == "OK"){
		processUpload();
    }	
    else{ 
        $('#skuValidity').html("SKU already exists");
	    $('#submitValidity').text("Please correct the errors");
		setTimeout(clearSubmitValidity, 2000);
    }
    
}

function processUpload(){
    send_file();
}

function done(){
    $('#status').html('IMAGE THING DONE');
} 
 
function send_file(){
	var form_data = new FormData($('form')[0]);
	var fname = document.getElementById("product_image").value;
	var where = fname.lastIndexOf("\\");
	fname = fname.substring(where+1);
	form_data.append("image", document.getElementById("product_image").files[0]);
	form_data.append("sku", document.getElementById("sku"));
	$.ajax({	
		url: "/perl/jadrn024/image_upload.cgi",
		type: "post",
		data: form_data,
		processData: false,
		contentType: false,
		success: function(response){
			send_form_data();
		},
		error: function(response){
			$('#uploadStatus').css('color','red');
			$('#uploadStatus').html("Sorry, Image upload error occurred. Please retry.");
		}
	});	
}

function send_form_data() {
       var sku = $('#sku').val();
       var category = $('#category').val();
       var vendor = $('#vendor').val();
       var mid = $('#mid').val();
       var description = $('#description').val();
       var features = $('#features').val();
       var cost = $('#cost').val();
       var retail = $('#retail').val();
       var quantity = $('#quantity').val();  

       var fname = document.getElementById("product_image").value;
       var where = fname.lastIndexOf("\\");
       fname = fname.substring(where+1);

       var product_image = fname ;      
       var url = "/perl/jadrn024/insertData.cgi";
       url += "?sku=" + sku + "&category=" + category + "&vendor=" + vendor + "&mid=" + mid + "&description=" + description + "&features=" + features + "&cost=" + cost + "&retail=" + retail + "&quantity=" + quantity + "&product_image=" + product_image;
       $.get(url,handleData);
}
        
function handleData(response) {
       $('#answer').css('color','blue');
       $('#answer').html(response);    
	
	   var record = new Array();    
       record = response.split("|");
		
       var insertedData = `
		   <div class="alert alert-success">
		       <strong>Success!</strong> Your data is inserted.
		   </div>
           <table class="table table-striped table-bordered">
  			<thead class="thead-dark">
    			<tr>
      			<th scope="col">Label</th>
      			<th scope="col">Data</th>
    			</tr>
  			</thead>
  			<tbody>
   			 <tr>
     			 <th scope="row">Sku</th>
      			<td>${record[0]}</td>
    			</tr>
    			<tr>
      			<th scope="row">Category</th>
      			<td>${record[1]}</td>
    			</tr>
    			<tr>
      			<th scope="row">Vendor</th>
      			<td>${record[2]}</td>
    			</tr>
      			<th scope="row">Manufacturer's ID</th>
      			<td>${record[3]}</td>
    			</tr>
      			<th scope="row">Description</th>
      			<td>${record[4]}</td>
    			</tr>
      			<th scope="row">Features</th>
      			<td>${record[5]}</td>
    			</tr>
      			<th scope="row">Cost</th>
      			<td>${record[6]}</td>
    			</tr>
      			<th scope="row">Retail</th>
      			<td>${record[7]}</td>
    			</tr>
      			<th scope="row">Quantity</th>
      			<td>${record[8]}</td>
    			</tr>
      			<th scope="row">Image</th>
      			<td><img src="/~jadrn024/proj1/_DIRupld_/${record[9]}" width="30%"/></td>
    			</tr>
  			</tbody>
			</table>
		`;	
		$('#answer').html(insertedData);
                $('html, body').animate({
                    scrollTop: $("#answer").offset().top
                }, 2000);
 	    $('form')[0].reset();
}

////////////////////////////////////////////////////////////////////////////////// *** FUNCTIONS TO UPDATE DATA *** //////////////////////////////////////////////////////////////////////////////////

function clearUpdateValidity(){
	   $('#categoryUpdateValidity').text("");
	   $('#vendorUpdateValidity').text("");
	   $('#midUpdateValidity').text("");
	   $('#descriptionUpdateValidity').text("");
	   $('#featuresUpdateValidity').text("");
	   $('#costUpdateValidity').text("");
	   $('#retailUpdateValidity').text("");
	   $('#quantityUpdateValidity').text("");
	   $('#fnameUpdateValidity').text("");
}

function clearUpdateDate(){
       $('#categoryUpdate').prop('selectedIndex',0);
       $('#vendorUpdate').prop('selectedIndex',0);
       $('#midUpdate').val('');
       $('#descriptionUpdate').val('');
       $('#featuresUpdate').val('');
       $('#costUpdate').val('');
       $('#retailUpdate').val('');
       $('#quantityUpdate').val('');  	
	   $('#product_imageUpdate').val('');

	   $('#product_imageFromDB').hide();

	   
}

function makeReadOnlyUpdateDate(){
       $('#categoryUpdate').prop("disabled",true);
       $('#vendorUpdate').prop("disabled",true);
       $('#midUpdate').prop("readonly", true);
       $('#descriptionUpdate').prop("readonly", true);
       $('#featuresUpdate').prop("readonly", true);
       $('#costUpdate').prop("readonly", true);
       $('#retailUpdate').prop("readonly", true);
       $('#quantityUpdate').prop("readonly", true);	
       $('#product_imageUpdate').prop("readonly", true);
}

function switchReadOnlyUpdateDate(){
       $('#categoryUpdate').prop("disabled",false);
       $('#vendorUpdate').prop("disabled",false);
       $('#midUpdate').prop("readonly", false);
       $('#descriptionUpdate').prop("readonly", false);
       $('#featuresUpdate').prop("readonly", false);
       $('#costUpdate').prop("readonly", false);
       $('#retailUpdate').prop("readonly", false);
       $('#quantityUpdate').prop("readonly", false);	
       $('#product_imageUpdate').prop("readonly", false);

	   $('#product_imageFromDB').show();
}

function processUpdateUpload(){
    if($('#product_imageUpdate').val().trim() !== ""){ send_fileUpdate(); }
    else { send_form_data_update(); }
}

function send_form_data_update(){
	   var sku = $('#skuUpdate').val();
       var category = $('#categoryUpdate').val();
       var vendor = $('#vendorUpdate').val();
       var mid = $('#midUpdate').val();
       var description = $('#descriptionUpdate').val();
       var features = $('#featuresUpdate').val();
       var cost = $('#costUpdate').val();
       var retail = $('#retailUpdate').val();
       var quantity = $('#quantityUpdate').val();  

       var fname = document.getElementById("product_imageUpdate").value;
       var where = fname.lastIndexOf("\\");
       fname = fname.substring(where+1);

       var product_image = fname ;      
       var url = "/perl/jadrn024/updateData.cgi";
       url += "?sku="+sku+"&category=" + category + "&vendor="+vendor + "&mid="+mid + "&description="+description + "&features="+features + "&cost="+cost + "&retail="+retail + "&quantity="+quantity + "&product_image="+product_image;
       $.get(url,handleDataUpdate);
}

function handleDataUpdate(response) {
       $('#answerUpdate').css('color','blue');
       $('#answerUpdate').html(response);    
	
	   var record = new Array();    
       record = response.split("|");
		
       var updatedData = `
		   <div class="alert alert-success">
		       <strong>Success!</strong> Your data is updated.
		   </div>
           <table class="table table-striped table-bordered">
  			<thead class="thead-dark">
    			<tr>
      			<th scope="col">Label</th>
      			<th scope="col">Data</th>
    			</tr>
  			</thead>
  			<tbody>
   			 <tr>
     			 <th scope="row">Sku</th>
      			<td>${record[0]}</td>
    			</tr>
    			<tr>
      			<th scope="row">Category</th>
      			<td>${record[1]}</td>
    			</tr>
    			<tr>
      			<th scope="row">Vendor</th>
      			<td>${record[2]}</td>
    			</tr>
      			<th scope="row">Manufacturer's ID</th>
      			<td>${record[3]}</td>
    			</tr>
      			<th scope="row">Description</th>
      			<td>${record[4]}</td>
    			</tr>
      			<th scope="row">Features</th>
      			<td>${record[5]}</td>
    			</tr>
      			<th scope="row">Cost</th>
      			<td>${record[6]}</td>
    			</tr>
      			<th scope="row">Retail</th>
      			<td>${record[7]}</td>
    			</tr>
      			<th scope="row">Quantity</th>
      			<td>${record[8]}</td>
    			</tr>
      			<th scope="row">Image</th>
      			<td><img src="/~jadrn024/proj1/_DIRupld_/${record[9]}" width="30%"/></td>
    			</tr>
  			</tbody>
			</table>
		`;	
		$('#answerUpdate').html(updatedData);
                $('html, body').animate({
                    scrollTop: $("#answerUpdate").offset().top
                }, 2000);
 	    $('form')[1].reset();  
		clearUpdateDate();
		makeReadOnlyUpdateDate();
}

function send_fileUpdate(){
	var form_data = new FormData($('form')[1]);
	var fname = document.getElementById("product_imageUpdate").value;
	var where = fname.lastIndexOf("\\");
	fname = fname.substring(where+1);
	form_data.append("image", document.getElementById("product_imageUpdate").files[0]);
	form_data.append("sku", document.getElementById("skuUpdate"));
	$.ajax({	
		url: "/perl/jadrn024/image_uploadUpdate.cgi",
		type: "post",
		data: form_data,
		processData: false,
		contentType: false,
		success: function(response){
		    send_form_data_update();
		},
		error: function(response){
			$('#uploadStatusUpdate').css('color','red');
			$('#uploadStatusUpdate').html("Sorry, Image upload error occurred");
		}

	});	

}


function validateUpdateData(sku, category, vendor, mid, description, features, cost, retail, quantity, fname){
	var returnValue = true;
	if(sku.trim()===""){ $('#skuUpdateValidity').text("Required"); returnValue=false;} 

	else if(sku.match(/^[A-Z]{3}-[0-9]{3}$/) === null){$('#skuUpdateValidity').text("Enter value like ABC-123"); returnValue=false;}

	if(category.trim()=="-1"){$('#categoryUpdateValidity').text("Required"); returnValue=false;} 

	if(vendor.trim()=="-1"){$('#vendorUpdateValidity').text("Required"); returnValue=false;} 

	if(mid.trim()===""){$('#midUpdateValidity').text("Required"); returnValue=false;} 

	if(description.trim()===""){$('#descriptionUpdateValidity').text("Required"); returnValue=false;} 

	if(features.trim()===""){$('#featuresUpdateValidity').text("Required"); returnValue=false;} 

	if(cost.trim()===""){$('#costUpdateValidity').text("Required"); returnValue=false;} 

	if(retail.trim()===""){$('#retailUpdateValidity').text("Required"); returnValue=false;} 

	if(quantity.trim()===""){$('#quantityUpdateValidity').text("Required"); returnValue=false;} 

	return returnValue;
}

function checkIfSkuExistsInUpdate(){
	var sku = $('#skuUpdate').val();
    	if(!sku) {
			clearUpdateDate();
			makeReadOnlyUpdateDate();
			return;		
		}
    	var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    	$.get(url, process_replyUpdate);
}

function checkIfSkuExistsInUpdateOnSubmit(){
	var sku = $('#skuUpdate').val();
    	if(!sku) {
			clearUpdateDate();
			makeReadOnlyUpdateDate();
			return;		
		}
    	var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    	$.get(url, process_replyUpdate_onSubmit);
}

function process_replyUpdate(response) {
	if(response.includes("error.html")){ 
		window.location.href = "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
		return;
	}	
    $('#statusUpdate').show();
    if(response == "OK"){ 
		clearUpdateDate();
	    makeReadOnlyUpdateDate();
        $('#skuUpdateValidity').html("SKU does not exist");
	    $('#submitUpdateValidity').text("Please correct the errors");
		setTimeout(clearSubmitUpdateValidity, 2000);
    }	
    else{ 	
		processUpdate();
    }    
}

function process_replyUpdate_onSubmit(response) {
	if(response.includes("error.html")){ 
		window.location.href = "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
		return;
	}
    $('#statusUpdate').show();
    if(response == "OK"){ 
		clearUpdateDate();
	    makeReadOnlyUpdateDate();
        $('#skuUpdateValidity').html("SKU does not exist");
	    $('#submitUpdateValidity').text("Please correct the errors");
		setTimeout(clearSubmitUpdateValidity, 2000);
    }	
    else{ 	
		processUpdateUpload();
    }    
}

function processUpdate(){
	var sku = $('#skuUpdate').val();
	var url = "/perl/jadrn024/fetch_json.cgi";
	url += "?sku="+sku;  
	$.get(url,handle_json_data);
}

function handle_json_data(response){
    var obj_data = eval("("+response+")");    
    //var obj_data = JSON.parse(response);
	$('#skuUpdate').val(obj_data[0][0]);
	$('#categoryUpdate').val(obj_data[0][1]);
	$('#vendorUpdate').val(obj_data[0][2]);
	$('#midUpdate').val(obj_data[0][3]);
	$('#descriptionUpdate').val(obj_data[0][4]);
	$('#featuresUpdate').val(obj_data[0][5]);
	$('#costUpdate').val(obj_data[0][6]);
	$('#retailUpdate').val(obj_data[0][7]);
	$('#quantityUpdate').val(obj_data[0][8]);
	
	$('#product_imageFromDB').attr('src','/~jadrn024/proj1/_DIRupld_/'+obj_data[0][9]+ '?' + new Date().getTime());	

	switchReadOnlyUpdateDate();
	clearUpdateValidity();		
}

////////////////////////////////////////////////////////////////////////////////// *** FUNCTIONS TO DELETE DATA *** //////////////////////////////////////////////////////////////////////////////////

function validateDeleteData(sku){
	var returnValue = true;
	if(sku.trim()===""){ $('#skuDeleteValidity').text("Required"); returnValue=false;} 

	else if(sku.match(/^[A-Z]{3}-[0-9]{3}$/) === null){$('#skuDeleteValidity').text("Enter value like ABC-123"); returnValue=false;}

	return returnValue;
}

function clearDeleteDate(){
       $('#categoryDelete').prop('selectedIndex',0);
       $('#vendorDelete').prop('selectedIndex',0);
       $('#midDelete').val('');
       $('#descriptionDelete').val('');
       $('#featuresDelete').val('');
       $('#costDelete').val('');
       $('#retailDelete').val('');
       $('#quantityDelete').val('');  	
	   $('#product_imageDelete').val('');

	   $('#product_imageFromDBInDelete').hide();	   
}

function checkIfSkuExistsInDelete(){
	var sku = $('#skuDelete').val();
    	if(!sku) return;
    	var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    	$.get(url, process_replyDelete);
}

function checkIfSkuExistsInDeleteOnSubmit(){
	var sku = $('#skuDelete').val();
    	if(!sku) {
			clearDeleteDate();
			return;		
		}
    	var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    	$.get(url, process_replyDelete_onSubmit);
}

function process_replyDelete_onSubmit(response){
    $('#statusDelete').show();
    if(response == "OK"){ 
		clearDeleteDate();
        $('#skuDeleteValidity').html("SKU does not exist");
	    $('#submitDeleteValidity').text("Please correct the errors");
		setTimeout(clearSubmitDeleteValidity, 2000);
    }	
    else{ 	
		processDeleteUpload();
    }    
}

function process_replyDelete(response) {
    $('#statusDelete').show();
    if(response == "OK"){ 
		clearDeleteDate();
        $('#skuDeleteValidity').html("SKU does not exist");
	    $('#submitDeleteValidity').text("Please correct the errors");
		setTimeout(clearSubmitDeleteValidity, 2000);  
    }	
    else{   		
		processDelete();
    }    
}

function processDelete(){
	var sku = $('#skuDelete').val();
	var url = "/perl/jadrn024/fetch_json.cgi";
	url += "?sku="+sku;  
	$.get(url,handle_json_dataInDelete);
}

function handle_json_dataInDelete(response){
    	var obj_data = eval("("+response+")");    
        //var obj_data = JSON.parse(response);
	$('#skuDelete').val(obj_data[0][0]);
	$('#categoryDelete').val(obj_data[0][1]);
	$('#vendorDelete').val(obj_data[0][2]);
	$('#midDelete').val(obj_data[0][3]);
	$('#descriptionDelete').val(obj_data[0][4]);
	$('#featuresDelete').val(obj_data[0][5]);
	$('#costDelete').val(obj_data[0][6]);
	$('#retailDelete').val(obj_data[0][7]);
	$('#quantityDelete').val(obj_data[0][8]);
	
	$('#product_imageFromDBInDelete').attr('src','/~jadrn024/proj1/_DIRupld_/'+obj_data[0][9]);
	$('#product_imageFromDBInDelete').show();	

	$('#skuDeleteValidity').text("");	
}

function processDeleteUpload(){
       var sku = $('#skuDelete').val();
       var category = $('#categoryDelete').val();
       var vendor = $('#vendorDelete').val();
       var mid = $('#midDelete').val();
       var description = $('#descriptionDelete').val();
       var features = $('#featuresDelete').val();
       var cost = $('#costDelete').val();
       var retail = $('#retailDelete').val();
       var quantity = $('#quantityDelete').val();  

       var fname = "";   
       var url = "/perl/jadrn024/deleteData.cgi";
       url += "?sku="+sku+"&category=" + category + "&vendor="+vendor + "&mid="+mid + "&description="+description + "&features="+features + "&cost="+cost + "&retail="+retail + "&quantity="+quantity + "&product_image="+product_image;
       $.get(url,handleDataDelete);
}

function handleDataDelete(response){
       $('#answerDelete').css('color','blue');
       $('#answerDelete').html(response);    
	
	   var record = new Array();    
       record = response.split("|");
	   	
       var deletedData = `
		   <div class="alert alert-success">
		       <strong>Success!</strong> Your data is deleted.
		   </div>
           <table class="table table-striped table-bordered">
  			<thead class="thead-dark">
    			<tr>
      			<th scope="col">Label</th>
      			<th scope="col">Data</th>
    			</tr>
  			</thead>
  			<tbody>
   			 <tr>
     			 <th scope="row">Sku</th>
      			<td>${record[0]}</td>
    			</tr>
    			<tr>
      			<th scope="row">Category</th>
      			<td>${record[1]}</td>
    			</tr>
    			<tr>
      			<th scope="row">Vendor</th>
      			<td>${record[2]}</td>
    			</tr>
      			<th scope="row">Manufacturer's ID</th>
      			<td>${record[3]}</td>
    			</tr>
      			<th scope="row">Description</th>
      			<td>${record[4]}</td>
    			</tr>
      			<th scope="row">Features</th>
      			<td>${record[5]}</td>
    			</tr>
      			<th scope="row">Cost</th>
      			<td>${record[6]}</td>
    			</tr>
      			<th scope="row">Retail</th>
      			<td>${record[7]}</td>
    			</tr>
      			<th scope="row">Quantity</th>
      			<td>${record[8]}</td>
    			</tr>
      			<th scope="row">Image</th>
      			<td><img src="/~jadrn024/proj1/_DIRupld_/fileDeleted.jpeg" width="30%"/></td>
    			</tr>
  			</tbody>
			</table>
		`;	
		$('#answerDelete').html(deletedData);
                $('html, body').animate({
                    scrollTop: $("#answerDelete").offset().top
                }, 2000);
 	    $('form')[2].reset();  
		clearDeleteDate();
}
