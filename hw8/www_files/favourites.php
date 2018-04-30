<?php
session_start();
if(!isset($_SESSION["User"]))
{
  header('Location: /~mcgu0156/login.php');
}
?>
<!doctype html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="client/css/style.css">
      <script type="text/javascript" src="client/js/navUser.js"></script>
      <title>My favourite places</title>
  </head>

  <body>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li><a href="/~mcgu0156/favourites.php"><b>Favourite places</b></a></li>
            <li><a href="/~mcgu0156/logout.php"><span class="glyphicon glyphicon-log-out"></span></a>
          </ul>
          <span class="navbar-text" id = "navUser">Welcome:<?php print $_SESSION["User"];?>   </span>
        </div>
      </nav>
<h2>Favorites Places</h2>
      <div class="container">
        <table class="table" id="myFavTable">
          <thead>
            <tr>
	      <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Open / Close</th>
              <th scope="col">Information</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
               <?php
                  ini_set('display_errors','1');
                  error_reporting(E_ALL);

                  // build SELECT query
                  $squery = "SELECT *  FROM tbl_places";

                    include_once 'database.php';
 		    $conn = new mysqli($db_servername, $db_username, $db_password, $db_name, (float)$db_port);

                  if ($conn->connect_error)
         			 echo  die("Could not connect to database </body></html>" );
         	     else
         			$result = $conn->query($squery);

               ?><!-- end PHP script -->
	  <?php
	     // fetch each record in result set
	     while ( $row = mysqli_fetch_assoc( $result ) )
	     {
		// build table to display results
		print( "<tr>" );
		print("<td>{$row['place_id']}</td>");
		print("<td>{$row['place_name']}</td>");
		print("<td>{$row['addr_line1']} {$row['addr_line2']}</td>");
		print("<td>{$row['open_time']} / {$row['close_time']}</td>");
		print("<td>{$row['add_info']}</td>");
		$info_url = $row["add_info_url"];
		print "<td><a href =\"$info_url\"> $info_url</a>  </td>";
		print( "</tr>" );
	     } // end while
	     $conn->close();
                  ?><!-- end PHP script -->

          </tbody>
        </table>
      </div>
      <h2>Filter Criteria</h2>
    <div class = "row">
    <div class = "col-md-1"></div>
      <div class = "col-md-10">
      <form id = "filter" action = "filter.php" method = "post">
      	Place ID:
      	<input type = "text" name = "ID" style="margin-left: 24px;" = ><br>
      	Place Name:
      	<input type = "text" name = "Name">
      </form>
      	<button id = "filterButton" type = "submit" form = "filter" class="btn btn-primary btn-block">Filter</button>
     </div>
     <div class="col-md-10"></div>
     </div>
   <script type="text/javascript" src="client/js/script.js"></script>
  </body>
</html>
