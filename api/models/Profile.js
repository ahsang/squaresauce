/**
* Profile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user: {
    	model: 'User'
    },   
    pictureurl: {
    	type: 'string'
    },
    pictureid: {
        type: 'string'
    },
    fbkid: {
        type:'string'
    },
    fname: {
        type:'string'
    }, 
    lname: {
        type:'string'
    },
    // uname: 'fhatim303', 
    // pass: 'hahahhahahahah123456', 
    // email: 'tworldpk@gmail.com', 
    cemail:{
        type:'string'
    },
    pinstitution: {
        type:'string'
    },
    major:{
        type:'string'
    },
    gentags:{
    	collection:'Gentag',
    	via:'profiles'
    },
    about:{
    	type:'string'
    },
    unisquare:{
    	model: 'UniSquare'
    },
    badges:{
        collection: 'Badge',
        via : 'profiles'
    },
    oongal:{
        type: 'integer',
        defaultsTo : 3
    }
    	


  }
};

