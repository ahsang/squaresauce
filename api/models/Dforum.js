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
    	model: 'Square'
    },
    Tags: {
    	type: 'array'
    },
    admins: {
	    collection:'User',
	    via: "isForumAdmin",
	    unique:true
    },
    comments:{
      collection:'Forumcomment',
      via:'dforum'
    }



  }



  	
};

