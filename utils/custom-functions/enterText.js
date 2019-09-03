var util = require('util');
var events = require('events');

// var elementSelector = "div.leo-canvasarea div.k-spreadsheet-cell-editor.k-spreadsheet-formula-input";

//div.k-spreadsheet-cell.k-spreadsheet-active-cell
function enterText() {
    events.EventEmitter.call(this);
}


util.inherits(enterText, events.EventEmitter);


enterText.prototype.command = function(text, cb) {

    var self = this;
    var elementSelector;
    //console.log(text);
    self.api.url(function(result) {
        if(result.value.includes('embedframe')) {
            elementSelector = "div.leo-canvasarea div.k-spreadsheet-cell-editor.k-spreadsheet-formula-input";
        } else {
            elementSelector = "div.k-spreadsheet-cell-editor.k-spreadsheet-formula-input";
        }
        
        self.api.doubleClick()
            .setValue(elementSelector, String(text), function() {

                if (typeof(cb) === "function") {
                    cb.call(self.client.api);
                }

                self.emit('complete');
                return this;

            });
    })

};

module.exports = enterText;