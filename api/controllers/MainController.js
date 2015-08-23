/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req,res){
    	if(req.session.passport){
    		res.redirect('/home');
    	}else{
    		res.view('login');
    	}
  	
  
	},
	viewSquare: function(req,res){
		res.view('square');
	}
};

