/**
 * InvitereqsController
 *
 * @description :: Server-side logic for managing Invitereqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		info = new Array();
		info.name = req.param('name');
		info.email= req.param('email');
		info.institution = req.param('institution');

		Invitereqs.find({email: info.email}).exec(function (err, invitereq) {
			
			if(invitereq == '')
			{
				Invitereqs.create({name : info.name, email:info.email, institution:info.institution}).exec(function createCB(err, created){
						res.send(created.name);
						// console.log('Created a new invite requestee: ' + created.name)
						if(err){console.log(err);}
							});
			} 
				else
				{
					// console.log('I found a user with this email....  ' + invitereq);
					// console.log(invitereq);
					res.send('Error 0069');
				}
				if(err){ console.log(err);}
		});



	}
};

