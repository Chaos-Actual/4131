"use strict";

(function() {
	// the API end point
	var url = "getListOfFavPlaces";
	// TO DO: YOU NEED TO USE AJAX TO CALL getListOfFavPlaces end-point from server
	// STEPS:
	// 1. Hit the getListOfFavPlaces end-point of server using AJAX get method
	// 2. Upon successful completion of API call, server will return the list of places
	// 2. Use the response returned to dynamically add rows to 'myFavTable' present in favourites.html page
	// 3. You can make use of jQuery or JavaScript to achieve this
	// Note: No changes will be needed in favourites.html page
	$(document).ready(function(){
    $.ajax({url: url, success: function(result){
			var jsonString  = JSON.stringify(result);

			var length = result.res.placeList.length;
			for (var i = 0; i < length; i++ ){
				var trHTML = '<tr>';
				var name = result.res.placeList[i].placename;
				var address = result.res.placeList[i].addressline1 + result.res.placeList[i].addressline2;
				var open_close = result.res.placeList[i].opentime + ' / '+ result.res.placeList[i].closetime;
				var information = result.res.placeList[i].additionalinfo;
				var link = result.res.placeList[i].additionalinfourl;
				trHTML += '<th>'+name+'</th>';
				trHTML += '<th>'+address+'</th>';
				trHTML += '<th>'+open_close+'</th>';
				trHTML += '<th>'+information+'</th>';
				trHTML += '<th>'+link+'</th>';
				trHTML += '</tr>';

				$("#myFavTable").append(trHTML);
			}


  }});
});


})();
