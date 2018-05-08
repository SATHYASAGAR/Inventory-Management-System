/*   
Nagendra, Sathyasagar    
 Account:  jadrn024
Class: CS645, Spring 2018
Assignment :  Project #1 */

//reference: https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate 

//Below code is to take care of the log out and back button press condition
$(document).ready(function() {

	window.onpopstate = function() {		
		window.location.href="http://jadran.sdsu.edu/~jadrn024/proj1/error.html";  //Below line redirects to the error page

	};
	history.pushState({},'');

});