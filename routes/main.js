var express   = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {lvl:global.lvl, user: global.user});
});

router.get('/CerrarSesion', (err, res)=>{
  res.clearCookie('token');
  res.redirect('/');
});



module.exports = router;
