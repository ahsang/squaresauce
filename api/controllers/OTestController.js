/**
 * OTestController
 *
 * @description :: Server-side logic for managing Otests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getData: function(req,res){
		OTest.find().exec(function(err, ot) {
  			console.log(ot.length);
			res.ok(ot);
		})
	},

	retrieveVoucher: function(req,res){
    	info= new Array();
    	info.voucher=req.param('voucher');
    	info.password=req.oaram('password');
		//This function does two things!
		// 1. Creates a new user account once a user adds the voucher number, returns user name to the front end,
		// then it logs in the user, deletes the voucer entry from the otest model.
		
		// 2. Add this user to his relavant oweek square!

			Otest.findOne({ VoucherNo : info.voucher }).then(function (otest) {

	 			res.send(/*stuff ure sending to front end goes here*/);
	 		}).catch(function(err){
	 			console.log(err);
	 		});


	},

	createSpecialUser : function(req,res){
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

            //Code to add this user to the relevant square goes here!


          });
      });
    });

	}



};


