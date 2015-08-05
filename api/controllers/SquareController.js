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


	}






};


