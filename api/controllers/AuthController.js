// api/controllers/AuthController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/AuthController');

_.extend(exports, _super);
_.extend(exports, {

	logout: function (req, res) {
    req.logout();
    req.session.authenticated = false;
    if (!req.isSocket) {
      res.redirect(req.query.next || '/');
    }
    else {
      delete req.user;
      delete req.session.passport;
      req.session.authenticated = false;
      
      res.ok();
    }
  }
  // Extend with custom logic here by adding additional fields, methods, etc.

});
