var express   = require('express');
var sql       = require('../db');
var router  = express.Router();

var query = ''

router.get('/', (req, res)=>{
  query = "SELECT ID_PERSONAL, NOMBRE, APELLIDO, TELEFONO, T2.CATEGORIA "+
          "FROM PERSONAL T1 "+
          "INNER JOIN AREA T2 "+
          "ON T1.AREA_ID_CATEGORIA = T2.ID_CATEGORIA "+
          "WHERE T1.ESTADO = 'A'"

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

router.get('/filter/:ID', (req, res)=>{
  console.log(req.params)
  var area = 0
  area =  req.params.ID;
  query = "SELECT ID_PERSONAL, NOMBRE, APELLIDO, TELEFONO, T2.CATEGORIA "+
          "FROM PERSONAL T1 "+
          "INNER JOIN AREA T2 "+
          "ON T1.AREA_ID_CATEGORIA = T2.ID_CATEGORIA "+
          "WHERE T1.ESTADO = 'A' "+
          "AND T1.AREA_ID_CATEGORIA = "+area+";"

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.render('main/personal')

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

router.get('/update/:NOMBRE/:APELLIDO/:TELEFONO/:AREA/:ID', (req, res)=>{
  var area = 0
  var id = 0
  area = req.params.AREA;
  id = req.params.ID;
  query = "UPDATE PERSONAL "+
          "SET NOMBRE = '"+ req.params.NOMBRE   +"',"+
          "APELLIDO = '"+   req.params.APELLIDO +"',"+
          "TELEFONO = '"+   req.params.TELEFONO +"',"+
          "AREA_ID_CATEGORIA= "+area +" "+
          "WHERE ID_PERSONAL = "+ id;
  
  console.log(query)

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/personal')

    }else{
      global.MSN=true;
      global.TIPO="success";
      global.MSNTEXT='Modificado Exitosamente'
      res.redirect('/personal')
    }
  })
});

router.post('/new', (req, res)=>{
  console.log(req.body)
  query = `INSERT INTO PERSONAL (NOMBRE, APELLIDO, TELEFONO, AREA_ID_CATEGORIA) VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.telefono}', ${req.body.area})`
  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/personal')

    }else{
      global.MSN=true;
      global.TIPO="success";
      global.MSNTEXT='Ingresado exitosamente'
      res.redirect('/personal')
    }
  })
})

module.exports =  router;