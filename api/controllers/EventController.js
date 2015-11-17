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
				if (req._sails.hooks.pubsub) {
					if (req.isSocket) {
						Model.subscribe(req, eventCreated);
						Model.introduce(eventCreated);
					}
					Model.publishCreate(eventCreated, !req.options.mirror && req);
				}

				req.flash('type_flash_message', 'info');
				req.flash('flash_message', 'Votre événement a été créé');
				res.redirect('organizer');
			}
		});
	}
};

