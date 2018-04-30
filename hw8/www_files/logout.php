<?php
session_start();
if(isset($_SESSION["User"])){
  session_destroy();
  header('Location: /~mcgu0156/login.php');
} else {
  header('Location: /~mcgu0156/login.php');
}
 ?>
