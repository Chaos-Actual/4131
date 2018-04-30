<?php
if(!isset($_SESSION)){
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
            <li><a href="/favourites"><b>Favourite places</b></a></li>
            <li><a href="/addPlace"><b>Add Place</b></a></li>
            <li><a href="/admin"><b>Admin</b></a></li>
            <li><a href="/logout.php"><span class="glyphicon glyphicon-log-out"></span></a>
          </ul>
          <span class="navbar-text" id = "navUser">   </span>
        </div>
      </nav>
      <div class="container">
        <table class="table" id="myFavTable">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Open / Close</th>
              <th scope="col">Information</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <script type="text/javascript" src="client/js/script.js"></script>
  </body>
</html>
<?php
function populate_fav(){
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
  $result = mysqli_query($con,"SELECT * FROM tbl_places ");
  if (mysqli_num_rows($result) > 0){
    $row = mysqli_fetch_assoc($result);
  } else {
    echo "Incorrect Username or Password!";
  }
  mysqli_close($con);
}

 ?>
