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
$sql="CREATE TABLE tbl_accounts(acc_id INT NOT NULL AUTO_INCREMENT,
      acc_name VARCHAR(20),
      acc_login VARCHAR(20),
      acc_password VARCHAR(50), 
      PRIMARY KEY (acc_id));";

// Execute query
if (mysqli_query($con,$sql))
  {
  echo "<h1> Table tbl_accounts created successfully </h1>";
  }
else
  {
  echo "<h1> Error creating table: <h1>" . mysqli_error($con);
  }

mysqli_close($con);

?> 
