/**
 * OTestController
 *
 * @description :: Server-side logic for managing Otests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getData: function(req,res){
		OTest.find().exec(function(err, ot) {
  			console.log(ot.length);
			res.ok(ot);
		})
	},

	retrieveVoucher: function(req,res){
    	info= new Array();
    	info.voucher=req.param('voucher');
		//This function does two things!
		// 1. Creates a new user account once a user adds the voucher number, returns user name to the front end,
		// then it logs in the user, deletes the voucer entry from the otest model.
		
		// 2. Add this user to his relavant oweek square!
      
			OTest.find({ VoucherNo : info.voucher }).then(function (otest) {
	 			var temp=new Object();
        if(otest=='')
	 				{
            // console.log("sending  "+otest);
	 					temp='Error 0070';
	 				}
	 			else
	 				{	
            console.log(otest);
          
	 		      			
	 					temp.username   = 	otest[0].Username;
	 					temp.email 	    =	otest[0].Email;
	 					temp.password   = 	otest[0].VoucherNo+"000";
	 					temp.name 	    = 	otest[0].FullName;
	 					temp.city 	    =	otest[0].City;
	 					temp.cell 	    =	otest[0].Cell;
	 					temp.gender     =	otest[0].Gender;
 	 					temp.programme  =	otest[0].Programme;
	 					temp.lastdegree =	otest[0].LastDegree;
	 					temp.group		=	otest[0].GroupNo;
            // console.log("sending  "+temp);
 	 				
          	
	 			   
        	}

          return [temp,otest];		 

	 		}).spread(function(temp,otest){
          console.log(otest);
          
              OTest.destroy({VoucherNo : info.voucher}).exec(function destroyer(err,destroyed){
                if(err)console.log(err);
                // console.log(destroyed);
                // console.log("destroyed");
              });
          
          // console.log("I am spreading");
          console.log(temp);
          res.send(temp);
          

      }).catch(function(err){
	 			console.log(err);
	 			//res.send('Error 0070');
	 		});


	},

	createSpecialUser : function(req,res){
    // console.log(req.body);

    // console.log(req.param('username'));
    req.session.autopwd = req.param('password');
    req.session.autouser = req.param('username');
    req.session.username = req.param('username');
    req.session.password = req.param('password');
    req.session.email = req.param('email');


    req.session.autoaction = 'login';
    sails.services.passport.protocols.local.register(req.body, function (err, newuser) {
      if (err)
      { 
        // return next(err);
        console.log(err);
        res.send(err);
      }else{
          Profile.create({user : newuser}).then(function (profile){
            
              User.update({id:newuser.id},{profile:profile}).then(function (updated){
                
                // console.log('im sending this via http: ' + newuser.id);
                var temp=new Object();
                temp.identifier=req.session.autouser;
                temp.password=req.session.autopwd;

                return [temp];

                //Code to add this user to the relevant square goes here!
                // DO HERE: ADD THIS USER TO HIS SQUARE VIA adduser or whatever

              }).spread(function(tem){
                  req.session.autopwd=null;
                  req.session.autouser=null;


                  res.send(tem);



              }).catch(function(err){
                  console.log(err);
                  res.send(err);
                

              });
        }).catch(function(err){
              console.log("Error in Profile Creation: "+err);
              res.send(err);

        });
      }
    });

	}



};


