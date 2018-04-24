
<?php
// define variables and set to empty values
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
