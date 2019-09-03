
var util = require('util');
var events = require('events');
var fs = require('fs');
function takeScreenshot() {
events.EventEmitter.call(this);
this.timeoutInMilliseconds = 90000000;
}


util.inherits(takeScreenshot, events.EventEmitter);


takeScreenshot.prototype.command = function(name,timeoutInMilliseconds,cb) {

	timeoutInMilliseconds=5000;
    var path = String("./reports/screenshots/"+new Date().getDate() + "-" + (new Date().getMonth()+ 1) + "-" + new Date().getFullYear());
    var self = this;
    setTimeout(function() {
            console.log("taking screenshot")
            if (fs.existsSync(path)) {
                self.api.pause(3000)
                        .saveScreenshot(String(path)+"/"+String(name)+ new Date().getDate()+ '_' + new Date().getHours()+ new Date().getSeconds()+ new Date().getMilliseconds()+'.jpeg').pause(2000)
          	     
            }
            else
            {
                fs.mkdirSync(path);
                self.api.pause(3000)
                        .saveScreenshot(String(path)+"/"+String(name)+ new Date().getDate() +'-'+ new Date().getHours()+'-'+ new Date().getSeconds()+'-'+ new Date().getMilliseconds()+'.jpeg').pause(2000);
            }


            if (cb) {
                cb.call(self.client.api);
            }
        self.emit('complete');

    }, timeoutInMilliseconds);


    return this;
};

module.exports = takeScreenshot;



