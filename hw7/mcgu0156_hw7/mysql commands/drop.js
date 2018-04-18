var mysql = require("mysql");

var con = mysql.createConnection({
  host: "cse-curly.cse.umn.edu",
  user: "C4131S18U77", // replace with the database user provided to you
  password: "82", // replace with the database password provided to you
  database: "C4131S18U77", // replace with the database user provided to you
  port: 3306
});

con.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");
  var sql = `SELECT * FROM tbl_places`;
  con.query(sql, function(err, result) {
    if(err) {
      throw err;
    }
    console.log(result);
  });
});
