var mysql = require('mysql');

var cnx = {
  host: 'localhost',
  user: 'root',
  password: '159515',
  database: 'bd_escuelapp',
}

var SQLpool = mysql.createPool(cnx);

module.exports = SQLpool;
