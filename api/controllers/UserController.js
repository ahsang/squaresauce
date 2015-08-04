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
    });
  },


  send: function(req,res){
    info= new Array();
    info.id=req.param('user1id');
    info.fid=req.param('user2id');
    Frequest.create({user1id : info.id, user2id: info.fid}).exec(function createCB(err, created){
    res.redirect('frequest');
    });
  },

  viewbyrecieved: function(req,res){
    info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    // info.myid=req.param('user1id');
    info.id=req.param('user2id');
    console.log(info.id);
      Frequest.find({user2id: info.id}).exec(function (err, frequest) {
        console.log(frequest);
          if(err)console.log(err);

        res.ok();
    });
  },

  viewbysent: function(req,res){
    info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    // info.myid=req.param('user1id');
    info.id=req.param('user1id');
    console.log(info.id);
      Frequest.find({user1id: info.id}).exec(function (err, frequest) {
        console.log(frequest);
          if(err)console.log(err);

        res.ok();
    });
  },





  enroll: function(req,res){
    options= new Array();
    options.id=req.param('myuserid');
    options.mynewfriend=req.param('mynewfriend');
    
    User.addFriend(options,function(err){
      if (err) return next(err);
      res.ok();


    })

  }


});
