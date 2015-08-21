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
    sails.services.passport.protocols.local.register(req.body, function (err, newuser) {
      if (err)
      { 
        return next(err);
        console.log('i sent and error!');
        res.send(err);
      }
      Profile.create({user : newuser}).exec(function createCB(err, profile){
        if(err){console.log(err);}

        User.update({id:newuser.id},{profile:profile}).exec(function afterwards(err, updated){
          if(err){
            console.log(err)
            console.log('i sent and error!');
            res.send(err);
          }
          console.log('im sending this via http: ' + newuser.id);
          res.send(newuser.username);
        });
      });
    });
  },

  send: function(req,res){
    info= new Array();
    info.id=req.param('user1id');
    info.fid=req.param('user2id');
    info.hash= (info.id + info.fid )*(info.id + info.fid);
    console.log(info.hash);
    Frequest.find({hash: info.hash}).exec(function (err, frequest) {

      if(frequest == '')
      {
        Frequest.create({user1id : info.id, user2id: info.fid, hash : info.hash}).exec(function createCB(err){
         if(err){console.log(err);}
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
    info.hash= (info.id + info.fid)*(info.id + info.fid);
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

        User.findOne(info.id).exec(function (err,user) {
          user.mfriends.add(info.fid);
          if(err)console.log(err);
          user.save(function(err){
            console.log('updated firends for user 1');
            if(err)console.log(err);

          });
        });
        User.findOne(info.fid).exec(function(err,user) {
          user.mfriends.add( info.id ,function(err){
            if(err)console.log(err);
            console.log('updated firends for user 2');

                  // something here
                });
          user.save(function(err){
            if(err)console.log(err);
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

  updateInfo: function(req,res){
    if(err)console.log(err);
    res.ok();
  },

  getProfile: function(req,res){
    console.log(req.session);
    res.ok();
  //  GET USER PROFILE HERE. Perhaps have a seperate model for profiles, and reference all 
  //  the users friends over there to have easy access policies?
},

isFriends: function(req,res){
  //  Do we need this funciton?
  //  Can help to have a simple friends check, for easier policy implementaion?
  //  But then we should not check for policies in profiles or users themselves.
  //  Food for thoguht....
},
me: function (req, res) {
  console.log(req.session.passport.user);
  User.find({id:req.session.passport.user}).populate('profile').populate('mysquares').populate('myforums').then(function(user){
    console.log(user);
    res.ok(user);
  }).catch(function(err){
    console.log(err);
    res.ok();
  })

},

verifyusername:  function(req,res){
  console.log(req.body);
  console.log("user verfying");
  var id=req.param('username');
  User.find({id:req.session.passport.user}).then(function(user){
    if(user.username==id){
      res.send("true");
    }else{
      User.find({username:id}).then(function(user){
        if(user==''){
          res.send("true");
        }else{
          res.send("false");
        }

      }).catch(function(err){
        console.log("Error verifying the user");
      })
    }
  }).catch(function(err){
    console.log(err);
  });
}




});
