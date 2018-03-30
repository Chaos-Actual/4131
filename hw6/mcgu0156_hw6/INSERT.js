

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
  var sql = `INSERT INTO tbl_places(place_id, place_name, addr_line1 ,addr_line2, open_time, close_time, add_info, add_info_url)
             VALUES (A , B, C,D, 10, 11, A, A)`;
  con.query(sql, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Table created");
  });
});
