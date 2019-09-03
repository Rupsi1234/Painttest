
var util = require('util');
var events = require('events');

function waitUntilLoaderPresent() {
	events.EventEmitter.call(this);

  this.timeoutInMilliseconds = 90000000;
}
util.inherits(waitUntilLoaderPresent, events.EventEmitter);
waitUntilLoaderPresent.prototype.command = function (cb) {

 
 var self=this;
        self.api
          .waitForElementPresent(properties.get("loader"), 10000,function(){
  		  if (cb) {
     		 cb.call(self.client.api)
   			 }
         self.emit('complete');
   });

    return this; // allows the command to be chained.
};
module.exports = waitUntilLoaderPresent;