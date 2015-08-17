/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	  getPhotoUrl: function(req, res) {
    	Profile.findOne({id: req.route.params.id}).exec(function (err, profile) {
      	if (err || !user) 
      	{ 
      		return res.redirect('/images/deafult_profile_icon.png'); 
      	} 
      	else
      	{
      		return res.redirect(307, user.photoUrl);
      	}
    });
  },

  	  getPhotoId: function(req, res) {
    	Profile.findOne({id: req.route.params.id}).exec(function (err, profile) {
      	if (err || !user) 
      	{ 
      		return res.redirect('/images/deafult_profile_icon.png'); 
      	} 
      	else
      	{
      		// return res.redirect('storage link here' + user.photoId);
      	}
    });
  },

  	  addBadge: function(req,res){
  	  					// User can add a badge, this creates a badge request, to the approriate square
  	  },

  	  removeBadge: function(req,res){
  	  					// simple remove badge code goes here
  	  },

  	  rejectBadge: function(req,res){
  	  					// A user can decide wether to reject a badge request on his profile via another user
  	  },

  	  suggestBadge: function(req,res){
  	  					// A user can suggest a badge to a fellow user which he will approve, then it will forward to the appropriate square
  	  }


};

