var express   = require('express');
var sql       = require('../db');
var router  = express.Router();

var query = ''

router.post('/:id', (req, res)=>{
  query = 'call GRADONOTAS('+req.params.id+')'
  sql.query(query, (err, resql)=>{
    if(err){
      res.send(err.message);
    }else{
      var reporte = '<table class="table table-condensed">'
      reporte+= '<tr> <th> CURSO </th> <th> NOTA </th> </tr>'
      for(var i=0; i<resql[0].length; i++){
        reporte+= '<tr>'
        reporte+= '<td> '+resql[0][i].CURSO +'</td>'
        reporte+= '<td> '+resql[0][i].VALOR +'</td>'
        reporte+= '</tr>'
      }
      reporte+='</table>'

      res.send(reporte)
    }
  })
})

router.post('/Asistencias/:idS', (req, res)=>{
  query = "SELECT	DATE_FORMAT(T1.FECHA,'%Y/%m/%d') AS FECHA, T5.NOMBRE AS ESTUDIANTE,    T4.NOMBRE AS GRADO,    T3.NOMBRE AS SECCION FROM ASISTENCIA T1 INNER JOIN	ALUMNOSECCION T2 ON T1.ALUMNO_ID_ALUMNO = T2.ALUMNO_ID_ALUMNO INNER JOIN 	SECCION T3 ON T2.SECCION_ID_SECCION = T3.ID_SECCION INNER JOIN 	GRADO T4 ON T3.GRADO_ID_GRADO = T4.ID_GRADO INNER JOIN 	ALUMNO T5 ON T1.ALUMNO_ID_ALUMNO = T5.ID_ALUMNO WHERE T4.NOMBRE = '"+req.params.idS+"'"
   sql.query(query, (err, resql)=>{
    if(err){
      res.send(err.message);
    }else{
      console.log(resql)
      var reporte = '<table class="table table-condensed">'
      reporte+= '<tr> <th> FECHA </th> <th> ESTUDIANTE </th> <th> GRADO </th> <th> SECCION </th> </tr>'
      for(var i=0; i<resql.length; i++){
        reporte+= '<tr>'
        reporte+= '<td> '+resql[i].FECHA +'</td>'
        reporte+= '<td> '+resql[i].ESTUDIANTE +'</td>'
        reporte+= '<td> '+resql[i].GRADO +'</td>'
        reporte+= '<td> '+resql[i].SECCION +'</td>'
        reporte+= '</tr>'
      }
      reporte+='</table>'

      res.send(reporte)
    }
  })
})

module.exports =  router;