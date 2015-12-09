var serverUrl = "http://localhost:8090/";



function login(entry){

	if(entry=="login"){
	if($("#checkPartner").is(":checked")){
		partnerLogin();
	}else{

		customerLogin();
	}
	}else{

	 if($("#checkPartnerReg").is(":checked")){
	 	partnerRegistration();
	}else{
		customerReg();		
	}
	}

}


function searchProduct(){
  var product = $("#productName").val();
  var url = serverUrl + "product?name=" + product;
  getJSON( url, function(data){
  	setLocalStorage("productList",data);
  	window.location="productList.html";
  });
}

/*function customerLogin(){
var customer = new Object();
customer.name = "joseph";
customer.password = "4588";
/*	postJSON(test,  function(data){
		alert(data);
  		// setLocalStorage("productList",data);
  		// window.location="productList.html";
  });

	$.postJSON = function(customerLoginUrl, customer, callback) {
    return jQuery.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': customerLoginUrl,
    'data': JSON.stringify(customer),
    'dataType': 'json',
    'success': alert(customer)
    });
};


}*/

function customerLogin() {
	var login = new Object();
login.name = $("#loginName").val();
login.password = $("#loginPassword").val();
	var loginUrl = serverUrl+ "customer/customer/authentication";
    $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': loginUrl,
    'data': JSON.stringify(login),
    'success': function(data){
    	setCustomerLocal(data);
		// alert(JSON.stringify(data));
		window.location = "index.html";},
	'error':   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
        );}
    });

}



function customerReg() {
	
	var login = new Object();
	login.name = $("#NameReg").val();
	login.password = $("#PasswordReg").val();

	var loginUrl = serverUrl+ "customer";
    $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': loginUrl,
    'data': JSON.stringify(login),
    'success': function(data){
    	window.location = "index.html";
		alert(JSON.stringify(data));},
	'error':   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
        );}
    });

}

function partnerLogin() {
	
	var login = new Object();
	login.name = $("#loginName").val();
	login.password = $("#loginPassword").val();

	var loginUrl = serverUrl+ "productowner/authentication";
    $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': loginUrl,
    'data': JSON.stringify(login),
    'success': function(data){
    	// alert(JSON.stringify(data));
		setPartnerLocal(data);
		window.location = "partnerHome.html";},
	'error':   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
        );}
    });

}
function setPartnerLocal(data){
	setLocalStorage("partnerAll",data);
	setLocalStorage("partnerName",data.name);
	var key = "";
	for(var i=0; i<data.link.length; i++){
		key += "partnerUrl" + data.link[i].action;
		setLocalStorage(key,data.link[i].url);
		key = "";
	}
}

function setCustomerLocal(data){
	setLocalStorage("customerAll",data);
	setLocalStorage("customerName",data.name);
	var key = "";
	for(var i=0; i<data.link.length; i++){
		key += "customerUrl" + data.link[i].action;
		setLocalStorage(key,data.link[i].url);
		key = "";
	}

}
function getPartnerProductList(){
	var url = getLocalStorage("partnerUrlviewProducts");
	console.log(url);
	getJSON( url, function(data){
  		setLocalStorage("partnerProductList",data);
  		renderPartnerProductList();
  	});
}

function getPartnerOrderList(){
	var url = getLocalStorage("partnerUrlviewOrders");
	console.log(url);
	getJSON( url, function(data){
		console.log(data);
  		
  		setLocalStorage("partnerOrderList",data);
  		renderOrderList();
  	});
	return getLocalStorage("partnerOrderList");
}

function getCustomerOrderList(){
	var url = getLocalStorage("customerUrlviewOrders");
	console.log(url);
	getJSON( url, function(data){
		console.log(data);
  		
  		setLocalStorage("customerOrderList",data);
  		renderCustomerOrderList();
  	});
	return getLocalStorage("partnerOrderList");
}


    

function partnerRegistration(){

	var login = new Object();
	login.name = $("#NameReg").val();
	login.password = $("#PasswordReg").val();
	var loginUrl = serverUrl+ "productowner";
    $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': loginUrl,
    'data': JSON.stringify(login),
    'success': function(data){
    	// alert(JSON.stringify(data));
		setPartnerLocal(data);
		window.location = "partnerHome.html";},
	'error':   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
        );}
    });	
}


function addToCart(){

	var orderDetail = new Object();
	orderDetail.productId = getLocalStorage("actualProductId");
	orderDetail.quantity = 1;
	var cartUrl = getLocalStorage("customerUrladdProductToCart");
    $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': cartUrl,
    'data': JSON.stringify(orderDetail),
    'success': function(data){
    	alert("Added to Cart!!!");
		window.location = "index.html";},
	'error':   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
        );}
    });	
}


