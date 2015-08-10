/**
 * DforumController
 *
 * @description :: Server-side logic for managing dforums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	portOver: function(req,res){

 		info = new Array();
 		info.sid=req.param('sid');
 		info.dfid=req.param('dfid');
 		info.name=req.param('name');

 		var temp;
 		var users_check=false;
 		 	//port over all the users from the square to the discussion forum
 			Square.findOne({id: info.sid}).populate('people').then(function(sq){
 					var temp_square=sq;
 					while(temp_square.people.length!=0){//since people object is an array we have to iterate through it
 						var temp_people=temp_square.people.pop();
 						
			 			Dforum.findOne({id: info.sid}).exec(function (err, dforum){
			 				dforum.members.add(temp_people.id);
			 				dforum.save(function(err){
			    			console.log('added the following user to the discussion forum ' + dforum.name);
			    			console.log(temp_people.id);
			    				});
			 			});
 					}
 					return [users_check,sq];
 			}).spread(function(users_check,sq){		
 				// Do Nothing lelz
 			}).catch(function(err){
 				console.log(err);
 			});

 		 	//port over all the admins from the square to the discussion forum
			Square.findOne({id: info.sid}).populate('admins').then(function(sq){
 					var temp_square=sq;
 					while(temp_square.admins.length!=0){//since admins object is an array we have to iterate through it
 						var temp_admins=temp_square.admins.pop();
 						
			 			Dforum.findOne({id: info.sid}).exec(function (err, dforum){
			 				dforum.admins.add(temp_admins.id);
			 				dforum.save(function(err){
			    			console.log('added the following admin to the discussion forum ' + dforum.name);
			    			console.log(temp_admins.id);
			    				});
			 			});
 					}
 					return [users_check,sq];
 			}).spread(function(users_check,sq){		
 				// Do Nothing lelz
 			}).catch(function(err){
 				console.log(err);
 			});



 	},

	addUser: function(req,res){

 		info = new Array();
 		info.dfid=req.param('dforum_id');
 		info.uid=req.param('user_id');


 		Dforum.findOne({ id : info.dfid}).exec(function (err, dforum) {
 			if(dforum == '')
 			{
 				console.log("Discussion forum not found");
 			}
 			else
 			{	
 				User.find({ id : info.uid}).exec(function (err,user) {
 					if(user == '')
 					{
 						console.log('User not found');
 					}
 					else
 					{
			    				//TODO: Cannot add if user already exists in members.
			    				dforum.fmembers.add( info.uid );
			    				dforum.save(function(err){
			    					console.log('added the following user to the discussion forum ' + dforum.name);
			    					console.log(info.uid);
			    				});	    				
			    			}
			    		});
 			}
 			res.ok();
 		});
 	},

 	removeUser: function(req,res){

 		info = new Array();

 		info.dfid=req.param('dforum_id');
 		info.uid=req.param('user_id');


 		Dforum.findOne({ id : info.dfid}).exec(function (err, dforum) {
 			if(dforum == '')
 			{
 				console.log("Discussion forum not found");
 			}
 			else
 			{	
 				User.findOne({ id : info.uid}).exec(function (err,user) {
 					if(user == '')
 					{
 						console.log('User not found');
 					}
 					else
 					{
			    				//TODO: Cannot remove if user doesnt exist.
			    				dforum.people.remove( info.uid );
			    				dforum.save(function(err){
			    					console.log('removed the following user from the discusison forum ' + dforum.name);
			    					console.log(info.uid);
			    				});	    				
			    			}
			    		});
 			}
 			res.ok();
 		});
 	},
<<<<<<< HEAD
=======



>>>>>>> origin/master


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

