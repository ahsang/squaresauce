// api/services/protocols/oauth2.js

var _ = require('lodash');
var _super = require('sails-auth/api/services/protocols/oauth2');

function protocols () { }

protocols.prototype = Object.create(_super);
_.extend(protocols.prototype, {

  // Extend with custom logic here by adding additional fields and methods,
  // and/or overriding methods in the superclass.

});

module.exports = new protocols();
