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
  }


};

