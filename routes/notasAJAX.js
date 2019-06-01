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

module.exports =  router;