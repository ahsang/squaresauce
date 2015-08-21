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
      clientID: '784864048275345',
      clientSecret: 'c3b0de096a8df07d5115fc305973471b',
      profileFields: ['id', 'first_name', 'last_name', 'email'] 
    }
  }
});
