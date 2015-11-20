/**
 * OrganizerController
 *
 * @description :: Server-side logic for managing organizers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var exports = module.exports = {

	index: function (req, res) {
		var render = function(req, res) {
			res.view('organizer/layout', {
				user: req.session.user,
				listEvent: req.session.listEvent
			});
		};

		var findTypesAlert = function(i) {
			TypeAlert.find ({ event: req.session.listEvent[i].id }).then (function (typesAlert) {
				req.session.listEvent[i]['typesAlert'] = typesAlert;
				
				if (i < req.session.listEvent.length-1) {
					findTypesAlert(i+1);
				} else {
					render(req, res);
				}
			});
		};

		Event.find ({ organizer: req.session.user.id }).then (function (listEvent) { 
			req.session.listEvent = listEvent;
			if ( listEvent.length > 0 ) {
				findTypesAlert(0);
			} else {
				render(req, res);
			}
		});
	}
	
};

