
var util = require('util');
var events = require('events');
var fs = require('fs');

//var PropertiesReader = require('properties-reader');
//var properties = PropertiesReader("./utils/validate.properties");
var elementSelector = "div.k-spreadsheet-cell.k-spreadsheet-active-cell > div";

function validateAttribute() {
events.EventEmitter.call(this);
//this.timeoutInMilliseconds = 90000000;
}


util.inherits(validateAttribute, events.EventEmitter);


validateAttribute.prototype.command = function(activeCell, target, property, expected) {

	//timeoutInMilliseconds=10000;
   
    var self = this;
    
  //  var functionToExecute = "self.api."+propertyValidator+"('"+elementSelector+"','"+attribute+"', function(result){return self.api.verify.equal(result.value,'"+expectedValue+"')});";
  
        //    .pause(1500);
    
//    setTimeout(function() {        
       
      	//console.log("functionToExecute");
        self.api.selectCell(activeCell)
      	         .getAttribute(elementSelector, property, function(result) {

          console.log("attribute Value:"+result.value);
          console.log("attribute Expected:"+expected);

   			 self.api.verify.equal(result.value, String(expected).trim());

          self.emit('complete');
          return this;
  		})

     	
        

  //  }, timeoutInMilliseconds);


    
};

module.exports = validateAttribute;