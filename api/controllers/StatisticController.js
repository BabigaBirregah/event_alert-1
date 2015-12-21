/**
 * StatisticController
 *
 * @description :: Server-side logic for managing statistics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	alerts: function(req, res) {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate()-6);

		Alert.find().where({createdAt : {'>': lastWeek}}).then (function (alerts) {
			User.find().then (function (users) { 
				var alertsDataChart = [];
				for (var i=0; i<7; i++) {
					alertsDataChart[lastWeek.getDate()+i+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()] = 0;
				}

				for (var i=0; i<alerts.length; i++) {
					alertsDataChart[alerts[i].createdAt.getDate()+'/'+alerts[i].createdAt.getMonth()+'/'+alerts[i].createdAt.getFullYear()]++;
				}

				var dataChart = {
			        element: 'morris-area-chart',
			        data: [{
			            period: lastWeek.getDate()+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }, {
			            period: lastWeek.getDate()+1+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+1+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }, {
			            period: lastWeek.getDate()+2+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+2+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }, {
			            period: lastWeek.getDate()+3+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+3+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }, {
			            period: lastWeek.getDate()+4+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+4+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }, {
			            period: lastWeek.getDate()+5+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+5+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }, {
			            period: lastWeek.getDate()+6+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear(),
			            Alerte: alertsDataChart[lastWeek.getDate()+6+'/'+lastWeek.getMonth()+'/'+lastWeek.getFullYear()]
			        }],
			        xkey: 'period',
			        ykeys: ['Alerte'],
			        labels: ['Nombre d\'alerte'],
			        pointSize: 1,
			        hideHover: 'auto',
			        resize: false
			    };

				res.view('admin/chart/alerts', {
					myNotifications: req.session.myNotifications,
					dataChart: dataChart
				});
			});
		});
	},

	events: function(req, res) {
		var render = function (req, res) {
			res.view('admin/chart/events', {
				myNotifications: req.session.myNotifications,
				dataChart: req.session.dataChart
			});
		};

		var countAlerts = function(i) { 
			if (i < req.session.events.length) {
				Alert.count().where({event: req.session.events[i].id}).exec(function countCB(error, numberAlertes) {
					req.session.dataChart.data.push({
	            		event: req.session.events[i].title,
	            		Alerte: numberAlertes,
	        		});
					countAlerts(i+1);
				});				
			} else {
				render(req, res);
			}
		};

		Event.find().then (function (events) {
			req.session.events = events;

			req.session.dataChart = {
		        element: 'morris-bar-chart',
		        data: [],
		        xkey: 'event',
		        ykeys: ['Alerte'],
		        labels: ['Nombre d\'alerte'],
		        hideHover: 'auto',
		        resize: true
		    }

			if (events.length > 0) {
				countAlerts(0);
			} else {
				render(req, res);
			}
		});
	}
};

