/**
 * OweekController
 *
 * @description :: Server-side logic for managing oweeks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	validate: function(req,res){
	 		info = new Array();
	 		info.voucher=req.param('voucher')
				
	 				Oweek.findOne(voucher: info.voucher}).exec(function (err, oweek) {

	 					if(unisquare == '')
	 					{
							console.log('The voucher you added was invalid!');
	 					}
	 					else
	 					{
	 							
	 							if(err)console.log(err);
	 							res.redirect(/oweekwelcome);					          
	 						
	 					}
	 				});	
		

	// 		"name" "tag" 'sid' 'uid' 		
	//		WORKING!
	}


};

