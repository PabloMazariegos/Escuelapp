var mysql = require('mysql');

var cnx = {
  host: '35.222.62.133',
  user: 'root',
  password: '159515',
  database: 'ESCUELAPP_BD',
}

var SQLpool = mysql.createPool(cnx);

module.exports = SQLpool;
