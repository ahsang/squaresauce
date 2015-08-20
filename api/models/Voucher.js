/**
* Voucher.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type: 'string'
  	},
  	group_number: {
  		type: 'string'
  	},
  	programme:{
  		type: 'string'
  	},
  	campus_id:{
  		type: 'string'
  	},
  	gender:{
  		type: 'string'
  	},
  	city:{
  		type: 'string'
  	},
  	cell:{
  		type: 'string'
  	}
  }
};

