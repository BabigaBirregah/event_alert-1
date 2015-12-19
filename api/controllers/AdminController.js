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
				res.view('admin/layout', {
					myNotifications: req.session.myNotifications,
					numberNotifications: numberNotifications
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

};

	