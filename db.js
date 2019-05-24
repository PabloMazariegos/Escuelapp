var mysql = require('mysql');

var cnx = {
  sockePath: 'escuelapp-240604:us-central1:bdescuelapp',
  user: 'root',
  password: '159515',
  database: 'BD_ESCUELAPP',
}

var SQLpool = mysql.createPool(cnx);

module.exports = SQLpool;
