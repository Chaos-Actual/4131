/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

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
  var sql = `CREATE TABLE tbl_places(place_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       place_name VARCHAR(20),
                                       addr_line1 VARCHAR(35),
                                       addr_line2 VARCHAR(35),
                                       open_time TIME,
                                       close_time TIME,
                                       add_info VARCHAR(35),
                                       add_info_url VARCHAR(35))`;
  con.query(sql, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Table created");
  });
});
