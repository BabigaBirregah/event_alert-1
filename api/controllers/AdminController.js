/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res) {	
		Notification.query ('SELECT notification.id, notification.user, notification.relatedUser, notification.subject, notification.content, notification.receiverState, notification.createdAt, user.username FROM notification INNER JOIN user WHERE user.id=notification.user AND notification.relatedUser='+req.session.user.id+' ORDER BY createdAt DESC', function (err, myNotifications) { 
			req.session.myNotifications = myNotifications;
			Notification.count().exec(function countCB(error, numberNotifications) {
				Event.count().exec(function countCB(error, numberEvents) {
					req.session.numberEvents = numberEvents;
					Alert.count().exec(function countCB(error, numberAlerts) {
						res.view('admin/layout', {
							myNotifications: req.session.myNotifications,
							numberNotifications: numberNotifications,
							numberEvents: req.session.numberEvents,
							numberAlerts: numberAlerts
						});
					});
				});
			});
		});
	},

	notifications: function(req, res) {
		Notification.query ('SELECT notification.id, notification.user, notification.relatedUser, notification.subject, notification.content, notification.receiverState, notification.createdAt, user.username, relatedUser.username as relatedUsername FROM notification INNER JOIN user, user AS relatedUser WHERE user.id=notification.user AND relatedUser.id=notification.relatedUser ORDER BY createdAt DESC', function (err, listNotifications) { 
			res.view('admin/liste/notifications', {
				typeNotifications: 'notifications',
				myNotifications: req.session.myNotifications,
				listNotification: listNotifications
			});
		});
	},

	myNotifications: function(req, res) {
		res.view('admin/liste/notifications', {
			typeNotifications: 'myNotifications',
			myNotifications: req.session.myNotifications,
			listNotification: req.session.myNotifications
		});
	},	

	events: function(req, res) {
		var render = function (req, res) {
			res.view('admin/table/events', {
				myNotifications: req.session.myNotifications,
				listEvents: req.session.listEvents
			});
		}

		var findTypesAlert = function(i) {
			TypeAlert.find({ event: req.session.listEvents[i].id }).then (function (typesAlert) {
				req.session.listEvents[i]['typesAlert'] = typesAlert;
				
				if (i < req.session.listEvents.length-1) {
					findTypesAlert(i+1);
				} else {
					render(req, res);
				}
			});
		};		

		Event.find().then (function (listEvents) {
			req.session.listEvents = listEvents;

			if ( listEvents.length > 0 ) {
				findTypesAlert(0);
			} else {
				render(req, res);
			}
		});
	},

	alerts: function(req, res) {
		var render = function (req, res) {
			res.view('admin/table/alerts', {
				user: req.session.user,
				myNotifications: req.session.myNotifications,
				listEvents: req.session.listEvents,
				users: req.session.users,
			});
		}

		var findScout = function(i, j) {
			if (i == req.session.listEvents.length) {
				render(req, res);
			} else if ( req.session.listEvents[i]['alerts'].length > 0 && j<req.session.listEvents[i]['alerts'].length ) {
				Scout.find({ alert: req.session.listEvents[i]['alerts'][j].id }).then (function (scouts) {
					req.session.listEvents[i]['alerts'][j].scouts = scouts;
						findScout(i, j+1);
				});
			} else {
				findScout(i + 1, 0);
			}
		};

		var findAlerts = function(i) {
			Alert.find({ event: req.session.listEvents[i].id }).then (function (alerts) {
				req.session.listEvents[i]['alerts'] = alerts;
				
				if (i < req.session.listEvents.length-1) {
					findAlerts(i+1);
				} else {
					findScout(0, 0);
				}
			});
		};
		var findTypesAlert = function(i) {
			TypeAlert.find({ event: req.session.listEvents[i].id }).then (function (typesAlert) {
				req.session.listEvents[i]['typesAlert'] = typesAlert;
				
				if (i < req.session.listEvents.length-1) {
					findTypesAlert(i+1);
				} else {
					findAlerts(0);
				}
			});
		};	

		User.find().then (function (users) { 
			req.session.users = users;
		});

		Event.find().then (function (listEvents) {
			req.session.listEvents = listEvents;

			if ( listEvents.length > 0 ) {
				findTypesAlert(0);
			} else {
				render(req, res);
			}
		});
	},

	usersRight: function (req, res) {
		User.find().then (function (users) { 
			res.view('admin/users/right', {
				users: users,
				myNotifications: req.session.myNotifications,
			});
		});

	},

	exportAllEvents: function (req, res) {
		Event.find().then (function (listEvents) {
			var fileType = 'text/csv;charset=UTF-8';
			var exportAllEvents = {
				fileType: fileType,
				fileName: "export_all_events."+fileType.split( "/" )[1].split( ";" )[0],
				delimiter: ";",
				header: ["id", "organizer", "title", "description", "date", "place", "state", "createdAt", "updatedAt"],
				events: listEvents
			};
			res.send(exportAllEvents);
		});
	},
};

	