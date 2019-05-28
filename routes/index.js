var express   = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    msnAlert: 'Ingresa todos los campos',
    Error: false 
  });
});

/* GET home page. */
router.get('/CerrarSesion', (err, res)=>{
  res.clearCookie('token');
  res.redirect('/');
});


module.exports = router;
