/**
 * http://usejsdoc.org/
 */
var util = require('util');
var events = require('events');

function countNumberOfRows() {
  events.EventEmitter.call(this);
  this.timeoutInMilliseconds = 90000000;
}

util.inherits(countNumberOfRows, events.EventEmitter);

countNumberOfRows.prototype.command = function (customTimeInMilliseconds,timeoutInMilliseconds,cb) {

   var self = this;
    setTimeout(function() {
    	//var rows;
    	self.api.execute(function () {
    	 		return document.getElementById('gd_well1_downloadTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length
    	 		//rows = document.querySelectorAll("#gd_well1_downloadTable > tbody > tr").length;
		})
            if (cb) {
                cb.call(self.client.api);
            }
       // return rows;    
        self.emit('complete');
    }, timeoutInMilliseconds);

  return this;

};

module.exports = countNumberOfRows;