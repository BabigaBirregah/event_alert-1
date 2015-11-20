/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require ('bcrypt');
var actionUtil = require("../../node_modules/sails/lib/hooks/blueprints/actionUtil");

module.exports = {
	
	create: function (req, res) {
		var Model = actionUtil.parseModel(req);
		var data = actionUtil.parseValues(req);
	
		Model.create(data).exec(function created (err, user) {
			if (err){
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Email déjà utilisé')
				res.redirect('/');
			} 
			else {
				req.session.user = user;

				req.flash('type_flash_message', 'info');
				req.flash('flash_message', 'Votre inscription a réussie');
				res.redirect('/');
			}
		});
	},

	login: function (req, res) {
		var values = req.allParams();

		User.findOne({username: values.username}).exec(function (err, user){
			if (!user) {
				req.flash('type_flash_message', 'danger');
				req.flash('flash_message', 'Le nom d\'utilisateur ou le mot de passe ne correspond pas');
				res.redirect('/');
      		} else {
				User.comparePassword(values.password, user, function (err, valid) {
			        if (!valid) {
			        	req.flash('type_flash_message', 'danger');
						req.flash('flash_message', 'Le nom d\'utilisateur ou le mot de passe ne correspond pas');
						res.redirect('/');
			        } else {
			          	req.session.user = user;
			          	if ( user.type == 'c' ) {
						res.redirect('citizen');
			          	} else if (user.type == 'o') {
							res.redirect('organizer');
			          	}
			        }
				});
      		}
		});
	},

	logout: function (req, res) {
		req.session.destroy();
		res.redirect('/');
	}
	
};