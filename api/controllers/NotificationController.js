/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require("../../node_modules/sails/lib/hooks/blueprints/actionUtil");

module.exports = {
	create: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var data = actionUtil.parseValues(req);
		var relatedUsers = data.relatedUser;

		for (var i=0; i<relatedUsers.length; i++) {
			data.relatedUser = relatedUsers[i];
			Model.create(data).exec(function created (err, user) {
				if (err){
					req.flash('type_flash_message', 'danger');
					req.flash('flash_message', 'Une erreur est survenue');
					res.redirect('organizer');
				} 
			});
		}
	}, 
};

