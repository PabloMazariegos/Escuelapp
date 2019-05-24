var jwt     = require('jsonwebtoken');
var key     = require('./bin/key');

module.exports.ValidaToken= (req, res, next)=>{
  const {token} = req.cookies;
  jwt.verify(token, key, (err, decodeTkn)=>{
    if(err){
      console.log(err);
      res.sendStatus(400);
    }else{
      next();
    }
  })
}
