/*   
Nagendra, Sathyasagar    
 Account:  jadrn024
Class: CS645, Spring 2018
Assignment :  Project #1 */ 

$(document).ready(function() {
	//alert("asdfasdf");
	$("[name='user']").val('');
	$("[name='password']").val('');
	$("[name='user']").focus();	

	
	$('#userValidity').html("Required");

	$('#passwordValidity').html("Required");

	$('#user').on('focus',function() {
	    $('#userValidity').html("");
    });

    $('#password').on('focus',function() {
        $('#passwordValidity').html("");
    });

	$('#user').on('blur', function(){
		var user = $('#user').val();
		if(!user){
		$('#userValidity').html("Required");
		}
	});

	$('#password').on('blur', function(){
		var password = $('#password').val();
		if(password.trim()===""){$('#passwordValidity').html("Required");}
	});

	$('#login').on('submit', function(){
		var user = $('#user').val();
		var password = $('#password').val();
		if(password.trim()==="" || user.trim()===""){$('#loginValidity').html("Please enter both Username and Password");}
	});
});
