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
	}, 
	destroy: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var pk = actionUtil.requirePk(req);

		Model.update({id: pk}, {isDeleted: true}).exec(function updated(err, records) {
			if (err) {
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('citizen');
			}

		    req.flash('type_flash_message', 'info');
			req.flash('flash_message', 'L\'alerte a bien été supprimé');
			res.redirect('citizen');
		});
	},
	update: function (req, res) {
		var data = actionUtil.parseValues(req);
		var Model = actionUtil.parseModel(req);

		Model.update({id: data.id}, data).exec(function updated(err, records) {
			if (err) {
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('citizen');
			}
		});
	},
	tableEdit: function (req, res) {
		var data = actionUtil.parseValues(req);

		if ( data.action == 'edit' ) {
			module.exports.update(req, res);
		} else if ( data.action == 'delete' ) {
			module.exports.destroy(req, res);
		}
	},
};

