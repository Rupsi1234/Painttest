
var util = require('util');
var events = require('events');
var fs = require('fs');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader("./utils/props.properties");

function selectElement() {
	
events.EventEmitter.call(this);

}


util.inherits(selectElement, events.EventEmitter);

selectElement.prototype.command = function(propertyName, callback) {

	//timeoutInMilliseconds=5000;
   console.log(propertyName)
    var self = this;
   // setTimeout(function() {
        
       self.api.click(properties.get(propertyName)) 
              .pause((500),function(){

        
       		if(typeof (callback) === "function") {
                 callback.call(self.client.api);
                 }

       	 self.emit('complete');
       	 return this;

       })
       

  //  }, timeoutInMilliseconds);


    
};

module.exports = selectElement;



