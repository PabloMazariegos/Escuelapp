var express   = require('express');
var sql       = require('../db');
var router  = express.Router();

var query = ''

router.get('/', (req, res)=>{
  res.render('main/alumnos')
})


router.get('/mantenimiento', (req,res)=>{
  query = "SELECT ID_ALUMNO, NOMBRE, APELLIDO, PADRE, TELEFONO, DATE_FORMAT(FECHA_INSCRIPCION,'%Y/%m/%d') AS FECHA FROM ALUMNO;"

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/alumnos/mantenimiento')

    }else{
      res.render('alumnos/mantenimientos', {
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
});

router.get('/filter', (req,res)=>{
  if(req.query.inNombre   == '' 
  && req.query.inApellido =='' 
  && req.query.inTelefono =='' 
  && req.query.inFecha    ==''){
    res.redirect('/alumnos/mantenimiento')
  }
  query = "SELECT ID_ALUMNO, NOMBRE, APELLIDO, PADRE, TELEFONO, FECHA_INSCRIPCION FROM ALUMNO "+
          "WHERE NOMBRE = '"            + req.query.inNombre   + "' OR "+
          "APELLIDO = '"                + req.query.inApellido + "' OR "+
          "TELEFONO = '"                + req.query.inTelefono + "' OR "+
          "FECHA_INSCRIPCION = '"       + req.query.inFecha + "'"
  console.log(query)
  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/alumnos/mantenimiento')

    }else{
      res.render('alumnos/mantenimientos', {
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
});

router.get('/update/:CARNE/:NOMBRE/:APELLIDO/:PADRE/:TELEFONO/:FECHA', (req, res)=>{
  query = "UPDATE ALUMNO "+
          "SET NOMBRE = '"+ req.params.NOMBRE +"',"+
          "APELLIDO = '"+   req.params.APELLIDO +"',"+
          "PADRE= '"+        req.params.PADRE +"', "+
          "TELEFONO= '"+     req.params.TELEFONO +"', "+
          "FECHA_INSCRIPCION= '"+        req.params.FECHA +"' "+
          "WHERE ID_ALUMNO = "+ req.params.CARNE;
  
  console.log(query)

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/alumnos/mantenimiento')

    }else{
      global.MSN=true;
      global.TIPO="success";
      global.MSNTEXT='Modificado Exitosamente'
      res.redirect('/alumnos/mantenimiento')
    }
  })
});

router.get('/asignar/:ID_ALUMNO/:ID_GRADO', (req, res)=>{
  query = "call ASIGNACION ('"+req.params.ID_ALUMNO + "','" +req.params.ID_GRADO +"')"

  sql.query(query, (sql_err, sql_res)=>{
    if(sql_err){
      global.MSN=true;
      global.TIPO="err";
      global.MSNTEXT=sql_err.message;
      res.redirect('/alumnos/mantenimiento')

    }else{
      global.MSN=true;
      switch(sql_res[0][0].STAT){
        case  'Grado con secciones llenas, no es posible asignar':
          global.TIPO="err";
        break;
        case 'Cupo en grado lleno':
          global.TIPO="err";
        break;
        default:
          global.TIPO="success";
        break;
      }
      global.MSNTEXT=sql_res[0][0].STAT;
      res.redirect('/alumnos/mantenimiento')
    }
  })
});

router.get('/asignacion', (req, res)=>{
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
      res.render('alumnos/asignacion', {
        data:sql_res,
        msn: global.MSN, 
        tipo:global.TIPO, 
        msnText:global.MSNTEXT
      })

    }else{
      res.render('alumnos/asignacion', {
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

module.exports =  router;