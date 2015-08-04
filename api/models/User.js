// api/models/User.js

var _ = require('lodash');
var _super = require('sails-auth/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  attributes: {
  	  age: {
      type: 'int',
      
      defaultsTo:'0'
    },
  	  phonenumber: {
      type: 'string',
      
      defaultsTo:'1234'
    },
	myfriends: {
      type:'array',
      notNull: true,
      defaultsTo:'{0}'
    },
    toJSON: function () {
      var user = this.toObject();
      // delete user.password;
      user.gravatarUrl = this.getGravatarUrl();
      return user;
    }
  },
  addFriend: function (options, cb) {

    User.find(options.id).exec(function (err, user) {
    	console.log(user);
    	if(err)console.log(err);
        // user.myfriends.push(options.mynewfriend);
        // user.save(function (err) { 
        //   if(err) console.log(err);
        //   return cb();
      
        //  });
    	cb();
    })

  }
});
