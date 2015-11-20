/**
 * AlertController
 *
 * @description :: Server-side logic for managing alerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require("../../node_modules/sails/lib/hooks/blueprints/actionUtil");

module.exports = {
	create: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var data = actionUtil.parseValues(req);
		
		data.user = req.session.user;

		data.isAnonymous = (data.isAnonymous == 'on') ? true:false;

		Model.create(data).exec(function created (err, alertCreated) {
			if (err){
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('citizen');
			} 
			else {
				req.flash('type_flash_message', 'info');
				req.flash('flash_message', 'Votre incident a été alerté');
				res.redirect('citizen');
			}
		});
	}
};

