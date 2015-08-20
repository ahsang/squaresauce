/**
 * VoucherController
 *
 * @description :: Server-side logic for managing Vouchers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createVoucher: function(req,res){
	 		info = new Array();
	 		info.name = req.param('name')
	 		info.group = req.param('group');
	 		info.prog = req.param('prog');
	 		info.camp_id = req.param('camp_id');
	 		info.gender = req.param('gender')
	 		info.cell = req.param('cell');
	 		info.city = req.param('city');
	 		info.hash = (info.group + info.camp_id + info.cell);
	 				Voucher.find({camp_id: info.camp_id}).exec(function (err, voucher) {

	 					if(voucher == '')
	 					{
	 						Voucher.create({name : info.name, group_number: info.group, programme: info.prog, campus_id: info.camp_id,                           
	 						gender: info.gender, city: info.city, cell: info.cell, key: info.hash}).exec(function createCB(err, created){
		 						console.log('Created a new square with the following stuff: ');
		 					});	 									
	 						if(err)console.log(err);
	 						res.ok();					          
	 					}
	 					else
	 					{
	 						console.log('This Voucher has already been generated!');
	 					}
	 				});	
		

	// 		"name" "tag" 'sid' 'uid' 		
	//		WORKING!
	}
};

