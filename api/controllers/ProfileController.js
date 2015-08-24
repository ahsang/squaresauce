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
  },
  getfbkid: function(req, res) {
      Profile.find({user: req.params('id')}).exec(function (err, profile) {
        if (err || !profile) 
        { 
          return res.send('Error'); 
        } 
        else
        {
          return res.send(profile[0].fbk_id);
        }
    });
  },

  	  addBadge: function(req,res){
  	  					// User can add a badge, this creates a badge request, to the approriate square
  	  },

  	  removeBadge: function(req,res){
  	  					// simple remove badge code goes here
  	  },

  	  rejectBadge: function(req,res){
  	  					// A user can decide wether to reject a badge request on his profile via another user
  	  },

  	  suggestBadge: function(req,res){
  	  					// A user can suggest a badge to a fellow user which he will approve, then it will forward to the appropriate square
  	  },

  	  increaseOongal: function(req,res){
  	  	info = new Array();
  	  	info.id = req.param('uid')
  	  	console.log('i just got called yeah');
			Profile.findOne({id: info.id}).then(function(profile){
				console.log('something happened');
					var temp = profile.oongal;
					temp = temp + 1;
					profile.oongal = temp;
					profile.save(function(err){
					    	console.log('Raised the oongal to '+profile.oongal);
					    });
				res.ok();	 
			}).catch(function(err){
				console.log(err);
			});
  	  },

  	  decreaseOongal: function(req,res){
  	  	 info = new Array();
  	  	 info.id = req.param('uid')
			Profile.findOne({id: info.id}).then(function(profile){
					var temp = profile.oongal;
					temp = temp -1;
					profile.oongal = temp;
					profile.save(function(err){
					    	console.log('Reduced the oongal to '+profile.oongal);
					    });
				res.ok();	 
			}).catch(function(err){
				console.log(err);
			});
  	  },
      viewProfile:function(req,res){
        if(req.session.passport){
         User.find({id:req.session.passport.user}).populate('profile').populate('mysquares').then(function(user){
            if(user==''){
              res.view("403");
              // console.log(err)
            }else{


            req.session.user_data=user;
            req.session.userd=user[0].profile;

            req.session.square_data=user[0].mysquares;
            // console.log(user);
            console.log("Profile");
            // console.log(req.session.profile_data.name);
            res.view('home');  
            }
         }).catch(function(err){
            console.log("Error in updating the user's profile data for home");
            console.log(err);
         });
        }else{
            console.log("Hello");
            res.view("403");

        } 
        
      },
      username:function(req,res){
        // console.log("yeah");
        console.log("username"+req.param('username'));
        if(!req.param('username')){
        res.view('homepage');
        }else{
          if(req.session.passport){
              User.find({id:req.session.passport.user}).populate('profile').then(function(user){
                  if(user==''){
                    req.session.userd="hello";
                    req.session.userd.profile="hello";
                    req.session.userd.profile.fname="Not";
                    req.session.userd.profile.lname="Logged in";
                    req.session.userd.profile.fbkid="123456";
    
                      
                  }else{
                  req.session.userd=user[0].profile;
                }
              }).catch(function(err){
                  console.log(err);
              });
          }else{
                    profile=new Object();
                    profile.fname="Not";
                    profile.lname="Not Logged in";
                    profile.fbkid="123456";
                    req.session.userd=profile;
                                        
          }
          User.find({username:req.param('username')}).populate('profile').then(function(usr){
            console.log(usr);
            if(usr==''){
              res.view('abc');
            }else{
            req.session.profile_data=usr[0].profile;
            res.view('profile');
            }
          }).catch(function(err){
            console.log(err);
            console.log("Error in user finding");
          });



          // res.send(req.param('username'));
        }
      },

      readNotification : function(req,res){
        notif_id = req.param('notif_id')
        Notification.update({id:notif_id},{unread:false}).then(function (err, updated){
            if(err)console.log(err);
            res.ok();
        }).catch(function(err){
            console.log(err);
            console.log("Error when reading notification");
          });

      }

};

