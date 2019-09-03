var util = require('util');
var events = require('events');
var fs = require('fs');

var keysData = fs.readFileSync('./../Spreadsheet_Automation/utils/modules/keys.json');

keysToParse = JSON.parse(keysData, null);


function keyPress() {
    events.EventEmitter.call(this);
}


util.inherits(keyPress, events.EventEmitter);


keyPress.prototype.command = function(keysToPress, cb) {
    var self = this;

    var array = keysToPress.split(",");
    var keysArray = [];

    //console.log(array)
    var len = array.length;

    for (var i = 0; i < len; i++) {
        try {

            if (typeof(keysToParse[array[i]]) != "undefined") {

                keysArray.push(keysToParse[array[i]]);

            } else {

                keysArray.push(array[i]);
            }

        } catch (err) {
            console.log(err);
        }
    }

    self.api.keys(keysArray, function() {
        console.log("keysToPress: " + array);

        if (typeof(cb) === "function") {
            cb.call(self.client.api);
        }


        self.emit('complete');
        return this;

    });

};
module.exports = keyPress;