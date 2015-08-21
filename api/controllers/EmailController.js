/**
 * EmailController
 *
 * @description :: Server-side logic for managing Emailcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'send': function(req, res) {
    sails.hooks.email.send(
      "testEmail", {
        recipientName: "Joe",
        senderName: "Sue"
      }, {
        to: "ahsangondal15@gmail.com",
        subject: "Hi there"
      },
      function(err) {
        if (err) {return res.serverError(err);}
        return res.ok("Email Sent");
      }
    );
  },
  'show': function(req, res) {
    var path = require('path');
    require('fs').readFile(path.resolve(__dirname,"..","..",".tmp","email.txt"), {encoding:"utf8"}, function(err, text) {
      if (err) {return res.serverError(err);}
      res.set("Content-Type","text/plain");
      return res.ok(text);
    });
  }
};

