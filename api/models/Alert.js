/**
* Alert.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	attributes: {
    	event : { 
            type: 'string', // à changer en Event
            required: true
        },
  		type : { 
            type: 'string', // à changer en TypeAlert
            required: true
        },
  		user : { 
            model: 'user'
        },
        details : { 
            type: 'string',
            required: true
        },  		
        place : { 
            type: 'string',
            required: true
        },
        isAnonymous : { 
            type: 'boolean',
            defaultsTo: false
        },
        isDeleted : { 
            type: 'boolean',
          	defaultsTo: false
        },
  	}
};

