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
  },
  callback: function (req, res) {
    function tryAgain (err) {

      // Only certain error messages are returned via req.flash('error', someError)
      // because we shouldn't expose internal authorization errors to the user.
      // We do return a generic error and the original request body.
      var flashError = req.flash('error')[0];
      if (err || flashError) {
        sails.log.warn(err);
        sails.log.warn(flashError);
      }

      if (err && !flashError ) {
        req.flash('error', 'Error.Passport.Generic');
      }
      else if (flashError) {
        req.flash('error', flashError);
      }
      req.flash('form', req.body);

      // If an error was thrown, redirect the user to the
      // login, register or disconnect action initiator view.
      // These views should take care of rendering the error messages.
      var action = req.param('action');

      if (action === 'register') {
        res.redirect('/register');
      }
      else if (action === 'login') {
        res.redirect('/login');
      }
      else if (action === 'disconnect') {
        res.redirect('back');
      }
      else {
        // make sure the server always returns a response to the client
        // i.e passport-local bad username/email or password
        res.forbidden();
      }

    }

      sails.services.passport.callback(req, res, function (err, user) {

      if (err || !user) {
        sails.log.warn(err);
        return tryAgain();
      }

      req.login(user, function (err) {
        if (err) {
          sails.log.warn(err);
          return tryAgain();
        }

        req.session.authenticated = true;

        // Upon successful login, optionally redirect the user if there is a
        // `next` query param
        if (req.query.next) {
          res.status(302).set('Location', req.query.next);
        }


        sails.log.info('user', user, 'authenticated successfully');
        return res.json(user);
      });
    });
  }

  // Extend with custom logic here by adding additional fields, methods, etc.

});
