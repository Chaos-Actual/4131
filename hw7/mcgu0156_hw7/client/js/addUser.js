function addUser() {

	var user = '<tr><form name = "addUser" method = "post" action="/postUser"><td><input type="text" class="form-control" name="acc_name"  requiredmaxlength="15"></td><td><input type="text" class="form-control" name="acc_login" required maxlength="15"></td><td><input type="text" class="form-control" name="acc_password" required maxlength="15">/<td></tr>';

		var element = document.getElementById("adminTable").append(user);
};
