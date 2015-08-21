// api/models/User.js

var _ = require('lodash');
var _super = require('sails-auth/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  attributes: {

    
    profile:{
      model: 'Profile'
    },
    mysquares:{
      collection:'Square',
      via:'people'
    },
    mfriends: {
      collection:'Friend',
      via:'theuser'
    },
    myforums: {
      collection: 'Dforum',
      via: 'fmembers'
    },  
    isAdmin: {
      collection:'Square',
      via:'admins'
    },
      isForumAdmin: {
      collection:'Dforum',
      via:'admins'
    },
    myChats:{
      collection: 'ChatSquare',
      via: 'users'
    }

}



});
