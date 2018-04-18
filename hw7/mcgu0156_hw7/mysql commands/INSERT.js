

var mysql = require("mysql");

var sha1 = require('sha1');

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

  var sql = "INSERT INTO tbl_accounts(acc_id, acc_name, acc_login, acc_password) VALUES ?";
  var VALUES = [
    ['2', 'mark','NULL',sha1("tanks")]
]
  con.query(sql,[VALUES], function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Table created");
  });
});
