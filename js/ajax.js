var serverUrl = "http://localhost:8090/";


function searchProduct(){
  var product = $("#productName").val();
  getJSON("product",product, function(data){
  	setLocalStorage("productList",data);
  	window.location="productList.html";
  	// renderProductList();

  });
}

// function renderProductList(){
// 	var total = "";
// 	var productList = getLocalStorage("productList");
// 	total += "<table class='table table-bordered table-hover'>";
// 	total += "<thead>";
// 	total += "<tr>";
// 	total += "<th>Product</th>";
// 	total += "<th>Price</th>";
// 	total += "<th>Partner</th>";

// 	total += "</tr>";
// 	total += "</thead>";
// 	total += "<tbody>";
// 	for(var i=0; i<productList.length; i++){
// 		total += "<tr>";
// 		total += "<td>" + productList[i].name + "</td>";
// 		total += "<td>" + productList[i].price + "</td>";
// 		total += "<td>" + productList[i].productOwnerName + "</td>";

// 		total += "</tr>";
// 	}
// 	total += "</tbody>";
// 	total += "</table>";
// 	$("#productList").html(total);

// }

function renderProductList(){
	var total = "";
	var productList = getLocalStorage("productList");
	for(var i=0; i<productList.length; i++){
		total += "<div class='item  col-xs-4 col-lg-4'>";
		total += "<div class='thumbnail'>";
		total += "<img class='group list-group-image' src='http://placehold.it/400x250/000/fff' alt='' />";
		total += "<div class='caption'>";
		total += "<h4 class='group inner list-group-item-heading'>"+productList[i].name+"</h4>";
		total += "<p class='group inner list-group-item-text'>Partner: "+productList[i].productOwnerName+" </p>";
		total += "<div class='row'>";
		total += "<div class='col-xs-12 col-md-6'>";
		total += "<p class='lead'>$"+productList[i].price+" </p>";
		total += "</div>";
		total += "<div class='col-xs-12 col-md-6'>";
		total += "<a class='btn btn-success' href='http://www.jquery2dotnet.com'>Details</a>";
		total += "</div></div></div></div></div>";

	}
	


	$("#products").html(total);

}

          
                        
                        
                           


function getJSON(url,name, successCallback) {
	$.ajax(
	{
		type: "GET",
		url: serverUrl + url +"?name=" + name,
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

