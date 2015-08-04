// config/passport.js

var _ = require('lodash');
var _super = require('sails-auth/config/passport');

_.merge(exports, _super);
_.merge(exports.passport, {

  // Extend with custom logic here by adding additional fields, methods, etc.
 facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '436918573176696',
      clientSecret: 'acfc7bd6a5eb4eecbd684ce4bd249a13',
      profileFields: ['id', 'first_name', 'last_name', 'email'] 
    }
  }
});
