/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	attributes: {
   		user : {
    		model: 'user'
    	},
    	relatedUser : {
    		model: 'user'
    	},
    	subject : {
            type: 'string',
            required: true
       	},
       	content : {
            type: 'string',
            required: true
       	},
        state : { 
            type: 'string',
            defaultsTo: '1',
            size: 1
        }
  	}
};

