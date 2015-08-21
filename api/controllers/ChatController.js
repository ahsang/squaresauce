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

			// This is the message from connected client
			// So add new conversation
			Chat.create(data_from_client)
				.exec(function(error,data_from_client){
					console.log(data_from_client);
					Chat.publishCreate({id : data_from_client.id, message : data_from_client.message , user:data_from_client.user});
					ChatSquare.find({cid:data_from_client.cid}).exec(function (err, chatsquare){
						//console.log(chatobj);
						if(chatsquare=='')
						{
							console.log('couldnt find chat thingy');
						}
						else
						{
							console.log('i searched for a chatsquare with id: ' +data_from_client.cid);
							console.log('i found a chatsqr');
							console.log(chatsquare);
							chatsquare[0].messages.add( data_from_client.id );
				    		chatsquare[0].save(function(err){
					    		console.log('Added the message '+data_from_client.message+'to the chatsquare ' +data_from_client.cid);
					    	});
				    	}
				    	if(err) console.log(err);
					});
				}); 
		}
		else if(req.isSocket){
			Chat.watch(req.socket);
			console.log( 'User subscribed to ' + req.socket.id );
		}
	}
};

