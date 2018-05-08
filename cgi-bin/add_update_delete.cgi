use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn024SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
    print <<END;
Content-type: text/html

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=http://jadran.sdsu.edu/~jadrn024/proj1/error.html" />
</head><body></body>
</html>

END
return;
}

print <<END;
Content-type: text/html

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html;charset=utf-8" />
    <title>Add Update & Delete records</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>    
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
	<script src="http://jadran.sdsu.edu/~jadrn024/proj1/ajax_tab_example.js"></script>
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn024/proj1/tab_example1.css"/>
    
</head>
<body>
	<a name="top"></a>
	<nav class="navbar navbar-dark bg-dark py-0">
		<a class="navbar-brand" href="#">Welcome!</a>
	  	<h2><a class="navbar-brand btn btn-outline-success" href="/perl/jadrn024/logout.cgi">Logout</a></h2>
	</nav>

	  <div class="container py-4 ">
	    <div id="tabs">
	      <ul class="ulTabs">
	        <li id="newRecordTab" ><a href="#tabs-1" ><span>New Record</span></a></li>
	        <li id="editRecordTab" ><a href="#tabs-2" ><span>Edit Record</span></a></li>
	        <li id="deleteRecordTab" ><a href="#tabs-3" ><span>Delete Record</span></a></li>       
	      </ul>
	    <div id="tabs-1">
	   	<h3>New Record</h3>
		<form method="post" enctype="multipart/form-data" action="" class="center-div">
		<div class = "form-group">
	         <label>SKU</label>
	         <input class="form-control" type="text" name="sku" id="sku" maxlength="7">
			 <label id="skuValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Category</label>
	         <select class="form-control custom-select" name="category" id="category">
				<option value = '-1'>Select category</option>
				<option value = '1'>Earbud</option>
				<option value = '2'>Over-ear</option>
				<option value = '3'>On-ear</option>
				<option value = '4'>Bluetooth</option>
				<option value = '5'>Sports</option>
				<option value = '6'>Noise-cancelling</option>
				<option value = '7'>Pro audio</option>
			 </select>
			 <label id="categoryValidity" class="validity"></label>  
	     </div>
		 <div class = "form-group">
		 	 <label>Vendor</label>
	         <select class="form-control custom-select" name="vendor" id="vendor">
				<option value = '-1'>Select vendor</option>
				<option value = '1'>Beats</option>
				<option value = '2'>Bose</option>
				<option value = '3'>Panasonic</option>
				<option value = '4'>Sony</option>
				<option value = '5'>TaoTronics</option>
				<option value = '6'>VAVA</option>
				<option value = '7'>Skullcandy</option>
				<option value = '8'>Mpow</option>
			 </select>
			 <label id="vendorValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Manufacturer's Id</label>
	         <input class="form-control" type="text" name="mid" id="mid">
			 <label id="midValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Description</label>
	         <textarea class="form-control" name="description" id="description" rows="3"></textarea>
			 <label id="descriptionValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Features</label>
	         <textarea class="form-control" name="features" id="features" rows="6"></textarea>
			 <label id="featuresValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Cost</label>
	         <input class="form-control" type="number" name="cost" id="cost">
			 <label id="costValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Retail</label>
	         <input class="form-control" type="number" name="retail" id="retail">
			 <label id="retailValidity" class="validity"></label> 
	     </div>
		 <div class = "form-group">
		 	 <label>Quantity</label>
	         <input class="form-control" type="number" name="quantity" id="quantity">
			 <label id="quantityValidity" class="validity"></label> 
		 </div>
		 <div class = "form-group">
		 	 <label>Upload Image</label>
		 	 <input class="form-control" type="file" name="product_image" id="product_image"/> 
			 <label id="fnameValidity" class="validity"></label> 
		 </div>
		 <div class = "form-group">
		 	 <label></label>
		 	 <input class="btn btn-secondary btn-lg btn-block"  type="reset" value="Clear" id="deleteInsertClearButton"/>
		 	 <input class="btn btn-primary btn-lg btn-block"  type="button" id="submitButton" value="Submit"/> 
			 <label id="submitValidity" class="validity"></label>
	    	 <h3 id="status"></h3>
			 <h3 id="uploadStatus" class="uploadStatus"></h3>  
		 </div> 
		</form>
		
		<div id="answer"></div>
		</div>

	      <div id="tabs-2">
	        <h3>
	          Edit Record
	        </h3>
		<form method="post" enctype="multipart/form-data" action="" class="center-div">
		 <div class = "form-group">
	         <label>SKU</label>
	         <input class="form-control" type="text" name="skuUpdate" id="skuUpdate" maxlength="7">
			 <label id="skuUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Category</label>
	         <select class="form-control custom-select" name="categoryUpdate" id="categoryUpdate">
				<option value = '-1'>Select category</option>
				<option value = '1'>Earbud</option>
				<option value = '2'>Over-ear</option>
				<option value = '3'>On-ear</option>
				<option value = '4'>Bluetooth</option>
				<option value = '5'>Sports</option>
				<option value = '6'>Noise-cancelling</option>
				<option value = '7'>Pro audio</option>
			</select>
			 <label id="categoryUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Vendor</label>
	         <select class="form-control custom-select" name="vendorUpdate" id="vendorUpdate">
				<option value = '-1'>Select vendor</option>
				<option value = '1'>Beats</option>
				<option value = '2'>Bose</option>
				<option value = '3'>Panasonic</option>
				<option value = '4'>Sony</option>
				<option value = '5'>TaoTronics</option>
				<option value = '6'>VAVA</option>
				<option value = '7'>Skullcandy</option>
				<option value = '8'>Mpow</option>
			</select>
			 <label id="vendorUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Manufacturer's Id</label>
	         <input class="form-control" type="text" name="midUpdate" id="midUpdate">
			 <label id="midUpdateValidity" class="validity"></label> 
	         </div>	
		 <div class = "form-group">
		 <label>Description</label>
	         <textarea class="form-control" name="descriptionUpdate" id="descriptionUpdate" rows="3"></textarea>
			 <label id="descriptionUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Features</label>
	         <textarea class="form-control" name="featuresUpdate" id="featuresUpdate" rows="6"></textarea>
			 <label id="featuresUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Cost</label>
	         <input class="form-control" type="number" name="costUpdate" id="costUpdate">
			 <label id="costUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Retail</label>
	         <input class="form-control" type="number" name="retailUpdate" id="retailUpdate">
			 <label id="retailUpdateValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Quantity</label>
	         <input class="form-control" type="number" name="quantityUpdate" id="quantityUpdate">
			 <label id="quantityUpdateValidity" class="validity"></label> 
		 </div>
		 <div class = "form-group">
		 <label>Re-Upload Image</label>
		 <input class="form-control" type="file" name="product_imageUpdate" id="product_imageUpdate"/> 
	     <div><img id="product_imageFromDB"  class="product_imageFromDB"  src=""></div>
		 </div>
		 <div class = "form-group">
		 	<input id="deleteClearButton" class="btn btn-secondary btn-lg btn-block" type="reset"  value="Clear" />
		 	<input class="btn btn-primary btn-lg btn-block" type="button" id="submitButtonUpdate"  value="Submit"/>
			<label id="submitUpdateValidity" class="validity"></label> 	
	    	<h3 id="statusUpdate"></h3>
			<h3 id="uploadStatusUpdate" class="uploadStatusUpdate"></h3>  	
		 </div> 
		</form> 		
		<div id="answerUpdate"></div>
	   </div>

	      <div id="tabs-3">
	        <h3>
	          Delete Record
	        </h3>
		<form method="post" enctype="multipart/form-data" action="" class="center-div">
		 <div class = "form-group">
	         <label>SKU</label>
	         <input class="form-control" type="text" name="skuDelete" id="skuDelete" maxlength="7">
		     <label id="skuDeleteValidity" class="validity"></label> 
	         </div>
		 <div class = "form-group">
		 <label>Category</label>
	         <select class="form-control custom-select" name="categoryDelete" id="categoryDelete" disabled>
				<option value = '-1'>Select category</option>
				<option value = '1'>Earbud</option>
				<option value = '2'>Over-ear</option>
				<option value = '3'>On-ear</option>
				<option value = '4'>Bluetooth</option>
				<option value = '5'>Sports</option>
				<option value = '6'>Noise-cancelling</option>
				<option value = '7'>Pro audio</option>
			</select>
	         </div>
		 <div class = "form-group">
		 <label>Vendor</label>
	         <select class="form-control custom-select" name="vendorDelete" id="vendorDelete" disabled>
				<option value = '-1'>Select vendor</option>
				<option value = '1'>Beats</option>
				<option value = '2'>Bose</option>
				<option value = '3'>Panasonic</option>
				<option value = '4'>Sony</option>
				<option value = '5'>TaoTronics</option>
				<option value = '6'>VAVA</option>
				<option value = '7'>Skullcandy</option>
				<option value = '8'>Mpow</option>
			</select>
	         </div>
		 <div class = "form-group">
		 <label>Manufacturer's Id</label>
	         <input class="form-control" type="text" name="midDelete" id="midDelete" readonly>
	         </div>
		 <div class = "form-group">
		 <label>Description</label>
	         <textarea class="form-control" name="descriptionDelete" id="descriptionDelete" rows="3" readonly></textarea>
	         </div>
		 <div class = "form-group">
		 <label>Features</label>
	         <textarea class="form-control" name="featuresDelete" id="featuresDelete" rows="6" readonly></textarea>
	         </div>
		 <div class = "form-group">
		 <label>Cost</label>
	         <input class="form-control" type="number" name="costDelete" id="costDelete" readonly>
	         </div>
		 <div class = "form-group">
		 <label>Retail</label>
	         <input class="form-control" type="number" name="retailDelete" id="retailDelete" readonly>
	         </div>
		 <div class = "form-group">
		 <label>Quantity</label>
	         <input class="form-control" type="number" name="quantityDelete" id="quantityDelete" readonly>
		 </div>
		 <div class = "form-group">
			<img id="product_imageFromDBInDelete" class="product_imageFromDB" src="">
		 	<input class="btn btn-secondary btn-lg btn-block" type="reset" value="Clear" id="deleteDeleteClearButton"/>
		 	<input class="btn btn-primary btn-lg btn-block" type="button" id="submitButtonDelete" value="Delete"/> 
	    	<h3 id="statusDelete"></h3>
			<h3 id="uploadStatusDelete" class="uploadStatusDelete"></h3>
		 </div> 
		</form>
		<div id="answerDelete"></div>
		</div> 
	</div>
		<a href="#top" class="float-left">Back to top</a>
</body>
</html>

END