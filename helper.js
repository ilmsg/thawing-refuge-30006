
module.exports.auth = (req, res, next) => {
  if( !req.session.user ){
    return res.redirect('/users/login');
  }
  return next();
}
