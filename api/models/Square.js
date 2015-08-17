/**
* Square.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	sid:{
  		type: 'integer',
  		autoIncrement: true,
  		unique: true
  	},
  	name: {
  		type: 'string',
  		notNull: true,
  		unique: true
  	},
  	admins: {
      collection:'User',
      via: "isAdmin",
      unique:true
    },
	  people: {
      collection:'User',
      via:'mysquares'
    },
    sforums: {
    	collection: 'Dforum',
    	via : 'fsquares'
    },
    gentags: {
    	collection: 'Gentag',
    	via : 'squares'
    },
    unisquare:{
      model: 'UniSquare'
    },
    sqrtag:{
      model: 'Sqrtag'
    }
    


    }
};

