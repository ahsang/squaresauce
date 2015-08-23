/**
 * SquareController
 *
 * @description :: Server-side logic for managing squares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 	//	Everything square related is found here, from creation, to update to addition/deletion
 	//	of modules.
 	//	Function paramters required are given in the first line, "" indicate mandatory 
 	//	while '' mean optional params.
 	//	

 	module.exports = {

 		createSquare: function(req,res){
 			info = new Array();
 			info.name=req.param('name')
 			info.tag=req.param('tag');
 			info.sid=req.param('sid');
 			info.uid=req.param('uid');
 			
	 				// UniSquare.find({id: info.uid}).exec(function (err, unisquare) {

	 				// 	if(unisquare == '')
	 				// 	{
						// 	console.log('The university you requested this square to be added to does not exist!');
	 				// 	}
	 				// 	else
	 				// 	{
	 				// 		Square.find({sqrtag: info.tag}).exec(function (err, subsquare) {
	 				// 			if(subsquare = '')
	 				
	 				// 			{
	 					Square.create({name : info.name,admin:req.param('uid'),people:req.param('uid')}).exec(function createCB(err, created){
	 						console.log('Created a new square with the following stuff: ');
		 								// console.log(name);
		 								
		 							});	 									
	 					// 		}
	 					// 		else
	 					// 		{
							// 		console.log('The University already has this square!');
	 					// 		}
	 					// 		if(err)console.log(err);
	 					// 		res.ok();					          
	 					// 	});
	 					// }
	 				// });	
	// 		"name" "tag" 'sid' 'uid' 		
	//		WORKING!
},

addUser: function(req,res){

	info = new Array();
	info.sid=req.param('sid');
	info.uid=req.param('uid');


	Square.find({ id : info.sid}).exec(function (err,square) {
		if(square == '')
		{
			console.log("Square not found");
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
				    				square[0].people.add( info.uid );
				    				square[0].save(function(err){
				    					console.log('added the following user for square ' + square.name);
				    					console.log(info.uid);
				    				});	    				
				    			}
				    		});
		}
		res.ok();
	});
	//		"square_id" "user_id"
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their users 
	// 		as well.
	//		WORKING!			
},

removeUser: function(req,res){

	info = new Array();

	info.sid=req.param('square_id');
	info.uid=req.param('user_id');


	Square.find({ id : info.sid}).exec(function (err,square) {
		if(square == '')
		{
			console.log("Square not found");
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
				    				//TODO: Cannot remove if user doesnt exist.
				    				square.people.remove( info.uid );
				    				square.save(function(err){
				    					console.log('removed the following user for square ' + square.name);
				    					console.log(info.uid);
				    				});	    				
				    			}
				    		});
		}
		res.ok();
	});
	//		"square_id" "user_id"
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their users 
	// 		as well.
	//		WORKING!
},

deleteSquare: function(req,res){

	info = new Array();
	info.id=req.param('square_id')
	Square.find({id: info.id}).exec(function (err, square) {

		if(square == '')
		{
			console.log('No such square to delete!');   
		}
		else
		{
			Square.destroy({id : info.id}).exec(function deleteCB(err){
				console.log('Square with name: ' +  square.name  + ' has been deleted!' );
			});						
		}
		if(err)console.log(err);
		res.ok();
	});
	//		"square_id"
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then destroy them 
	// 	 	as well.
	//		WORKING!
},


addAdmin: function(req,res){


	info = new Array();

	info.sid=req.param('square_id');
	info.uid=req.param('user_id');


	var temp;
	var users_check=false;
	Square.findOne({id: info.sid}).populate('people').then(function(sq){
		var temp_square=sq;
	 					//check if the user is in the square or not
	 					while(temp_square.people.length!=0){//since people object is an array we have to iterate through it
	 						var temp_people=temp_square.people.pop();
	 						if(temp_people.id==info.uid){
	 							console.log("The user exists in this square");
	 							users_check=true;
	 							return [users_check,sq];
	 						}else{
	 							console.log(temp_people);	
	 						}
	 					}

	 					return [users_check,sq];
	 				}).spread(function(users_check,sq){

	 					console.log(sq);
	 					if(users_check){
	 						sq.admins.add( info.uid );
	 						sq.save(function(err){
	 							if(err){
	 								console.log(err);
	 							}else{
	 								console.log('added' + info.uid +' as admin for square ' + sq.name);
	 							}
	 						});
	 					}else{
	 						console.log("The user you are trying to add as an admin is not in this square");
	 					}
	 				}).catch(function(err){
	 					console.log(err);

	 				});
	 				res.ok();
	//		"square_id" "user_id"
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their admins 
 	// 		as well.
 	//		WORKING!
 },

 removeAdmin: function(req,res){

 	info = new Array();

 	info.sid=req.param('square_id');
 	info.uid=req.param('user_id');


 	var temp;
 	var users_check=false;
 	Square.findOne({id: info.sid}).populate('admins').then(function(sq){
 		var temp_square=sq;
	 					//check if the user is an admin in the square or not
	 					while(temp_square.people.length!=0){//since people object is an array we have to iterate through it
	 						var temp_people=temp_square.people.pop();
	 						if(temp_people.id==info.uid){
	 							console.log("The user is an admin in this square");
	 							users_check=true;
	 							return [users_check,sq];
	 						}else{
	 							console.log(temp_people);	
	 						}
	 					}

	 					return [users_check,sq];
	 				}).spread(function(users_check,sq){

	 					console.log(sq);
	 					if(users_check){
	 						sq.admins.remove( info.uid );
	 						sq.save(function(err){
	 							if(err){
	 								console.log(err);
	 							}else{
	 								console.log('removed' + info.uid +' as admin for square ' + sq.name);
	 							}
	 						});
	 					}else{
	 						console.log("The user you are trying to remove is not an admin in this square");
	 					}
	 				}).catch(function(err){
	 					console.log(err);

	 				});
	 				res.ok();
	//		"square_id" "user_id"
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their admins 
	// 		as well.
	//		NEED TO TEST!
},

addDiscussionForum: function(req,res){
	info = new Array();
	info.sid=req.param('square_id');
	info.name=req.param('forum_name');


	Square.findOne({ id : info.sid }).populate('people').then(function (square) {

		var temp;

	 					//	Dforum.portOver({name : dforum.name , sid : square.id , dfid : dforum.id }).exec(function createCB(err, dforum) {
	 					//	 });
	 						// if(err)console.log(err);
	 						console.log(square);


	 						Dforum.create({name:info.name,fmembers:square.people}).then(function (dforum) {		
	 							console.log('Created a forum');
	 							console.log(dforum.id);
	 							square.sforums.add(dforum.id);

	 							square.save(function(err){
	 								if(err){
	 									console.log(err);
	 								}else{
	 									console.log('added' + dforum.id +' as discussion forum for square ' + square.name);
	 								}});


	 							console.log(square.people);

	 						}).catch(function(err){
	 							console.log(err);
	 						});


	 						res.ok();
	 					}).catch(function(err){
	 						console.log(err);
	 					});	
	//		"square_id" "forumm_name"
	//TODO: Nothing in mind yet... think perhaps?
	//		WORKING!
},

removeDiscussionForum: function(req,res){
	info = new Array();
	info.sid=req.param('square_id');
	info.id=req.param('forum_id');


	Square.findOne({ id : info.sid }).populate('people').then(function (square) {

		var temp;
		var dforum_check=false;
		//	Dforum.portOver({name : dforum.name , sid : square.id , dfid : dforum.id }).exec(function createCB(err, dforum) {
		//	 });
			// if(err)console.log(err);
			console.log(square);


			Dforum.findOne({id:info.id}).then(function (dforum) {		
				if(dforum == '')
				{
					console.log('no forum found with this id');
					dforum_check = true;
				}
				else
				{
					console.log('Found a forum with id:');
					console.log(dforum.id);
					square.sforums.remove(dforum.id);

					square.save(function(err){
						if(err)
						{
							console.log(err);
						}
						else
						{
							console.log('removed' + dforum.id +' as discussion forum for square ' + square.name);
						}

						Dforum.destroy({id : dforum.id}).exec(function deleteCB(err){
							console.log('Dforum with id: ' +  dforum.id  + ' has been deleted!' );
						});	
					});

				}
				console.log(square.people);
			}).catch(function(err){
				console.log(err);
			});

			res.ok();
		}).catch(function(err){
			console.log(err);
		});	
	//		"square_id" "forumm_id"
	//TODO: Nothing in mind yet... think perhaps?
	//		WORKING!
},

addChat: function(req,res){
	info = new Array();
	info.sid=req.param('sid');
	info.cid=req.param('cid');


	Square.findOne({ id : info.sid }).populate('people').exec(function (err, square) {

		var temp;

	 					//	Dforum.portOver({name : dforum.name , sid : square.id , dfid : dforum.id }).exec(function createCB(err, dforum) {
	 					//	 });
	 						// if(err)console.log(err);
	 						console.log(square);


	 						ChatSquare.create({cid:info.cid,users:square.people}).exec(function (err, chatsqr) {		
	 							// console.log('Created a chat square');
	 							// console.log(dforum.id);
	 							Square.update({sid:info.sid},{chatSquare:chatsqr.id}).exec(function (err, updated){
	 								if(err) console.log(err);
	 							});
	 							ChatSquare.update({cid:info.cid},{square:info.sid}).exec(function (err, updated){
	 								if(err) console.log(err);
	 							});	 							
	 							if(err) console.log(err);
	 						});

	 						if(err) console.log(err);
	 						res.ok();
	 					});
},

removeChat: function(req,res){
		//Create the chat model
		//TODO: Write the function maybe?:p
		res.ok();
	//TODO: Need to figure out the chat module first...
},

getSquare: function(req, res){
	sid = req.param('sid');
	Square.find({id:sid}).populateAll().then(function(square){
		console.log(square);
		res.ok(square);
	}).catch(function(err){
		console.log(err);
		res.ok();
	});
},

addBadge: function(req,res){
		// Add a badge that can be alotted to members or people in general
	},

	removeBadge: function(req,res){
		// Remove from the list of badges than can be alloted
	},

	approveBadge: function(req,res){
		// Approve a users request for a badge
	},

	rejectBadge: function(req,res){
		// Reject a users request for a badge
	},
	sendNotification: function(req,res){
		var notification = req.param('notification');
		var sid = req.param('sid');
		//var admin = req.param('admin');
		
			Square.findOne({id:sid}).populate('people').then(function (sq){
				var temp_square = sq;
				while(temp_square.people.length!=0){//since people object is an array we have to iterate through it
					// var temp_people=temp_square.people.pop();
					var reciever = temp_square.people.pop().id;
					Profile.findOne({user:reciever}).populate('notifications').exec(function (err, found){
						if(err)console.log(err);
						//console.log(duper);
						//console.log(profile);
						Notification.create({content: notification ,profile:found}).exec(function (err, created){
							found.notifications.add(created);
							found.save(function(err){
								if(err){
									console.log(err);
								}else{
									console.log('Pushed: ' + notification + ' as notification to ' + found.user);
								}
							});
						});
						
					});
				}
			}).catch(function(err){
				console.log(err);
				res.ok();
			});


	}
};


