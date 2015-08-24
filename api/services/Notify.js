	module.exports = {

	sendNotification: function(notification,sid){

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