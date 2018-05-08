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

####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn024/public_html/proj1/_DIRupld_';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################

my $q = new CGI;
my $sku = $q->param('sku');
my $category = $q->param('category');
my $vendor = $q->param('vendor');
my $mid = $q->param('mid');
my $description = $q->param('description');
my $features = $q->param('features');
my $cost = $q->param('cost');
my $retail = $q->param('retail');
my $quantity = $q->param('quantity');
my $filename = $q->param('product_image');

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn024';
my $username = 'jadrn024';
my $password = 'bottom';

my $database_source = "dbi:mysql:$database:$host:$port";
my $dbh = DBI->connect($database_source, $username, $password)
	or die "Cannot connect to DB";

####################################################################
# START: Code to upload the file
####################################################################

unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
$filename = $sku.".".JPG;

####################################################################
# END: Code to upload the file
####################################################################

####################################################################
# START: Code to insert data into database
####################################################################

my $sth = $dbh->prepare("INSERT INTO product VALUES('$sku', $category, $vendor,'$mid', '$description', '$features',$cost, $retail, $quantity, '$filename')");

$sth->execute();
my $number_of_rows = $sth->rows;
$sth->finish();
$dbh->disconnect();

####################################################################
# END: Code to insert data into database
####################################################################

if($number_of_rows < 0) {

print <<EOF;
Content-type: text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />	 
</head>
<body>
<div> 
<h3>Error while inserting record:</h3>
<div> sku: sku </div>
<div> category: $category </div>
<div> vendor: $vendor </div>
<div> mid: $mid </div>
<div> description: $description </div>
<div> features: $feature </div>
<div> cost: $cost </div>
<div> retail: $retail </div>
<div> quantity: $quantity </div>
<div> filename: $filename </div>
</div>
</body>
</html>

EOF

return;
}

my $seperator = "|";
my $response = $sku.$seperator.$category.$seperator.$vendor.$seperator.$mid.$seperator.$description.$seperator.$features.$seperator.$cost.$seperator.$retail.$seperator.$quantity.$seperator.$filename;

print "Content-type: text/html\n\n";
print $response;

# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }
