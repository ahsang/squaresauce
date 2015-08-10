/**
* Dforum.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type: 'string',
  		notNull: true
  	},
	fmembers: {
		collection: 'User',
		via: 'myforums'
    },
    fsquares: {
    	collection: 'Square',
    	via : 'sforums'
    },
    Tags: {
    	type: 'array'
    },
    Comments: {
    	type: 'array',
    	defaultsTo: ''
    },
	admins: {
	collection:'User',
	via: "isForumAdmin",
	unique:true
    }
  }


  	
};

