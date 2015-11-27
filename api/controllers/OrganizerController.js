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
				listEvent: req.session.listEvent,
				users: req.session.users
			});
		};

		var findTypesAlert = function(i) {
			TypeAlert.find({ event: req.session.listEvent[i].id }).then (function (typesAlert) {
				req.session.listEvent[i]['typesAlert'] = typesAlert;
				
				if (i < req.session.listEvent.length-1) {
					findTypesAlert(i+1);
				} else {
					findAlerts(0);
				}
			});
		};		

		var findScout = function(i, j) {
			if ( req.session.listEvent[i]['alerts'][j] != undefined ) {
				Scout.find({ alert: req.session.listEvent[i]['alerts'][j].id }).then (function (scouts) {
					req.session.listEvent[i]['alerts'][j].scouts = scouts;
					if (j < req.session.listEvent[i]['alerts'].length-1) {
						findScout(j+1);
					}
				});
			}
		};

		var findAlerts = function(i) {
			Alert.find({ event: req.session.listEvent[i].id }).then (function (alerts) {
				req.session.listEvent[i]['alerts'] = alerts;
	
				if ( req.session.listEvent[i]['alerts'].length > 0 ) {
					findScout(i, 0);
				}
				
				if (i < req.session.listEvent.length-1) {
					findAlerts(i+1);
				} else {
					render(req, res);
				}
			});
		};

		User.find().then (function (users) { 
			req.session.users = users;

			Event.find({ organizer: req.session.user.id }).where({state : {'>': 0}}).then (function (listEvent) { 
				req.session.listEvent = listEvent;

				if ( listEvent.length > 0 ) {
					findTypesAlert(0);
				} else {
					render(req, res);
				}
			});
		});
	}
	
};

