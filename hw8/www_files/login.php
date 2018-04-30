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
