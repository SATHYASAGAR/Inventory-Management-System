use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use DBI;

my $q = new CGI;
my $cookie_sid = $q->cookie("jadrn024SID");
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});   
my $sid = $session->id;

if($cookie_sid ne $sid) {
	print "Content-type:  text/html\n\n";
	print "http://jadran.sdsu.edu/~jadrn024/proj1/error.html";
	return;
}

my $q = new CGI;
my $sku = $q->param('sku');

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn024';
my $username = 'jadrn024';
my $password = 'bottom';

my $database_source = "dbi:mysql:$database:$host:$port";
my $dbh = DBI->connect($database_source, $username, $password)
	or die "Cannot connect to DB";
	
my $sth = $dbh->prepare("SELECT sku FROM product WHERE sku='$sku'");
$sth->execute();
my $number_of_rows = $sth->rows;
$sth->finish();
$dbh->disconnect();
print "content-type: text/html\n\n";
if($number_of_rows == 0) {
	print "OK";
	}
else {
	print "DUPLICATE SKU!";
	}
