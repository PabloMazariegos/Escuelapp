var express   = require('express');
var sql       = require('../db');
var router  = express.Router();

var query = '';

router.get('/', function(req, res, next) {
  res.render('main/inscripciones', {
    msn: global.MSN, 
    tipo:global.TIPO, 
    msnText:global.MSNTEXT
  });
  global.MSN=false;
  global.TIPO="";
  global.MSNTEXT='';
});

router.post('/new', (req,res)=>{
  var params = req.body;

  query = `call INSCRIPCION ('${params.nombre}', '${params.apellido}', '${params.padre}', '${params.tel}');`

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err"
      global.MSNTEXT=sql_res[0][0].STAT;

      res.redirect('/inscripciones');

    }else{
      global.MSN=true;
      global.TIPO="success"
      global.MSNTEXT=sql_res[0][0].STAT;

      res.redirect('/inscripciones');
    }
  })
})

module.exports = router;