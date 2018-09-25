class DialogFlowClient{

	/*
	*  Istantiates a DialogflowClient object
	*  @param data {object} : {
	*      token : your client access token
	*	   projectId : id of your GCP project when you've been developing your DialogFlow agent
	*	   language : language to use ("en", "it", "de", etc..)
	*      sessionId : current session's id
	*  }
	*/
	constructor(data) {
        if (!data || !data.projectId || !data.OAuth2Token) {
            throw new DialogFlowClientException("projectId is required");
        }
        this.projectId = data.projectId;
        this.OAuth2Token = data.OAuth2Token;
        this.language = data.language || DialogFlowOptions.DEFAULT_USER_LANGUAGE;
        this.sessionId = data.sessionId || this.generateSessionId();
    }

	/*
	*  Sends a request to the Dialogflow Agent
	*  with the supplied text message and send response to parseResponse()
	*  @ param message {string} : text to send
	*/
	sendTextRequest(message){
		let data = {};
		data.queryInput = {
			text : {
				text : message,
				languageCode : this.language
			}
		}

		let obj = this;
		let request = new XMLHttpRequest();
		request.onreadystatechange(function(){
			if(this.readyState === 4 && this.status === 200){
				console.log("response = " + this.responseText)
				let body = JSON.strinfify(this.responseText);
				obj.parseResponse(body);
			}
		});
		let url = DIALOGFLOW_BASE_URL + "projects/" + this.projectId + "/agent/sessions/" + this.sessionId + ":detectIntent";
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/json");
		request.setRequestHeader("Authorization", "Bearer " + this.OAuth2Token);
		let requestData = JSON.strinfify(data);
		request.send(requestData);
	}

	sendEventRequest(eventName, eventData, options){

	}

	// 
	parseResponse(response){

	}

	/**
     * Generates random sessionId
     * @returns {string}
     */
    generateSessionId() {
        return #rand() + #rand() + "-" + #rand() + "-" + #rand() + "-" +
            #rand() + "-" + #rand() + #rand() + #rand();
    }

    #rand(){
    	return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }


}