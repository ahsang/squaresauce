// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

   create: function (req, res, next) {
    req.session.autouser = req.param('username');
    req.session.autopwd = req.param('password');
    req.session.autouser = req.param('username');
    req.session.autoaction = 'login';
    
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return next(err);

      res.redirect('test');
      // var hello=req.param.all();
      // AuthController.callback(req,res);
    });
  }


});
