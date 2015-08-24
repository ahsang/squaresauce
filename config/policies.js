/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
      '*': ['fuckThemAll'],




    // AuthController: {
    //   '*': [ 'passport' ]
    // },
    // UserController: {
    //   // '*': true
    //   'me': [ 'basicAuth', 'passport', 'sessionAuth' ],
    //   'create': true,
    //   // 'read': true
    // },
    // // DforumController: {
    //   // '*': true
    // // },  
    // SquareController: {
    //   'createSquare': true
    // },
    // FrequestController:{
    //   '*': true
    // }, 
    InvitereqsController:{
       'create': true
    },
    MainController:{
      'login':true,
      'forbid':true
    }
    // SqrtagController:{
    //   '*': true
    // },
    // // UniSquareController:{
    //   // '*': true
    // // },            
    // // FriendController:{
    // //   '*': true
    // // },
    // // ProfileController:{
    // //   '*': true
    // // },
    // // GentagController:{
    // //   '*': true
    // // },
    // // OTestController:{
    // //   '*': true
    // // },
    // // ForumcommentController:{
    // //   '*': true
    // // },
    // ChatController:{
    //   'loadChat': ['basicAuth', 'passport', 'sessionAuth','hasAccessToChatRoom']
    // },
    // PChatController:{
    //   'loadChat': ['basicAuth', 'passport', 'sessionAuth','isMemberOfPersonalChat']
    // }



  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
