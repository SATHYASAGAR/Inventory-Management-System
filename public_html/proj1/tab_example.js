$(document).ready(function() {

    $("#tabs").tabs();  
    
    $('#sku').on('blur', function() {
    	var sku = $('#sku').val();
    	if(!sku) return;
    	var url = "/perl/jadrn024/check_duplicate.cgi?sku="+sku;
    	$.get(url, process_reply);
    });
  });
  
  
function process_reply(response) {
    $('#status').show();
    if(response == "OK"){ 
    	$('#status').text("OK, not a duplicate");  
	$('#submitButton').prop('disabled',false);
    }	
    else{ 
        $('#status').text("ERROR - Duplicate sku");
	$('#submitButton').prop('disabled',true);
    }
    
    }
