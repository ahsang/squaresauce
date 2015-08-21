/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		addConv:function (req,res) {
		
		var data_from_client = req.params.all();
		if(req.isSocket && req.method === 'POST'){

				// THINGS TO DO: implement a user allowed list in the model, and make sure the requesting user is in that list,
				// if he is not, he is denied access to create a socket!


			Chat.create(data_from_client)
				.exec(function(error,data_from_client){
					//Chat.publishCreate({id : data_from_client.id, message : data_from_client.message , user:data_from_client.user});
					ChatSquare.find({cid:data_from_client.cid}).exec(function (err, chatsquare){
						//console.log(chatobj);
						if(chatsquare=='')
						{
							res.send("Error 0090: No such chat square exists");
						}
						else
						{
							// console.log('i searched for a chatsquare with id: ' +data_from_client.cid);
							// console.log('i found a chatsqr');
							//console.log(chatsquare);
							chatsquare[0].messages.add( data_from_client.id );
				    		chatsquare[0].save(function(err){
					    	//	console.log('Added the message '+data_from_client.message+'to the chatsquare ' +data_from_client.cid);
					    	});
					    	ChatSquare.publishUpdate(chatsquare[0].cid, {messages: data_from_client});
					    	//console.log('i sent a broadcast to all subscribers of chatsquare: '+ chatsquare[0].cid);
					    	//console.log('The message that i brodcasted was: '+ data_from_client);
				    	}
				    	if(err) console.log(err);
					});
				}); 
		}
		else {
      			res.send("Error 0091: Your sauce couldnt be processed by the chat controller");
			}
			return res.ok();
	},

	subSocket:function (req,res){


				// THINGS TO DO: implement a user allowed list in the model, and make sure the requesting user is in that list,
				// if he is not, he is denied access to create a socket!

				var data_from_client = req.params.all();

				if(req.isSocket && req.method === 'POST'){
				//console.log(data_from_client.cid);
				ChatSquare.find({cid:data_from_client.cid}).exec(function (err, chatsquare){
					if(chatsquare=''){
						res.send("Error 0090: No such chat square exists")
					}

					var temp = chatsquare[0].cid;
      			ChatSquare.subscribe(req, temp);
      			console.log( 'The socket: ' + req.socket.id +' is now subscribed to the chatsquare: '+ chatsquare[0].cid );
      			if(err) console.log(err);
      			});

      				return res.ok();


			
		}else
		{
			res.send("Error 0091: Your sauce couldnt be processed by the chat controller");
		}
	}

};

