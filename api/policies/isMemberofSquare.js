module.exports = function(req, res, next) {
	
	var userId = req.session.passport.user;

	var squareId = req.param('sid');  // GET THE ROOM ID HERE!
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  			Square.findOne({sid: squareId}).populate('people').then(function (square){
  				var users_check = false;	
				var temp_square = square;
				//check if the user is in the square or not
				console.log(square);

				while(temp_square.people.length!=0)
				{//since people object is an array we have to iterate through it

					var temp_people=temp_square.people.pop();
					console.log(temp_people);
					if(temp_people.id==userId)
					{
						console.log("The user exists in this square");
						users_check=true;
						return [users_check,csqr];
					}
				}
				return [users_check,csqr];
			}).spread(function(users_check,csqr){
				if(users_check)
				{
					return next();
				}
				else
				{
					return res.forbidden('You do not have access to this square!');
				}
			}).catch(function(err){
				console.log(err);

			});

  // return res.forbidden('There are no users in this chat...');
  };

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)