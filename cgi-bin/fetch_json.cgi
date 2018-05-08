#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use DBI;

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn024SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});   
my $sid = $session->id;

if($cookie_sid ne $sid) {
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

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn024";
my $username = "jadrn024";
my $password = "bottom";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";


my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $sku = $q->param("sku");

my $query = "select * from product where sku = '$sku'";
            
my $sth = $dbh->prepare($query);
$sth->execute();

$response .= '[';
while(my @row=$sth->fetchrow_array()) {
    $response .= "[";
    foreach $item (@row) {
        $response .= '\''.$item . '\',';
    }
    $response = substr $response, 0, (length($response)-1); 
    $response .= '],';
    }   
    $response = substr $response, 0, (length($response)-1);    
    $response .= ']';  
     
unless($response) {
    $response = "invalid";
    }    
$sth->finish();
$dbh->disconnect();
    
print "Content-type: text/html\n\n";
print $response; 