/**
 * CitizenController
 *
 * @description :: Server-side logic for managing citizens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		var render = function(req, res) {
			res.view('citizen/layout', {
				user: req.session.user,
				listAlert: req.session.listAlert,
				listEvent: req.session.listEvent,
				listScout: req.session.listScout,
				users: req.session.users,
				listNotification: req.session.listNotification,
				listNotificationSended: req.session.listNotificationSended,
				numberNotifications: req.session.numberNotifications
			});
		};

		var findTypesAlert = function(i) {
			TypeAlert.find ({ event: req.session.listEvent[i].id }).then (function (typesAlert) {
				req.session.listEvent[i]['typesAlert'] = typesAlert;
				
				if (i < req.session.listEvent.length-1) {
					findTypesAlert(i+1);
				} else {
					Alert.find ({ user: req.session.user.id }).where({isDeleted : false}).then (function (listAlert) { 
						req.session.listAlert = listAlert;
						Scout.query ('SELECT * FROM scout INNER JOIN alert WHERE scout.alert=alert.id AND scout.user='+req.session.user.id+' AND alert.isDeleted = 0', function (err, listScout) { 
							req.session.listScout = listScout;
							render(req, res);
						});	
					});	
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

		Event.find().where({state : {'>': 1, '<': 3}}).then (function (listEvent) { 
			req.session.listEvent = listEvent;
			if ( listEvent.length > 0 ) {
				findTypesAlert(0);
			} else {
				Alert.find ({ user: req.session.user.id }).where({isDeleted : false}).then (function (listAlert) { 
					res.view('citizen/layout', {
						user: req.session.user,
						users: req.session.users,
						listAlert: listAlert,
						listScout: [],
						numberNotifications: req.session.numberNotifications,
						listNotification: req.session.listNotification,
						listNotificationSended: req.session.listNotificationSended,
						listEvent: req.session.listEvent
					});
				});			
			}
		});
	}
};

