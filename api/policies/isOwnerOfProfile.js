module.exports = function(req, res, next) {
	
	var userId = req.session.passport.user;

	var profileId = req.param('pid');  // GET THE ROOM ID HERE!
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  			Profile.find({user: userId}).then(function (profile){
  				var users_check = false;
  				if(profile=='')
  				{
  					users_check = false;
  				}	
				else
				{
					users_check = true;
				}

				return [users_check,csqr];
			}).spread(function(users_check,csqr){
				if(users_check)
				{
					return next();
				}
				else
				{
					return res.forbidden('You do not own this square!');
					// maybe add a redirect here to send you to profile view page?
				}
			}).catch(function(err){
				console.log(err);

			});

  // return res.forbidden('There are no users in this chat...');
  };

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)