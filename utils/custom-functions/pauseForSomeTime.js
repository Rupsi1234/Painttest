var util = require('util');
var events = require('events');


/*
 * This custom command allows us to locate an HTML element on the page and then wait until the element is both visible
 * and does not have a "disabled" state.  It rechecks the element state every 500ms until either it evaluates to true or
 * it reaches maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle 
 * asynchronous code so this command is also an EventEmitter.
 */

function pauseForSomeTime() {
  events.EventEmitter.call(this);

  this.timeoutInMilliseconds = 90000000;
}

util.inherits(pauseForSomeTime, events.EventEmitter);

pauseForSomeTime.prototype.command = function (customTimeInMilliseconds,timeoutInMilliseconds,cb) {

   var self = this;
    setTimeout(function() {
            self.api.pause(customTimeInMilliseconds);
          
            if (cb) {
                cb.call(self.client.api);
            }
        self.emit('complete');

    }, timeoutInMilliseconds);

  return this;

};

module.exports = pauseForSomeTime;