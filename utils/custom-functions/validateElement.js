var util = require('util');
var events = require('events');
var fs = require('fs');

var elementSelector = "div.k-spreadsheet-cell.k-spreadsheet-active-cell";

function validateElement() {
    events.EventEmitter.call(this);
    //this.timeoutInMilliseconds = 9999999999;
}


util.inherits(validateElement, events.EventEmitter);


validateElement.prototype.command = function(activeCell, target, property, expected) {

    timeoutInMilliseconds = 2000;

    var self = this;

    //var functionToExecute = "self.api." + propertyValidator + "('" + elementSelector + "','" + attribute + "', function(result){return self.api.verify.equal(result.value,'" + expectedValue + "')});";


    

   // setTimeout(function() {

        
    	self.api.selectCell(activeCell)
        		.getCssProperty(elementSelector,property,function(result)
        		{   
            		console.log("CSS property Value:"+ result.value);
            		console.log("CSS property Expected:"+expected);

            		self.api.verify.equal(result.value,expected);
            		self.emit('complete');
            		return this;
        });

   // }, timeoutInMilliseconds);


    
};

module.exports = validateElement;