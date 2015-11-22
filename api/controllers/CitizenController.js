/**
 * CitizenController
 *
 * @description :: Server-side logic for managing citizens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {


		var findTypesAlert = function(i) {
			TypeAlert.find ({ event: req.session.listEvent[i].id }).then (function (typesAlert) {
				req.session.listEvent[i]['typesAlert'] = typesAlert;
				
				if (i < req.session.listEvent.length-1) {
					findTypesAlert(i+1);
				} else {
					Alert.find ({ user: req.session.user.id }).where({isDeleted : false}).then (function (listAlert) { 
						res.view('citizen/layout', {
							user: req.session.user,
							listAlert: listAlert,
							listEvent: req.session.listEvent
						});
					});	
				}
			});
		};

		Event.find().where({state : {'>': 0}}).then (function (listEvent) { 
			req.session.listEvent = listEvent;
			if ( listEvent.length > 0 ) {
				findTypesAlert(0);
			} else {
				Alert.find ({ user: req.session.user.id }).where({isDeleted : false}).then (function (listAlert) { 
					res.view('citizen/layout', {
						user: req.session.user,
						listAlert: listAlert,
						listEvent: req.session.listEvent
					});
				});			
			}
		});
	}
};

