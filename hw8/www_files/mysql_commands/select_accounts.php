
<?php
error_reporting(E_ALL);
ini_set( 'display_errors','1');
// $con = mysqli_connect('localhost','root','','phpDB','3306');
include_once 'database.php';

$con=new mysqli($db_servername, $db_username, $db_password, $db_name);
// Check connection
if (mysqli_connect_errno())
  {
  echo 'Failed to connect to MySQL:' . mysqli_connect_error();
  }

//You can replace the strings below with whatever passwords you would like
$str1 = "chaplin";
$str2 = "bravo";

//NOTE, you can have more account names and logins than 2, but you need at least 1
$result = mysqli_query($con,"SELECT * FROM tbl_accounts");
if (mysqli_num_rows($result)> 0){
  while($row = mysqli_fetch_assoc($result)) {
    echo "<br> id: ". $row["acc_id"]. " - Name: ". $row["acc_name"]. "  Login:" . $row["acc_login"] . "<br>" . $row["acc_password"];
  }
} else {
  echo "0 results";
}
mysqli_close($con);


echo '<h1> Successfully Inserted Values into the Table </h1>'
?>
