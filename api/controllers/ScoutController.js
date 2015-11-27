/**
 * ScoutController
 *
 * @description :: Server-side logic for managing scouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require("../../node_modules/sails/lib/hooks/blueprints/actionUtil");

module.exports = {
	create: function (req, res) {				
		var Model = actionUtil.parseModel(req);
		var data = actionUtil.parseValues(req);

		Model.create(data).exec(function created (err, scoutCreated) {
			if (err){
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('organizer');
			} 
			res.ok();
		});
	}, 

	destroy: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var data = actionUtil.parseValues(req);

		Model.destroy(data).exec(function destroyed(err, records) {
			if (err) {
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('organizer');
			}
			res.ok();
		});
	}
};

