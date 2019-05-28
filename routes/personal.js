var express   = require('express');
var sql       = require('../db');
var router  = express.Router();

var query = ''

router.get('/', (req, res)=>{
  query = "SELECT ID_PERSONAL, NOMBRE, APELLIDO, TELEFONO, T2.CATEGORIA "+
          "FROM PERSONAL T1 "+
          "INNER JOIN AREA T2 "+
          "ON T1.AREA_ID_CATEGORIA = T2.ID_CATEGORIA "+
          "WHERE T1.ESTADO = 'A'  AND T1.AREA_ID_CATEGORIA <> 1"

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/personal')

    }else{
      res.render('main/personal', {
        data:sql_res,
        msn: global.MSN, 
        tipo:global.TIPO, 
        msnText:global.MSNTEXT
      })

      global.MSN=false;
      global.TIPO="";
      global.MSNTEXT='';
    }
  })
})

router.get('/delete/:ID', (req, res)=>{
  query = "UPDATE PERSONAL "+
          "SET ESTADO = 'N' "+
          "WHERE ID_PERSONAL = "+ req.params.ID;

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/personal')

    }else{
      global.MSN=true;
      global.TIPO="success";
      global.MSNTEXT='Eliminado exitosamente!'
      res.redirect('/personal')
    }
  })
})
module.exports =  router;