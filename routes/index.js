var express   = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    msnAlert: 'Ingresa todos los campos',
    Error: false 
  });
});


module.exports = router;
