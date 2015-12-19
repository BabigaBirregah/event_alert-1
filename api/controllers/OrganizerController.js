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
				users: req.session.users,
				listNotification: req.session.listNotification,
				listNotificationSended: req.session.listNotificationSended,
				numberNotifications: req.session.numberNotifications
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
			if (i == req.session.listEvent.length) {
				render(req, res);
			} else if ( req.session.listEvent[i]['alerts'].length > 0 && j<req.session.listEvent[i]['alerts'].length ) {
				Scout.find({ alert: req.session.listEvent[i]['alerts'][j].id }).then (function (scouts) {
					req.session.listEvent[i]['alerts'][j].scouts = scouts;
						findScout(i, j+1);
				});
			} else {
				findScout(i + 1, 0);
			}
		};

		var findAlerts = function(i) {
			Alert.find({ event: req.session.listEvent[i].id }).then (function (alerts) {
				req.session.listEvent[i]['alerts'] = alerts;
				
				if (i < req.session.listEvent.length-1) {
					findAlerts(i+1);
				} else {
					findScout(0, 0);
				}
			});
		};

		User.find().then (function (users) { 
			req.session.users = users;
		});

		Notification.query ('SELECT notification.id, notification.user, notification.relatedUser, notification.subject, notification.content, notification.receiverState, notification.createdAt, user.username FROM notification INNER JOIN user WHERE user.id=notification.user AND notification.relatedUser='+req.session.user.id, function (err, listNotification) { 
			req.session.listNotification = listNotification;
		});

		Notification.query ('SELECT notification.id, notification.subject, notification.content, notification.senderState, notification.createdAt, user.username FROM notification INNER JOIN user WHERE user.id=notification.relatedUser AND notification.user='+req.session.user.id, function (err, listNotificationSended) { 
			req.session.listNotificationSended = listNotificationSended;		
		});

		Notification.count().where({relatedUser: req.session.user.id, receiverState: '1'}).exec(function countCB(error, numberNotifications) {
			req.session.numberNotifications = numberNotifications;
		});

		Event.find({ organizer: req.session.user.id }).where({state : {'>': 0}}).then (function (listEvent) { 
			req.session.listEvent = listEvent;

			if ( listEvent.length > 0 ) {
				findTypesAlert(0);
			} else {
				render(req, res);
			}
		});
	}
	
};

