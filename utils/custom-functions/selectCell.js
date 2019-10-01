var util = require('util');
var events = require('events');

var calculateDimensions = require('./../modules/getDimensions');

function selectCell() {
    events.EventEmitter.call(this);
}


util.inherits(selectCell, events.EventEmitter);


selectCell.prototype.command = function(cellName, cb) {


    var wdth;
    var hgt;
    res = cellName.substr(0, 1)
    var colNum = res.charCodeAt(0);

    var rowNum = cellName.replace(/[^0-9]/g, '');
    // change alphabet to index number
    if (colNum <= 89 && colNum >= 64) {      
        colNum = colNum - 64;
    }

    var self = this;
    var element;

    self.api.url(function (result) {
        if(result.value.includes('embedframe')) {
            element = "div.leo-canvasarea div.k-spreadsheet-cell.k-row-" + (rowNum - 1) + ".k-col-" + (colNum - 1);
        } else {
            element = "div.k-spreadsheet-cell.k-row-" + (rowNum - 1) + ".k-col-" + (colNum - 1);
        }
    })
    
    async function selectingCell() {

        //console.log("selecting Cell......")

        var newWidth = await calculateDimensions.getWidth(colNum, self);

        var newHeight = await calculateDimensions.getHeight(rowNum, self);

        // console.log(newWidth + " -- " + newHeight);

        self.api.moveToElement("body", newWidth, newHeight)
            .mouseButtonClick(0, function() {

                if (typeof(cb) === "function") {
                    cb.call(self.client.api);
                }

                self.emit('complete');

            })
    }

    self.api.element('css selector', element, function(result) {

        //if the css class of the corresponding cell does not exist call the original select cell criteria
        if (typeof(result.value.ELEMENT) == "undefined") {

            selectingCell();
            return this;

        } else {


            self.api.click(element, function() {

                if (typeof(cb) === "function") {
                    cb.call(self.client.api);
                }

                self.emit('complete');
                return this;

            })
        }

    });


};

module.exports = selectCell;