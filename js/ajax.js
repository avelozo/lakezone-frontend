var serverUrl = "http://localhost:8090/";


function searchProduct(){
  var product = $("#productName").val();
  var url = serverUrl + "product?name=" + product;
  getJSON( url, function(data){
  	setLocalStorage("productList",data);
  	window.location="productList.html";
  });
}


          


function getProductDetail(link) {
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
  		window.location="product.html";
  	});
}



function renderProductList(){
	var total = "";
	var productList = getLocalStorage("productList");
	for(var i=0; i<productList.length; i++){
		total += "<div class='item  col-xs-4 col-lg-4'>";
		total += "<div class='thumbnail'>";
		total += "<img class='group list-group-image' src="+ productList[i].img + " alt='' />";
		total += "<div class='caption'>";
		total += "<h4 class='group inner list-group-item-heading'>"+productList[i].name+"</h4>";
		total += "<p class='group inner list-group-item-text'>Partner: "+productList[i].productOwnerName+" </p>";
		total += "<div class='row'>";
		total += "<div class='col-xs-12 col-md-6'>";
		total += "<p class='lead'>$"+productList[i].price+" </p>";
		total += "</div>";
		total += "<div class='col-xs-12 col-md-6'>";
		// total += "<a class='btn btn-success' href='#'  onClick = "+ getProductDetail(productList[i].link)+">Details</a>";
		total += "<a class='btn btn-success'  onClick = getProductDetail("+JSON.stringify(productList[i].link)+") name="+JSON.stringify(productList[i].link)+" value="+JSON.stringify(productList[i].link)+">Details</a>";
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
	total += "<img class='main-image' src="+product.img+"/>";
	total += "</div>";
	total += "<div class='col-md-8'>";
	total += "<h2>"+product.name+"</h2>";
	total += "<div class='price'>$"+product.price+"</div>";
	total += "<hr/>";
	total += "<p>";
	total += "Quantity:";
	total += "<select class='form-control'>";
	total += "<option value='1'>1</option>";
	total += "<option value='2'>2</option>";
	total += "<option value='3'>3</option>";
	total += "<option value='4'>4</option>";
	total += "<option value='5'>5</option>";
	total += "</select>";
	total += "</p>";
	total += "<a href='#' class='btn btn-success'>Add to Cart</a>";
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
	total += "<div class='col-md-4'>";
	total += "<div class='list-group'>";
	total += "<a href='#' class='list-group-item'>Category One</a>";
	total += "<a href='#' class='list-group-item'>Category Two</a>";
	total += "<a href='#' class='list-group-item'>Category Three</a>";
	total += "<a href='#' class='list-group-item'>Category Four</a>";
	total += "<a href='#' class='list-group-item'>Category Five</a>";
	total += "</div>";
	total += "</div>";

	
	$("#productDetails").html(total);
}




function getJSON(url, successCallback) {
	$.ajax(
	{
		type: "GET",
		url: url,
		success:  function(data) { successCallback(data); },
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

