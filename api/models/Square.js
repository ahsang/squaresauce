/**
* Square.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		notNull: true,
  		unique: true
  	},
  	admin: {
      type: 'int'
    },
	  people: {
      collection:'User',
      via:'mysquares'
    },
    flags: {
    	type:'array',
    	notNull: true,
    	defaultsTo:'[0,0,0,0,0,0,0]'
    },
    dfroums: {
    	type: 'array',
    	defaultsTo: ''
    },
    Tags: {
    	type: 'array'
    },
    UniversitySquare: {
    	type: 'boolean',
    	defaultsTo: false
    },
    UniversityTag: {
    	type: 'string',
    	defaultsTo: null
    }
    


    }
};

