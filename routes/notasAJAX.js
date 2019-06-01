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
  query = 'SELECT '+
            "DATE_FORMAT(T1.FECHA,'%Y/%m/%d') AS FECHA,"+
            'T2.NOMBRE, T2.APELLIDO,'+
            'T3.NOMBRE AS CURSO,'+
            'T6.NOMBRE AS GRADO '+
          'FROM ASISTENCIA T1 '+
          'INNER JOIN '+
            'ALUMNO T2 ON T1.ALUMNO_ID_ALUMNO = T2.ID_ALUMNO '+
          'INNER JOIN '+
            'CURSO T3 ON T1.CURSO_ID_CURSO = T3.ID_CURSO '+
          'INNER JOIN '+
            'ALUMNOSECCION T4 ON T1.ALUMNO_ID_ALUMNO = T4.ALUMNO_ID_ALUMNO '+
          'INNER JOIN '+
            'SECCION T5 ON T4.SECCION_ID_SECCION = T5.ID_SECCION '+
          'INNER JOIN '+
            'GRADO T6 ON T5.GRADO_ID_GRADO = T6.ID_GRADO '+
          'WHERE T6.NOMBRE = "'+req.params.idS+'"'


   sql.query(query, (err, resql)=>{
    if(err){
      res.send(err.message);
    }else{
      var reporte = '<table class="table table-condensed">'
      reporte+= '<tr> <th> FECHA </th> <th> NOMBRE </th> <th> APELLIDO </th> <th> CURSO </th> <th> GRADO </th></tr>'
      for(var i=0; i<resql.length; i++){
        reporte+= '<tr>'
        reporte+= '<td> '+resql[i].FECHA +'</td>'
        reporte+= '<td> '+resql[i].NOMBRE +'</td>'
        reporte+= '<td> '+resql[i].APELLIDO +'</td>'
        reporte+= '<td> '+resql[i].CURSO +'</td>'
        reporte+= '<td> '+resql[i].GRADO +'</td>'
        reporte+= '</tr>'
      }
      reporte+='</table>'

      res.send(reporte)
    }
  })
})

module.exports =  router;