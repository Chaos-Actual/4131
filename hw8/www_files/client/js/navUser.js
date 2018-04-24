//"use strict";

(function() {
	var url = 'http://localhost:9007/getSessionUser';
	$(document).ready(function(){
    $.ajax({url: url, success: function(result){
				$("#navUser").append(result);

  }});
});
})();
