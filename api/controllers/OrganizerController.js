/**
 * OrganizerController
 *
 * @description :: Server-side logic for managing organizers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {
		Event.find ({ organizer: req.session.user.id }).then (function (listEvent) { 
			res.view('organizer/layout', {
				user: req.session.user,
				listEvent: listEvent
			});
		});
	}
	
};

