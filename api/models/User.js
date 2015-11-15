/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require ('bcrypt')

module.exports = {

  attributes: {
        email : { 
        	type: 'email',
        	required: true,
            unique : true
        },
        username : { 
            type: 'string',
            required: true, 
        },
        salt : { 
        	type: 'string',
        },
        password : { 
        	type: 'string',
            minLength: 6,
        	required: true 
        },
        type : { 
        	type: 'string',
        	defaultsTo: 'c',
        	size: 1
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.salt;
            delete obj.password;
            return obj;
        }
    },

    beforeCreate : function (user, cb) {
        bcrypt.genSalt(10, function (err, salt) {
            user.salt = salt;
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            })
        })
    },

    comparePassword : function (password, user, cb) {
        bcrypt.compare(password, user.password, function (err, match) {

            if(err) cb(err);
            if(match) {
                cb(null, true);
            } else {
                cb(err);
            }
        })
    }
};

