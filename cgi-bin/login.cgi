use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;

##---------------------------- MAIN ---------------------------------------

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn024SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});   
my $sid = $session->id;

if(authenticate_user()) {
    	send_to_main();   
}
else {
    	send_to_login_error();
		return;
    } 
  
###########################################################################

###########################################################################

sub authenticate_user {
    $q = new CGI;
    my $user = $q->param("user");
    my $password = $q->param("password");    
    open DATA, "</srv/www/cgi-bin/jadrn024/passwords.dat" 
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;    
    if($stored_user eq $user && check_password($stored_pass, $password)) {
        $OK = 1;
        last;
        }
    }
          
    return $OK;
    }
###########################################################################

###########################################################################
sub send_to_login_error {
    print <<END;
Content-type:  text/html


<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn024/proj1/error.html" />
</head><body></body>
</html>

END
return;
    }  
    
###########################################################################
      
###########################################################################
sub send_to_main {
# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP 
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID  
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn024SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
    my $sid = $session->id;
print <<END;
Content-type: text/html

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/perl/jadrn024/add_update_delete.cgi" />
</head><body></body>
</html>

END
}
###########################################################################    
    

