#!/usr/bin/perl 

#   file upload script.  
#   Remember that you MUST use enctype="mulitpart/form-data"
#   in the web page that invokes this script, and the destination 
#   directory for the uploaded file must have permissions set to 777.  
#   Do NOT set 777 permission on any other directory in your account!
#   
#   CS645, Spring 2013
#   Alan Riggins

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

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
my $filename = $q->param("product_image");
my $sku = $q->param("sku");
unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
my ($name, $path, $extension) = fileparse($filename, '/..*/');
$filename = $name.$extension;

$filename = $sku.".".JPG;

$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }   

$filename = untaint($filename);

# get a handle on the uploaded image     
my $filehandle = $q->upload("product_image"); 

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    print UPLOADFILE $_;
    }
close UPLOADFILE;

print "Content-Type: text/html\n\n";
print "OK";

# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }