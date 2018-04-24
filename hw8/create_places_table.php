<?php
// $con= mysqli_connect('localhost','root','','phpDB','3306');
include_once 'database.php';
$con=new mysqli($db_servername, $db_username, $db_password, $db_name);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

// Create table
$sql="CREATE TABLE tbl_places(place_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       place_name VARCHAR(20),
                                       addr_line1 VARCHAR(35),
                                       addr_line2 VARCHAR(35),
                                       open_time TIME,
                                       close_time TIME,
                                       add_info VARCHAR(35),
                                       add_info_url VARCHAR(35))";

// Execute query
if (mysqli_query($con,$sql))
  {
  echo "<h1> Table tbl_places created successfully </h1>";
  }
else
  {
  echo "<h1> Error creating table: <h1>" . mysqli_error($con);
  }

mysqli_close($con);

?> 
