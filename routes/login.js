var express   = require('express');
var sql       = require('../db');
var jwt       = require('jsonwebtoken');
var key       = require('../bin/key');
var router    = express.Router();

var query = '';


router.post('/', (req, res)=>{
  let inUser = req.body.username;
  let inPass = req.body.password;

  query = 'SELECT * FROM tbus '+
          'WHERE USUARIO = "'+inUser+'"'+
          ' AND  CONTRASEÑA = "'+ inPass +'"'
          ' AND  ESTADO = "A";'  

  if(inUser == "" || inPass == ""){
    res.render('index', { 
      title: 'Escualapp: asignacion y control de cursos',
      msnAlert: 'Ingresa todos los campos',
      Error: true 
    });

  }else{

    sql.query(query, (sql_err, sql_res)=>{
      if(sql_err){
        console.log(sql_err)
        res.render('index', { 
          title: 'Escualapp: asignacion y control de cursos',
          msnAlert: sql_err.sqlMessage,
          Error: true 
        });
  
      }else{        
        if(sql_res != ""){

          var payload = {
            user:sql_res[0].USUARIO, 
            lvl:sql_res[0].LVL,
            expiresIn: '12h'
          }        
          
          global.lvl = sql_res[0].LVL;
          global.user = sql_res[0].USUARIO;

          var token = jwt.sign(payload, key);
          
          res.cookie('token', token);
          res.redirect('main');          
           
          
        }else{
          res.render('index', { 
            title: 'Escualapp: asignacion y control de cursos',
            msnAlert: 'Usuario o Contraseña Incorrecta',
            Error: true 
          });

        }
      }
    });
  }

});



module.exports = router;

