var express   = require('express');
var sql       = require('../db');
var router  = express.Router();

var query = ''

router.get('/', (req, res)=>{
  query = "SELECT "+
            "T1.ID_ALUMNO, T1.NOMBRE, T1.APELLIDO,"+
            "CASE WHEN T4.NOMBRE IS NULL THEN 'sin asignar' ELSE T4.NOMBRE END AS GRADO,"+
            "CASE WHEN T3.NOMBRE IS NULL THEN 'sin asignar' ELSE T3.NOMBRE END AS SECCION "+
          "FROM ALUMNO T1 "+
          "LEFT JOIN "+
            "ALUMNOSECCION T2 ON T1.ID_ALUMNO = T2.ALUMNO_ID_ALUMNO "+
          "LEFT JOIN "+
            "SECCION T3 ON T2.SECCION_ID_SECCION = T3.ID_SECCION "+
          "LEFT JOIN "+
            "GRADO T4 ON T4.ID_GRADO = T3.GRADO_ID_GRADO;"

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.render('main/asistencia', {
        data:sql_res,
        msn: global.MSN, 
        tipo:global.TIPO, 
        msnText:global.MSNTEXT
      })

    }else{      
      res.render('main/asistencia', {
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

router.get('/filter', (req,res)=>{
  var inGrado = req.query.inGrado;
  var inSeccion =  req.query.inSeccion;

  if(inGrado == "" || (inGrado=="" && inSeccion=="")){
    res.redirect('/asistencia')
  }

  if(inSeccion=="")
    inSeccion = "null";

  query ='call FILTROS_ASIGNACION("'+inGrado+'",'+inSeccion+')'

  sql.query(query, (sql_err, sql_res)=>{
    console.log(sql_res[0])
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.render('main/asistencia', {
        data:sql_res,
        msn: global.MSN, 
        tipo:global.TIPO, 
        msnText:global.MSNTEXT
      })

    }else{
      res.render('main/asistencia', {
        data:sql_res[0],
        msn: global.MSN, 
        tipo:global.TIPO, 
        msnText:global.MSNTEXT
      })

      global.MSN=false;
      global.TIPO="";
      global.MSNTEXT='';
    }
  })
});


router.get('/new/:FECHA/:ID/:IGR', (req, res)=>{
  query = "INSERT INTO ASISTENCIA (FECHA, ALUMNO_ID_ALUMNO, CURSO_ID_CURSO) VALUES ('"+req.params.FECHA+"',"+req.params.ID+ "," + req.params.IGR+ ");"

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.render('main/asistencia', {
        data:sql_res,
        msn: global.MSN, 
        tipo:global.TIPO, 
        msnText:global.MSNTEXT
      })

    }else{
      global.MSN=true;
      global.TIPO="success";
      global.MSNTEXT="Asistencia ingresada";
      res.redirect('/asistencia')
    }
  })
})

module.exports = router;