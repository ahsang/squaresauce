/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	creator: {
  		model : 'User'
  	},
  	content: {
  		type : 'string'
  	},
  	unread: {
  		type : 'boolean',
  		defaultsTo : true
  	},
  	profile: {
  		model : 'Profile'
  	}
  }
};

