
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
	newHTML += '<form id = "test" action ="http://localhost:9007/updateUser" method = "post"';
	newHTML +='<tr><td>2<input type="hidden" name="acc_id" value="'+ id+'"></td>';
	newHTML +='<td><input type = "text" name = "acc_name" value ="' + name + '"></td>';
	newHTML +='<td><input type = "text" name = "acc_login" value ="' + login + '"></td>';
	newHTML +='<td><input type = "text" name = "acc_password" value =""></td>';
	newHTML +='<td><span class="icon1"><button class="tableButton" type = "submit" form = "test"><i class="glyphicon glyphicon-floppy-disk"></i></button></span>';
	newHTML +='<span class="icon2"><button class="tableButton" onclick="javascript:exitEdit()"><i class="glyphicon glyphicon-remove"></i></button></span></td>';
	newHTML +='</tr></form>';
	var vals = [row, id];
	var idHTML = '<td>'+ id +'</td>';
	var nameHTML = '<td><input type = "text" name = "acc_name" value ="' + name + '"></td>';
	var loginHTML = '<td><input type = "text" name = "acc_login" value ="' + login + '"></td>';
	var passwordHTML = '<td><input type = "text" name = "acc_password" value =""></td>';
	var editHTML = '<td><span class="icon1"><button class="tableButton" onclick="javascript:updateUser(\''+vals+ '\')"><i class="glyphicon glyphicon-floppy-disk"></i></button></span>';
	editHTML +='<span class="icon2"><button class="tableButton" onclick="javascript:exitEdit()"><i class="glyphicon glyphicon-remove"></i></button></span></td>';
	$("#"+row).find('td:nth-child(1)').html(idHTML);
	$("#"+row).find('td:nth-child(2)').html(nameHTML);
	$("#"+row).find('td:nth-child(3)').html(loginHTML);
	$("#"+row).find('td:nth-child(4)').html(passwordHTML);
	$("#"+row).find('td:nth-child(5)').html(editHTML);
}

function exitEdit(){
	location.reload();
}

function updateUser(vals){
	var row = vals[0];
	var acc_id = vals[2];
	var acc_name = $("#"+row).find("td:eq(3) input[type='text']").val();
	var acc_login = $("#"+row).find("td:eq(4) input[type='text']").val();
	var acc_password = $("#"+row).find("td:eq(6) input[type='text']").val();
	var url = 'http://localhost:9007/updateUser';
	$.post(url,
			{
				acc_id: acc_id,
				acc_name: acc_name,
				acc_login: acc_login,
				acc_password: acc_password
			},
			function(data,status){
				alert("UserUpdated!");
				location.reload();
			});


}