function getCart() {
	var url = getLocalStorage("customerUrlviewCart");
	getJSON( url, function(data){
		var aux = data.link;
		var p;
		for(var i=0; i<aux.length; i++){
			if(aux[i].action == "viewOrderDetails"){
				p = aux[i].url;
  				break;
			}
		}
		getJSON( p, function(data){
  			setLocalStorage("cartProducts",data);
  			renderCart();
  	});
  	});
}




function getProductDetail(link,prodId) {
	var aux = link;
	var p;
	for(var i=0; i<aux.length; i++){
		if(aux[i].action == "self"){
			p = aux[i].url;
  			break;
		}
	}
	getJSON( p, function(data){
  		setLocalStorage("product",data);
  		setLocalStorage("actualProductId",prodId);
  		window.location="product.html";
  	});
}


function shipOrder(link) {
	var aux = link;
	var updateUrl;

    var newOrder = new Object();
    newOrder.status = "SHIPPED";
	for(var i=0; i<aux.length; i++){
		if(aux[i].action == "shipOrder"){
			updateUrl = aux[i].url;
  			break;
		}
	}
        $.ajax({
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        'type': 'PUT',
        'url': updateUrl,
        'data': JSON.stringify(newOrder),
        'success': function(data){
            alert("Shipped!");
            window.location = "partnerHome.html";},
        'error':   function(jqXHR, textStatus, errorThrown) {
            alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
            );}
          });
}

function cancelOrder(link) {
	var aux = link;
	var updateUrl;

    var newOrder = new Object();
    newOrder.status = "CANCELED";
	for(var i=0; i<aux.length; i++){
		if(aux[i].action == "self"){
			updateUrl = aux[i].url;
  			break;
		}
	}
        $.ajax({
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        'type': 'PUT',
        'url': updateUrl,
        'data': JSON.stringify(newOrder),
        'success': function(data){
            alert("Cancelled!");
            window.location = "index.html";},
        'error':   function(jqXHR, textStatus, errorThrown) {
            alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
            );}
          });
}

    
      function clearCart(){
        var deleteUrl = getLocalStorage("customerUrlviewCart");
        $.ajax({
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        'type': 'DELETE',
        'url': deleteUrl,
        'success': function(data){
            // alert(JSON.stringify(data));
            localStorage.cartProducts = "";
            alert("Cart deleted!!!");
            window.location = "index.html";},
        'error':   function(jqXHR, textStatus, errorThrown) {
            alert("Error, status = " + textStatus + ", " +
              "error thrown: " + errorThrown
            );}
          });         

      }




function renderOrderList(){

var renderName = "<h1><span class='primary'>"+getLocalStorage("partnerName")+"</span></h1>";
      $("#partnerNameRender").html(renderName);
      var partnerOrderList = getLocalStorage("partnerOrderList");
      var renderTable = "";
      renderTable += "<div class='panel-heading'>Products</div>";
      renderTable += "<table class='table'>";
      renderTable += "<thead>";
      renderTable += "<th>Status</th>";
      renderTable += "<th>OrderDate</th>";
      renderTable += "<th>Ship</th>";
      renderTable += "</thead>";
      for(var i=0; i<partnerOrderList.length; i++){
        renderTable += "<tr>";
        renderTable += "<td>"+partnerOrderList[i].status+"</td>";
        renderTable += "<td>"+partnerOrderList[i].orderDate+"</td>";
        renderTable += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onClick='shipOrder("+JSON.stringify(partnerOrderList[i].link)+")'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
        renderTable += "</tr>";

      }
      renderTable += "</table>";

      $("#partnerOrderList").html(renderTable);

}

function renderCustomerOrderList(){

      var customerOrderList = getLocalStorage("customerOrderList");
      var renderTable = "";
      renderTable += "<div class='panel-heading'>Products</div>";
      renderTable += "<table class='table'>";
      renderTable += "<thead>";
      renderTable += "<th>Status</th>";
      renderTable += "<th>OrderDate</th>";
      renderTable += "<th>Cancel</th>";
      renderTable += "</thead>";
      for(var i=0; i<customerOrderList.length; i++){
        renderTable += "<tr>";
        renderTable += "<td>"+customerOrderList[i].status+"</td>";
        renderTable += "<td>"+customerOrderList[i].orderDate+"</td>";
        renderTable += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onClick='cancelOrder("+JSON.stringify(customerOrderList[i].link)+")'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
        renderTable += "</tr>";

      }
      renderTable += "</table>";

      $("#customerOrderList").html(renderTable);

}

