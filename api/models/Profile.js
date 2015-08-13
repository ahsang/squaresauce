/**
* Profile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	User: {
    	model: 'User'
    },   
    Picture: {
    	type: 'string'
    },
    gentags:{
    	collection:'Gentag',
    	via:'profiles'
    },
    About:{
    	type:'string'
    },
    Unisquare:{
    	model: 'Unisquare'
    }



  }
};

