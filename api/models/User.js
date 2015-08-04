// api/models/User.js

var _ = require('lodash');
var _super = require('sails-auth/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  attributes: {
  	  age: {
      type: 'int',
      notNull: true
    },
  	  phonenumber: {
      type: 'string',
      notNull: true
    },
	myfriends: {
      type:'array',
      notNull: true
    }
  },
  addFriend: function (options, cb) {

    User.findOne(options.id).exec(function (err, user) {
        user.myfriends.push(options.mynewfriend);
        user.save(function (err) { 
          if(err) console.log(err);
          return cb();
      
         });
    })

  }
});
