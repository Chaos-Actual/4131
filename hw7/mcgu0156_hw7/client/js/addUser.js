
function addUser() {
document.getElementById("form1").style.display = "table-row";
};

function clearUser() {
	document.getElementById("form1").style.display = "none";
};

function tryUser() {

	var element = document.getElementsByClassName("form-control");
	alert(element[0]);

}
