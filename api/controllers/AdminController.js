/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res) {	
		res.view('admin/layout');
	},

	notifications: function(req, res) {
		res.view('admin/liste/notifications');
	},

};

	