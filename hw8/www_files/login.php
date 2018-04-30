<!doctype html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="/~mcgu0156/client/css/style.css">
      <title>Welcome to Node.js</title>
  </head>

  <body>
      <div class="jumbotron">
        <h1>Login Page</h1>
        <p>Please enter your user name and password. Both are case sensitive.</p>
        <form id = "password" action = "db_check.php" method = "post">
          Username:
          <input type = "text" name = "User" required ><br></br>
          Password:
          <input type = "password" name = "Password" required><br>
        </form>
        <br/>
        <br/>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <button id= "myButton" type="submit" form = "password" class="btn btn-primary btn-block" >
            Submit
          </button>
        </div>
        <div class="col-md-1"></div>
      </div>
  </body>
</html>
<<<<<<< HEAD
=======
<?php

$User = $Password= "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$User = test_input($_POST["User"]);
$Password = test_input($_POST["Password"]);
}

function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}

function db_check($User, $Password){
error_reporting(E_ALL);
  ini_set( 'display_errors','1');
  // $con = mysqli_connect('localhost','root','','phpDB','3306');
  include_once 'database.php';
  $con=new mysqli($db_servername, $db_username, $db_password, $db_name, (float)$db_port);
  // Check connection
  if (mysqli_connect_errno())
    {
    echo 'Failed to connect to MySQL:' . mysqli_connect_error();
    }

  //check login username and password is in database
  $User = (string)$User;
  $result = mysqli_query($con,"SELECT * FROM tbl_accounts WHERE acc_login = '".$User."'");
  if (mysqli_num_rows($result) > 0){
    $row = mysqli_fetch_assoc($result);
      if(sha1($Password) == $row["acc_password"]){
        //TODO star session and redirect
        echo "GOOT!";
         $_SESSION["user"] = $User;
         session_start();
         echo $_SESSION["user"];
         header('Location: /~mcgu0156/favourites.php');
      }
      else{
        echo "Incorrect Username or Password!";
      }
  } else {
    echo "Incorrect Username or Password!";
  }
  mysqli_close($con);
}

db_check($User, $Password);

 ?>
>>>>>>> 20a7bf67cdd2eb569025be237f28de221c7117d8
