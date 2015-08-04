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
    }

  },

  //   send: function(req,res){
  //   var info;
  //   info.id=req.param('myuserid');
  //   info.fid=req.param('mynewfriend');
  //   Frequest.create({user1id : info.id},{user2id : info.fid}).exec(function createCB(err, created){
  //   console.log('Created friend request between: ' + created.user1id + 'and' + created.user2id);
  //   });






  // },


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
