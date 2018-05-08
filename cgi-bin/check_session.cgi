use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn024SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});   
my $sid = $session->id;

if($cookie_sid ne $sid){
	print "Content-type:  text/html\n\n";
	print " my_cookie_sid = ".$cookie_sid;
	print " my_sid = ".$sid; 
	print "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
}
else{
	print "Content-type:  text/html\n\n";
	print " my_cookie_sid = ".$cookie_sid;
	print " my_sid = ".$sid; 
	print " RESULT OK ";
}

return;