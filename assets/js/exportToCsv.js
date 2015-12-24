function exportAlertsToCsv(data, indice) { 
	var dataToAlertsCsv="";

    for (var i=0; i<data['headerAlert'].length; i++) {
    	dataToAlertsCsv += data['headerAlert'][i]+data['delimiter'];
    }

    dataToAlertsCsv += "\n";

    for (var j=0; j<data['events'][indice]['alerts'].length; j++) {
    	for (var k=0; k<data['headerAlert'].length; k++) {
    		if ( data['headerAlert'][k] == "scouts" ) {
    			for (var l=0; l<data['events'][indice]['alerts'][j]['scouts'].length; l++) {
    				for(var m=0; m<data.users.length; m++) {
                        if( data.users[m].id == data['events'][indice]['alerts'][j]['scouts'][l].user ) {
                                dataToAlertsCsv += data.users[m].username+' ';
                        }
                    } 
    			}
    			dataToAlertsCsv += ';';
    		} else {
    			dataToAlertsCsv += data['events'][indice]['alerts'][j][data['headerAlert'][k]]+data['delimiter'];
    		}
	    }
	    dataToAlertsCsv += "\n";
    }
	return dataToAlertsCsv;
}

function exportEventsToCsv(data, alertsFolder) { 
	var dataToEventsCsv="";

    for (var i=0; i<data['headerEvent'].length; i++) {
    	dataToEventsCsv += data['headerEvent'][i]+data['delimiter'];
    }

    dataToEventsCsv += "alertes"+ data['delimiter'];

    dataToEventsCsv += "\n";

    for (var j=0; j<data['events'].length; j++) {
    	for (var k=0; k<data['headerEvent'].length; k++) {
    		if (data['headerEvent'][k] == "place") {
				dataToEventsCsv += data['events'][j]["place"].replace(";", "/")+data['delimiter'];
    		} 
     		else if (data['headerEvent'][k] == "typesAlert") {
				for (var l=0; l<data['events'][j]['typesAlert'].length; l++) {
					dataToEventsCsv += data['events'][j]['typesAlert'][l]['name']+' ';
		    	}
				dataToEventsCsv += ';';
     		} 
    		else {
    			dataToEventsCsv += data['events'][j][data['headerEvent'][k]]+data['delimiter'];
    		}
	    }
	    if ( data['events'][j].alerts.length > 0 ) {
	    	var alertFile = data['events'][j].id+"_"+data['events'][j].title+"."+data['fileType'];
	    	dataToEventsCsv += "=LIEN_HYPERTEXTE(\"alerts/"+alertFile+"\")";
			alertsFolder.add(alertFile, exportAlertsToCsv(data, j));
	    } else {
	    	dataToEventsCsv += "Pas d'incident signalé";
	    }
	    dataToEventsCsv += "\n";
    }
	return dataToEventsCsv;
}

function exportNotificationsToCsv(data) { 
	var dataToNotificationsCsv="";

    for (var i=0; i<data['headerNotifications'].length; i++) {
    	dataToNotificationsCsv += data['headerNotifications'][i]+data['delimiter'];
    }

    dataToNotificationsCsv += "\n";

    for (var j=0; j<data['notifications'].length; j++) {
    	for (var k=0; k<data['headerNotifications'].length; k++) {
    		dataToNotificationsCsv += data['notifications'][j][data['headerNotifications'][k]]+data['delimiter'];
	    }
	   
	    dataToNotificationsCsv += "\n";
    }
	return dataToNotificationsCsv;
}

function exportUsersToCsv(data) { 
	var dataToUsersCsv="";

    for (var i=0; i<data['headerUser'].length; i++) {
    	dataToUsersCsv += data['headerUser'][i]+data['delimiter'];
    }

    dataToUsersCsv += "\n";

    for (var j=0; j<data['users'].length; j++) {
    	for (var k=0; k<data['headerUser'].length; k++) {
    		dataToUsersCsv += data['users'][j][data['headerUser'][k]]+data['delimiter'];
	    }
	   
	    dataToUsersCsv += "\n";
    }
	return dataToUsersCsv;
}