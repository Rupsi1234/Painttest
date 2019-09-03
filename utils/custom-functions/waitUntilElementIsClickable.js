var util = require('util');
var events = require('events');


/*
 * This custom command allows us to locate an HTML element on the page and then wait until the element is both visible
 * and does not have a "disabled" state.  It rechecks the element state every 500ms until either it evaluates to true or
 * it reaches maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle 
 * asynchronous code so this command is also an EventEmitter.
 */

function WaitUntilElementIsClickable() {
  events.EventEmitter.call(this);
  this.startTimeInMilliseconds = null;
}

util.inherits(WaitUntilElementIsClickable, events.EventEmitter);

WaitUntilElementIsClickable.prototype.command = function (element, timeoutInMilliseconds) {
  this.startTimeInMilliseconds = new Date().getTime();
  var self = this;
  var message;

  if (typeof timeoutInMilliseconds !== 'number') {
    timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
  }

  this.check(element, function (result, loadedTimeInMilliseconds) {
    if (result) {
      
      message = '@' + element + ' was clickable after ' + (loadedTimeInMilliseconds - self.startTimeInMilliseconds) + ' ms.';
      console.log(message);
    } else {
      message = '@' + element + ' was still not clickable after ' + timeoutInMilliseconds + ' ms.';
    }
    self.client.assertion(result, 'not visible or disabled', 'visible and not disabled', message, true);
    self.emit('complete');
  }, timeoutInMilliseconds);

  return this;
};

WaitUntilElementIsClickable.prototype.check = function (element, callback, maxTimeInMilliseconds) {
  var self = this;

  var promises =[];
  promises.push(new Promise(function(resolve) {
    self.api.isVisible(element, function(result) {
      resolve(result.status === 0 && result.value === true);
    });
  }));

  promises.push(new Promise(function(resolve) {
    self.api.getAttribute(element, 'disabled', function (result) {
      resolve(result.status === 0 && result.value === null);
    });
  }));

  Promise.all(promises)
    .then(function(results) {
      var now = new Date().getTime();
      const visibleAndNotDisabled = !!results[0] && !!results[1];
      if (visibleAndNotDisabled) {
        callback(true, now);
      } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
        setTimeout(function () {
          self.check(element, callback, maxTimeInMilliseconds);
        }, 10000);
      } else {
        callback(false);
      }
    })
    .catch(function(error) {
      setTimeout(function () {
        self.check(element, callback, maxTimeInMilliseconds);
      }, 5000);
    });
};

module.exports = WaitUntilElementIsClickable;