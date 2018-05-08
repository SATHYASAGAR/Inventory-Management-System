use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie('jadrn024SID') || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn024SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  


print <<END;    
    
<html>
<head>
    <script src="/jquery/jquery.js"></script>
    <script src="http://jadran.sdsu.edu/~jadrn024/proj1/log_out.js"></script>     
</head>
<body>
<h2>You are now logged out<h2>
</body>
</html>

END
