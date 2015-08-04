/**
* Frequest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user1id: {
      type: 'int',
      notNull: true
    },
  	user2id: {
      type: 'int',
      notNull: true
    },
      	hash: {
      type: 'int',
      notNull: true,
      unique: true
    },
    status:{
    	type:'string',
    	notNull : true,
    	defaultsTo: 'pending'
    }
  



  }
};

