module.exports = function(req, res, next) {
	
	var userId = req.session.passport.user;

	var sname = req.param('sname');
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  			Square.findOne({sname: sname}).populate('admins').then(function (sq){
  				var users_check = false;
  				var temp_square=sq;

  				while(temp_square.admins.length!=0){//since people object is an array we have to iterate through it
	 				var temp_admins=temp_square.admins.pop();
					if(temp_people.id==userId){
							console.log("The user is an admin in this square");
 							users_check=true;
 							return [users_check,sq];
					}
				}

				return [users_check,sq];
			}).spread(function(users_check,sq){
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