/**
 * TypeAlertController
 *
 * @description :: Server-side logic for managing typealerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res) {
		for (var typeAlert in req.session.event) {
			if (typeAlert.indexOf("type_alert") != -1) {
				var typeAlert = {event: req.session.event, name: req.session.event[typeAlert]};
				
				TypeAlert.create(typeAlert).exec(function created (err, typeAlertCreated) {
					if (err){
						req.flash('type_flash_message', 'danger');
						req.flash('flash_message', 'Une erreur est survenue');
						res.redirect('organizer');
					}
				});
			}
		}
		req.flash('type_flash_message', 'info');
		req.flash('flash_message', 'Votre événement a été créé');
		res.redirect('organizer');
	}
	
};

