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
    	type: 'string',
        defaultsTo:''
    },
    pictureid: {
        type: 'string',
        defaultsTo:''
    },
    fbkid: {
        type:'string',
        defaultsTo:''
    },
    fname: {
        type:'string',
        defaultsTo:''
    }, 
    lname: {
        type:'string',
        defaultsTo:''
    },
    // uname: 'fhatim303', 
    // pass: 'hahahhahahahah123456', 
    // email: 'tworldpk@gmail.com', 
    cemail:{
        type:'string',
        defaultsTo:''
    },
    pinstitution: {
        type:'string',
        defaultsTo:''
    },
    major:{
        type:'string',
        defaultsTo:''
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
    },
    notifications:{
        type: 'array',
        defaultsTo : ['Welcome To SquareSauce!','See squaresauce.com/policy for privacy terms']
    }
    	


  }
};

