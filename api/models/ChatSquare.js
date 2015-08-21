/**
* ChatSquare.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	cid:{
  		type: 'string'
  	},
  		messages:{
  			collection: 'Chat',
  			via : 'myparent'
  	},
  		users:{
  			collection : 'User',
  			via : 'myChats'
  		},
      square:{
        model : 'Square'
      }
  }
};

