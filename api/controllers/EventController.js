/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require("../../node_modules/sails/lib/hooks/blueprints/actionUtil");

module.exports = {

	create: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var data = actionUtil.parseValues(req);
		
		data.organizer = req.session.user;

		Model.create(data).exec(function created (err, eventCreated) {
			if (err){
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('organizer');
			} 
			else {
				data.id = eventCreated.id;
				req.session.event = data;
				res.redirect('/type-alert/create');
			}
		});
	}, 
	destroy: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var pk = actionUtil.requirePk(req);

		Model.update({id: pk}, {state: 0}).exec(function updated(err, records) {
			if (err) {
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('organizer');
			}

		    req.flash('type_flash_message', 'info');
			req.flash('flash_message', 'L\'événement a bien été supprimé');
			res.redirect('organizer');
		});
	},
	update: function (req, res) {
		var data = actionUtil.parseValues(req);
		var Model = actionUtil.parseModel(req);

		Model.update({id: data.id}, data).exec(function updated(err, records) {
			if (err) {
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Une erreur est survenue');
				res.redirect('organizer');
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
