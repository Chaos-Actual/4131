/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

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

  var rowToBeInserted = {
    acc_name: 'Alpha' // replace with acc_name chosen by you OR retain the same value

  };
  var test = {
    acc_name: 'alpha'
  };
  var sql = ``;
  con.query('UPDATE tbl_accounts SET ? WHERE ?', [rowToBeInserted,test], function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Value Updated");
  });
});
