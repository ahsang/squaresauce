/**
 * SquareController
 *
 * @description :: Server-side logic for managing squares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	createSquare: function(req,res){
 		info = new Array();
 		tags = new Array();
 		info.name=req.param('name');
 		info.uni=req.param('uniflag');
 		info.unitag=req.param('unitag');
 		settags = req.param('tags');
 		info.admin = req.param('admin');

 		Square.find({name: info.name}).exec(function (err, square) {

 			if(square == '')
 			{
 				Square.find({UniversityTag: info.unitag}).exec(function (err, square) {

 					if(square == '')
 					{
 						Square.create({name : info.name, UniversityTag: info.unitag, admin: info.admin, tags: settags}).exec(function createCB(err){
 							console.log('tried creating a new square with the following stuff: ');
 							console.log(settags);
 						});					          
 					}
 					else
 					{
 						console.log('This university already has a square, go look it up!');
 					}

 					if(err)console.log(err);
 					res.ok();
 				});
 			}
 			else
 			{
 				console.log('A square with this name already exists, choose a different name');
 			}

 			if(err)console.log(err);
 			res.ok();
 		});
 	//IT WORKS FOR NOW! :D
 },

 addUser: function(req,res){

 	info = new Array();
 	info.sid=req.param('square_id');
 	info.uid=req.param('user_id');


 	Square.findOne({ id : info.sid}).exec(function (err,square) {
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
			    				square.people.add( info.uid );
			    				square.save(function(err){
			    					console.log('added the following user for square ' + square.name);
			    					console.log(info.uid);
			    				});	    				
			    			}
			    		});
 		}
 		res.ok();
 	});
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their users 
	// 		as well!
},

removeUser: function(req,res){

	info = new Array();

	info.sid=req.param('square_id');
	info.uid=req.param('user_id');


	Square.findOne({ id : info.sid}).exec(function (err,square) {
		if(square == '')
		{
			console.log("Square not found");
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
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their users 
	// 		as well!
},

deleteSquare: function(req,res){

	info = new Array();
	info.id=req.param('id')
	Square.find({id: info.id}).exec(function (err, square) {

		if(square == '')
		{
			console.log('No such square to delete!');   
		}
		else
		{
			Square.destroy({id : info.id}).exec(function createCB(err){
				console.log('Square with name: ' +  square.name  + ' has been deleted!' );
			});						
		}
		if(err)console.log(err);
		res.ok();
	});
	 //TODO: Add checks here to see, if any submodules exist within this square, if yes, then destroy them 
	 // 	 as well
	},

	updateInfo: function(req,res){
		if(err)console.log(err);
		res.ok();
	//TODO: Write the function maybe?:p
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
	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their admins 
 	// 		as well!
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
 	//TODO: Add checks here to see, if any submodules exist within this square, if yes, then update all their admins 
	// 		as well!
},


addDiscussionForum: function(req,res){
	info = new Array();
	info.sid=req.param('square_id');
	info.name=req.param('Forum_name');


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
 	//TODO: Test functionality of the function
 },

 removeDiscussionForum: function(req,res){
	//TODO: Port over the adddiscussion forum function here, then ensure that removal works as well for it,
	//      might need to add a fucntion in the dforum controller too.
	res.ok();
},

addChat: function(req,res){
	//Create the chat model
	//TODO: Write the function maybe?:p
	res.ok();
},

removeChat: function(req,res){
	//Create the chat model
	//TODO: Write the function maybe?:p
	res.ok();
},

addWorkSpace: function(req,res){
	//Create the workspace module
	//TODO: Write the function maybe?:p
	res.ok();
},

removeWorkspace: function(req,res){
	//Create the workspace module
	//TODO: Write the function maybe?:p
	res.ok();
}


};


