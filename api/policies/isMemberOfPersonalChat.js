module.exports = function(req, res, next) {
	
	var userId = req.session.passport.user;

	var roomId = req.param('pid');  // GET THE ROOM ID HERE!
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  			PersonalChat.findOne({pid: roomId}).populate('users').then(function (psqr){
  				var users_check = false;	
				var temp_square = psqr;
				//check if the user is in the square or not
				//console.log(psqr);

				while(temp_square.users.length!=0)
				{//since people object is an array we have to iterate through it

					var temp_users=temp_square.users.pop();
					console.log(temp_users);
					if(temp_users.id==userId)
					{
						console.log("The user exists in this square");
						users_check=true;
						return [users_check,psqr];
					}
				}
				return [users_check,psqr];
			}).spread(function(users_check,psqr){
				if(users_check)
				{
					return next();
				}
				else
				{
					return res.forbidden('You do not have access to this chat!');
				}
			}).catch(function(err){
				console.log(err);

			});

  // return res.forbidden('There are no users in this chat...');
  };

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)