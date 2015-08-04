/**
 * FrequestController
 *
 * @description :: Server-side logic for managing frequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  viewbyrecieved: function(req,res){
    info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    // info.myid=req.param('user1id');
    info.id=req.param('user2id');
    console.log(info.id);
      Frequest.find({user2id: info.id}).exec(function (err, frequest) {
        console.log(frequest);
          if(err)console.log(err);

        res.ok();
    });
  },

  viewbysent: function(req,res){
    info = new Array();
    // Figure out here how to get id of the user that i currently logged in
    // info.myid=req.param('user1id');
    info.id=req.param('user1id');
    console.log(info.id);
      Frequest.find({user1id: info.id}).exec(function (err, frequest) {
        console.log(frequest);
          if(err)console.log(err);

        res.ok();
    });
  }
};