function renderPartnerProductList(){

      var partnerProductList = getLocalStorage("partnerProductList");
      var renderTable = "";
      renderTable += "<div class='panel-heading'>Products</div>";
      renderTable += "<table class='table'>";
      renderTable += "<thead>";
      renderTable += "<th>Name</th>";
      renderTable += "<th>Price</th>";
      renderTable += "<th>Quantity</th>";
      renderTable += "<th>Edit</th>";
      renderTable += "<th>Delete</th>";
      renderTable += "</thead>";
      for(var i=0; i<partnerProductList.length; i++){
        renderTable += "<tr>";
        renderTable += "<td>"+partnerProductList[i].name+"</td>";
        renderTable += "<td>"+partnerProductList[i].price+"</td>";
        renderTable += "<td>"+partnerProductList[i].quantity+"</td>";
        renderTable += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onClick='editProduct("+JSON.stringify(partnerProductList[i].link)+")'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
        renderTable += "<td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-primary btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onClick='deleteProduct("+JSON.stringify(partnerProductList[i].link)+")' ><span class='glyphicon glyphicon-trash'></span></button></p></td>";
        renderTable += "</tr>";

      }
      renderTable += "</table>";






	$("#partnerProductList").html(renderTable);
}

function renderProductList(){
	var total = "";
	var productList = getLocalStorage("productList");
	for(var i=0; i<productList.length; i++){
		total += "<div class='item  col-xs-4 col-lg-4'>";
		total += "<div class='thumbnail'>";
		total += "<img class='group list-group-image' src="+ productList[i].img + ">";
		total += "<div class='caption'>";
		total += "<h4 class='group inner list-group-item-heading'>"+productList[i].name+"</h4>";
		total += "<p class='group inner list-group-item-text'>Partner: "+productList[i].productOwnerName+" </p>";
		total += "<div class='row'>";
		total += "<div class='col-xs-12 col-md-6'>";
		total += "<p class='lead'>$"+productList[i].price+" </p>";
		total += "</div>";
		total += "<div class='col-xs-12 col-md-6'>";
		// total += "<a class='btn btn-success' href='#'  onClick = "+ getProductDetail(productList[i].link)+">Details</a>";
		total += "<a class='btn btn-success'  onClick = getProductDetail("+JSON.stringify(productList[i].link)+","+productList[i].id+") name="+JSON.stringify(productList[i].link)+" value="+JSON.stringify(productList[i].link)+">Details</a>";
		total += "</div></div></div></div></div>";

	}
	
	$("#products").html(total);
}
              
function renderProductPage(){
	var total = "";
	var product = getLocalStorage("product");
	total += "<div class='col-md-8'>";
	total += "<div class='row'>";
	total += "<div class='col-md-4'>";
	total += "<img class='main-image' src="+product.img+">";
	total += "</div>";
	total += "<div class='col-md-8'>";
	total += "<h2>"+product.name+"</h2>";
	total += "<div class='price'>$"+product.price+"</div>";
	total += "<hr/>";
	total += "<p>";
	total += "Quantity:";
	total += "<select class='form-control' id='productQuantity'>";
	total += "<option value='1'>1</option>";
	total += "<option value='2'>2</option>";
	total += "<option value='3'>3</option>";
	total += "<option value='4'>4</option>";
	total += "<option value='5'>5</option>";
	total += "</select>";
	total += "</p>";
	total += "<a onClick='addToCart()' class='btn btn-success'>Add to Cart</a>";
	total += "<br/><br/><br/>";
	total += "<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
	total += "<div class='panel panel-default'>";
	total += "<div class='panel-heading' role='tab' id='headingOne'>";
	total += "<h4 class='panel-title'>";
	total += "<a data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>";
	total += "Description";
	total += "</a>";
	total += "</h4>";
	total += "</div>";
	total += "<div id='collapseOne' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>";
	total += "<div class='panel-body'>";
	total += product.description;
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	// total += "<div class='col-md-4'>";
	// total += "<div class='list-group'>";
	// total += "<a href='#' class='list-group-item'>Category One</a>";
	// total += "<a href='#' class='list-group-item'>Category Two</a>";
	// total += "<a href='#' class='list-group-item'>Category Three</a>";
	// total += "<a href='#' class='list-group-item'>Category Four</a>";
	// total += "<a href='#' class='list-group-item'>Category Five</a>";
	// total += "</div>";
	// total += "</div>";

	
	$("#productDetails").html(total);
	// alert($("#productQuantity").val())
}

