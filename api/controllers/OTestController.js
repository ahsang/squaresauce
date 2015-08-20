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

	 			res.ok();
	 		}).catch(function(err){
	 			console.log(err);
	 		});


	},

	createUser : function(req,res){

		
	}



};


