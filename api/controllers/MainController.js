/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req,res){
    	if(req.session.passport){
    		res.redirect('/home');
    	}else{
    		res.view('login');
    	}
  	
  
	},
	viewSquare: function(req,res){

		//name,fbk_id,is_admin,username
		res.view('square');
	},
	getSquareUsers: function(req,res){
		if(req.param('sname')){
			var a=new Array();
			ChatSquare.findOne({cid:req.param('sname')}).populateAll().then(function(found){
				// if(err)console.log(err);

				var users=found.users;
				
				
				return [users];
				// console.log(a);
			}).spread(function(abc){
				console.log(abc);
				res.send(abc);
			}).catch(function(err){
				console.log(err);
			});
		}else{
			res.send("Please send me a square name brother");
		}
	},
	getUserProfile: function(req,res){
		
	}


};