function renderCart(){
	var total = "";
	var totalValue = 0;
	// test
	var cartItems = getLocalStorage("cartProducts");
	total += "<div class='panel-heading'>";
	total += "<div class='panel-title'>";
	total += "<div class='row'>";
	total += "<div class='col-xs-6'>";
	total += "<h5><span class='glyphicon glyphicon-shopping-cart'></span> Shopping Cart</h5>";
	total += "</div>";
	total += "<div class='col-xs-6'>";
	total += "<a href='index.html' class='btn btn-primary btn-sm btn-block'>";
	total += "<span class='glyphicon glyphicon-share-alt'></span> Continue shopping";
	total += "</a>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "<div class='panel-body'>";

	for(var i=0; i<cartItems.length; i++){

		total += "<div class='row'>";
		total += "<div class='col-xs-2'><img class='img-responsive' src="+cartItems[i].img+">";
		total += "</div>";
		total += "<div class='col-xs-4'>";
		total += "<h4 class='product-name'><strong>"+cartItems[i].name+"</strong></h4><h4><small>"+cartItems[i].description+"</small></h4>";
		total += "</div>";
		total += "<div class='col-xs-6'>";
		total += "<div class='col-xs-6 text-right'>";
		total += "<h6><strong>"+cartItems[i].price+"<span class='text-muted'>x</span></strong></h6>";
		total += "</div>";
		total += "<div class='col-xs-4'>";
		total += "<input type='text' class='form-control input-sm' value='1'>";
		total += "</div>";
		total += "<div class='col-xs-2'>";
		total += "<button type='button' class='btn btn-link btn-xs'>";
		total += "<span class='glyphicon glyphicon-trash'> </span>";
		total += "</button>";
		total += "</div>";
		total += "</div>";
		total += "</div>";
		total += "<hr>";
		totalValue += parseInt(cartItems[i].price);

	}
	total += "<div class='row'>";
	total += "<div class='text-center'>";
	// total += "<div class='col-xs-9'>";
	// total += "<h6 class='text-right'>Added items?</h6>";
	// total += "</div>";
	// total += "<div class='col-xs-3'>";
	// total += "<a class='btn btn-default btn-sm btn-block' onClick='clearCart()'> Clear Cart</a>";
	// total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "</div>";
	total += "<div class='panel-footer'>";
	total += "<div class='row text-center'>";
	total += "<div class='col-xs-9'>";
	total += "<h4 class='text-right'>Total <strong>$"+totalValue+"</strong></h4>";
	total += "</div>";
	total += "<div class='col-xs-3'>";
	total += "<a href = 'payment.html' class='btn btn-success btn-block'>";
	total += "Checkout";
	total += "</a>";
	total += "</div></div></div>";
	total += "";
	
	$("#cartItems").html(total);
}


        
        
          
            
              
            
            
             







function getJSON(url, successCallback) {
	$.ajax(
	{
		// headers: {
  //   		"Authorization": "Basic " + btoa("USERNAME" + ":" + "PASSWORD")
  // 		},
		type: "GET",
		url: url,
		success:  function(data) { successCallback(data); },
		contentType: "application/json",
		dataType: "json"
	}
	);
}


function postJSON(json, url, successCallback) {


	$.ajax(
	{
		type: "POST",
		url: url,
		data: json,
		success:  function(data) {
			
			successCallback(data);
		},
		contentType: "application/json",
		dataType: "json"
	}
	);
}



function setLocalStorage(key,object) {
	window.localStorage.setItem(key, JSON.stringify(object));
}
function getLocalStorage(key) {
	var aux = window.localStorage.getItem(key);
	return JSON.parse(aux);
}



function renderProductListHomePage(){
	var total = "";
	var productList = getLocalStorage("productList");
	for(var i=0; i<6; i++){
		total += "<div class='col-md-4'>"+
	  			  "<div class='thumbnail'>"+
	    		   "<img src=" +productList[i].img+">";
	    total+= "<div class='caption'> <h4 class='pull-right'>"+ productList[i].price+"</h4>"+
	     "<h4><a href='product.html'>"+productList[i].name+"</a></h4> <p>"+productList[i].productOwnerName+"</p>"+
	   "</div><p class='pull-right'></p> <p>";
 /*for(var i=0;i< productList[i].review; i++){
	total+= "<span class='glyphicon glyphicon-star'></span>";
			}*/
	 total+="</p></div></div></div>";

	   	}
	
	$("#homeProducts").html(total);
}

 


