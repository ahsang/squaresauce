/**
* Dforum.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	forumname:{
  		type: 'string',
  		notNull: true
  	},
  	admin: {
      type: 'int',
    },
	people: {
      type:'array',
      notNull: true,
      defaultsTo:''
    },
    Tags: {
    	type: 'array'
    },
    Comments: {
    	type: 'array',
    	defaultsTo: ''
    }
  }
};

