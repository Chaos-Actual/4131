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

function getDateForDatabase($date) {
    $timestamp = strtotime($date);
    $date_formated = date('H:i:s', $timestamp);
    return $date_formated;
}
 
$sql1 = "INSERT INTO tbl_places (place_name, addr_line1, addr_line2, open_time, close_time, add_info, add_info_url) VALUES ('
Keller Hall', 'Minneapolis', 'Minnesota', '". getDateForDatabase('00:00:00')."', '". getDateForDatabase('23:59:59')."', 'CSE Department', 'https://cse.umn.edu');";
mysqli_query($con,$sql1);
echo "Row 1 inserted";

$sql2 = "INSERT INTO tbl_places (place_name, addr_line1, addr_line2, open_time, close_time, add_info, add_info_url) VALUES ('
Chipotle', '800 Washington Ave', 'Minnesota', '". getDateForDatabase('09:00:00')."', '". getDateForDatabase('22:00:00')."', 'Amazing Salad Place', 'https://www.chipotle.com');";
mysqli_query($con,$sql2);
echo "Row 2 inserted";

$sql3 = "INSERT INTO tbl_places (place_name, addr_line1, addr_line2, open_time, close_time, add_info, add_info_url) VALUES ('
Yosemite', 'Sierra Nevada', 'California', '". getDateForDatabase('08:00:00')."', '".getDateForDatabase('18:00:00')."', 'Trekking Place', '');";
mysqli_query($con,$sql3);
echo "Row 3 inserted";

$sql4 = "INSERT INTO tbl_places (place_name, addr_line1, addr_line2, open_time, close_time, add_info, add_info_url) VALUES ('
Afro Deli', 'Saint Paul', 'Minnesota', '". getDateForDatabase('10:00:00')."', '". getDateForDatabase('20:00:00')."', 'Delicious sandwich', 'http://www.afrodeli.com');";
mysqli_query($con,$sql4);
echo "Row 4 inserted";

$sql5 = "INSERT INTO tbl_places (place_name, addr_line1, addr_line2, open_time, close_time, add_info, add_info_url) VALUES ('
Blaze Pizza', 'Minneapolis', 'Minnesota', '". getDateForDatabase('12:00:00')."', '". getDateForDatabase('22:00:00')."', 'Amazing Pizza Place', 'http://www.blazepizza.com/');";
mysqli_query($con,$sql5);
echo "Row 5 inserted";

mysqli_close($con);


echo '<h1> Successfully Inserted Values into the Table </h1>'
?> 
