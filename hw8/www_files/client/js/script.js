//"use strict";

(function() {

	var url = 'http://localhost:9007/getListOfFavPlaces';
	$(document).ready(function(){
    $.ajax({url: url, success: function(result){
				$("#myFavTable").append(result);

  }});
});
})();
