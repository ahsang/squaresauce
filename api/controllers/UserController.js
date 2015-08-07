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
    info.hash= (1/2)*(info.id + info.fid )*(info.id + info.fid);
    console.log(info.hash);
      Frequest.find({hash: info.hash}).exec(function (err, frequest) {
       
        if(frequest == '')
          {
            Frequest.create({user1id : info.id, user2id: info.fid, hash : info.hash}).exec(function createCB(err){
               console.log('tried creating a request');
            });
          }
        else
            {
              console.log('request already exists');
            }

          if(err)console.log(err);
        res.ok();
    });
  },

  accept: function(req,res){
    info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    info.id=req.param('user1id');
    info.fid=req.param('user2id');
    info.hash= (1/2)*(info.id + info.fid)*(info.id + info.fid);
    console.log(info.hash);
      Frequest.find({hash: info.hash}).exec(function (err, frequest) {        
        console.log(frequest);
        if(frequest == '')
          {
          console.log('no request found!');
          }
        else
            {
              Frequest.destroy({hash: info.hash}).exec(function deleteCB(err){});
              console.log('request has been deleted');
              
                User.findOne(info.id).exec(function(err,user) {
                user.myfriends.push( info.fid );
                user.save(function(err){
                  console.log('updated firends for user 1');
                  });
                });
                User.findOne(info.fid).exec(function(err,user) {
                user.myfriends.push( info.id );
                user.save(function(err){
                  console.log('updated firends for user 2');
                  // something here
                  });
                });



            }

          if(err)console.log(err);
        res.ok();
    });
  },
  
  rejectRequest: function(req,res){
    info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    info.id=req.param('user1id');
    info.fid=req.param('user2id');
    info.hash= (1/2)*(info.id + info.fid)*(info.id + info.fid);
    console.log(info.hash);
      Frequest.find({hash: info.hash}).exec(function (err, frequest) {        
        console.log(frequest);
          if(frequest == '')
            {
            console.log('no request found!');
            }
          else
            {
              Frequest.destroy({hash: info.hash}).exec(function deleteCB(err){});
              console.log('request has been deleted');
            }

          if(err)console.log(err);
          res.ok();
      });
  },


});
