(function() {

	var url = 'http://localhost:9007/getAdminUsers';
	$(document).ready(function(){
    $.ajax({url: url, success: function(result){

				$("#adminTable").append(result);

  }});
});
})();
