/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require ('bcrypt');
var blueprintCreate = require("../../node_modules/sails/lib/hooks/blueprints/actions/create");

module.exports = {
	
	create: function (req, res) {
    	return blueprintCreate(req, res);
  	}
	
};

