/**
 * OTestController
 *
 * @description :: Server-side logic for managing Otests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getData: function(req,res){
		Otest.find().then(function(ot){
			console.log(ot.length);
			res.ok(ot);
		})
	}


};


