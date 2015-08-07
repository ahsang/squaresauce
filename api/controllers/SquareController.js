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
 	},

 	addUser: function(req,res){
			// if(err)console.log(err);
			
			info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    info.sid=req.param('square_id');
    info.uid=req.param('user_id');


	    Square.findOne(info.sid).exec(function(err,square) {
	    	if(err){console.log("Square not found");}
	    	else{	
	    		square.people.add( info.uid );
	    		square.save(function(err){
	    			console.log('updated user for square 1');
	    		});
	    	}

	    });
    res.ok();
	},




deleteSquare: function(req,res){
	if(err)console.log(err);
	alert("are you sure?");
	res.ok();
},

updateInfo: function(req,res){
	if(err)console.log(err);
	res.ok();
},

addAdmin: function(req,res){
	if(err)console.log(err);

	res.ok();
},

removeAdmin: function(req,res){
	if(err)console.log(err);
	res.ok();
},

addMembers: function(req,res){
	if(err)console.log(err);
	res.ok();
},	

removeMembers: function(req,res){
	if(err)console.log(err);
	res.ok();
},

addDiscussionForum: function(req,res){
	if(err)console.log(err);
	res.ok();
},

removeDiscussionForum: function(req,res){
	if(err)console.log(err);
	res.ok();
},

addChat: function(req,res){
	if(err)console.log(err);
	res.ok();
},

removeChat: function(req,res){
	if(err)console.log(err);
	res.ok();
},

addWorkSpace: function(req,res){
	if(err)console.log(err);
	res.ok();
},

removeWorkspace: function(req,res){
	if(err)console.log(err);
	res.ok();
},


};


