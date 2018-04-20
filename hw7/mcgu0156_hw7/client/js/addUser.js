
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

function deleteUser(acc_login) {
	var url = 'http://localhost:9007/deleteUser';
	$.post(url,
			{acc_login: acc_login
			},
			function(data,status){
				alert("UserDeleted!");
				location.reload();
			});
}


function editRow(row){
	var element = document.getElementById(row);
	var id = element.cells[0].innerHTML;
	var name = element.cells[1].innerHTML;
	var login = element.cells[2].innerHTML;
	var password = element.cells[3].innerHTML;
	var oldHTML = element.innerHTML;
	var newHTML = '';
	newHTML += '<form id = "test" action ="/updateUser" action = "post"';
	newHTML +='<td>2<input type="hidden" name="acc_id" value="'+ id+'"></td>';
	newHTML +='<td><input type = "text" name = "acc_name" value ="' + name + '"></td>';
	newHTML +='<td><input type = "text" name = "acc_login" value ="' + login + '"></td>';
	newHTML +='<td><input type = "text" name = "acc_password" value =""></td>';
	newHTML +='<td><span class="icon1"><button class="tableButton" type = "submit" form = "test"><i class="glyphicon glyphicon-floppy-disk"></i></button></span>';
	newHTML +='<span class="icon2"><button class="tableButton" onclick="javascript:exitEdit()"><i class="glyphicon glyphicon-remove"></i></button></span></td>';
	newHTML +='</form>';
	$
}

function exitEdit(){
	location.reload();
}

function try1(row){
	alert(row);
	var element = document.getElementById(row);

	alert(element.cells[2].value);
}
