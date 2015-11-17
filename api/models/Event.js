/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	attributes: {

  	organizer : {
  			model: 'user'
  	},
		title : { 
            type: 'string',
            required: true
        },
        description : { 
            type: 'string',
            required: true
        },
		date : { 
            type: 'string',
            required: true
        },
        place : { 
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

