/**
 * CitizenController
 *
 * @description :: Server-side logic for managing citizens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		Alert.find ({ user: req.session.user.id }).where({isDeleted : false}).then (function (listAlert) { 
			res.view('citizen/layout', {
				user: req.session.user,
				listAlert: listAlert
			});
		});
	}
};

