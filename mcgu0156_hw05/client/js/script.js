"use strict";
console.log('Here');
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

	console.log('Here');
	$.ajax(
	 {
			 type: "GET",
			 url: url,
			 data: "{}",
			 contentType: "application/json; charset=utf-8",
			 dataType: "json",
			 cache: false,
			 success: function (data) {
			 console.log(data);
			 var trHTML = 'hello';


			 $('#table').append(trHTML);

			 },

			 error: function (msg) {

					 alert(msg.responseText);
			 }
})();
