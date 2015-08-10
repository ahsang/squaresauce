/**
 * DforumController
 *
 * @description :: Server-side logic for managing dforums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addAdmin: function(req,res){
 		
 		info = new Array();

 		info.dfid=req.param('dforum_id');
 		info.uid=req.param('user_id');

 		
 		var temp;
 		var users_check=false;
 			Dforum.findOne({id: info.dfid}).populate('fmembers').then(function(df){
 					var temp_dforum=df;
 					//check if the user is in the forum or not
 					while(temp_dforum.people.length!=0){//since people object is an array we have to iterate through it
 						var temp_people=temp_dforum.fmembers.pop();
 						if(temp_people.id==info.uid){
 							console.log("The user exists in this dforum");
 							users_check=true;
 							return [users_check,sq];
 						}else{
 						console.log(temp_people);	
 						}
 					}

 					return [users_check,df];
 			}).spread(function(users_check,df){

 				console.log(df);
 				if(users_check){
 					df.admins.add( info.uid );
			    	df.save(function(err){
			    		if(err){
			    			console.log(err);
			    		}else{
			    		console.log('added' + info.uid +' as admin for discussion forum ' + df.name);
			    		}
			    	});
			    }else{
			    	console.log("The user you are trying to add as an admin is not in this discussion forum");
			    }
 			}).catch(function(err){
 				console.log(err);

 			});
		res.ok();
	
 	},

 	removeAdmin: function(req,res){
 		
 		info = new Array();

 		info.dfid=req.param('dforum_id');
 		info.uid=req.param('user_id');

 		
 		var temp;
 		var users_check=false;
 			Dforum.findOne({id: info.dfid}).populate('admins').then(function(df){
 					var temp_dforum=df;
 					//check if the user is an admin in the forum or not
 					while(temp_dforum.people.length!=0){//since people object is an array we have to iterate through it
 						var temp_people=temp_dforum.fmembers.pop();
 						if(temp_people.id==info.uid){
 							console.log("The user is an admin in this dforum");
 							users_check=true;
 							return [users_check,sq];
 						}else{
 						console.log(temp_people);	
 						}
 					}

 					return [users_check,df];
 			}).spread(function(users_check,df){

 				console.log(df);
 				if(users_check){
 					df.admins.remove( info.uid );
			    	df.save(function(err){
			    		if(err){
			    			console.log(err);
			    		}else{
			    		console.log('removed' + info.uid +' as admin for discussion forum ' + df.name);
			    		}
			    	});
			    }else{
			    	console.log("The user you are trying to remove is not an in this discussion forum");
			    }
 			}).catch(function(err){
 				console.log(err);

 			});
		res.ok();
	
 	}
	
};

