<?php
  error_reporting(E_ALL);
  ini_set( 'display_errors','1');
  $query = '';
  echo "id:".$_POST["ID"];
  echo "Name:".$_POST["Name"];
  $NAME = $_POST["Name"];
  $ID = $_POST["ID"];
  // Build query based on filter inputs
  if(empty($ID) && empty($NAME) ){
    echo 'empty';
    $query = "SELECT * FROM tbl_places";
  } elseif (empty($ID) && !empty($NAME)) {
    echo "NO ID but NAME \n".$NAME;
    $query = "SELECT * FROM tbl_places WHERE place_name LIKE \"%$NAME%\"";
  } elseif (!empty($ID) && empty($NAME)) {
    $query = "SELECT * FROM tbl_places WHERE place_id = $ID";
  } else {
    echo "else";
    $query = "SELECT * FROM tbl_places WHERE place_name LIKE \"%$NAME%\" AND place_id = $ID";

  }
  include_once 'database.php';
  $con = new mysqli($db_servername, $db_username, $db_password, $db_name, (float)$db_port);
  // Check connection
  if (mysqli_connect_errno())
    {
    echo 'Failed to connect to MySQL:' . mysqli_connect_error();
    }
    $result = mysqli_query($con,$query);
    if (mysqli_num_rows($result) > 0){
      while($row = mysqli_fetch_assoc($result)) {
        print( "<tr>" );
    		print("<td>{$row['place_id']}</td>");
    		print("<td>{$row['place_name']}</td>");
    		print("<td>{$row['addr_line1']} {$row['addr_line2']}</td>");
    		print("<td>{$row['open_time']} / {$row['close_time']}</td>");
    		print("<td>{$row['add_info']}</td>");
    		$info_url = $row["add_info_url"];
    		print "<td><a href =\"$info_url\"> $info_url</a>  </td>";
    		print( "</tr>\n" );
    }

    } else {
      echo "Incorrect Username or Password!";
    }
    mysqli_close($con);

?>
