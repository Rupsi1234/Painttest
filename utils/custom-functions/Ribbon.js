var util = require('util');
var events = require('events');




function Ribbon() {
    events.EventEmitter.call(this);
    //this.timeoutInMilliseconds = 9999999999;
}


util.inherits(Ribbon, events.EventEmitter);

Ribbon.prototype.command = function(activeCells,text, Value, cb) {

    var self = this;
    var elementSelector = ".//div[@class='tooltipHeader']//span[@class='lr_text' and text()='"+text+"']/ancestor::div[contains(@class,'lr_buttonSelected')]";

   self.api.useXpath()
            .waitForElementPresent(elementSelector,30000,function(result){ 
            self.api.verify.equal(result.value.length, Value);
            self.api.useCss();
            if (typeof(cb) === "function") {
                cb.call(self.client.api);
            }
            self.emit('complete');
            return this;

        });

};
module.exports = Ribbon;