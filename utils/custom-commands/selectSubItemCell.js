var util = require('util');
var events = require('events');

var  calculateDimensions = require('./../modules/getDimensions');


function selectSubItemCell() {
    events.EventEmitter.call(this);
}


util.inherits(selectSubItemCell, events.EventEmitter);


selectSubItemCell.prototype.command = function(cellName, subItem, cb) {
    // if (arguments.length == 2 && typeof arguments[1] == 'function') {
    //     cb = arguments[1];
    //   } else if (typeof item == 'string') {
    //     args.push(id);
    //   }

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
    var subItemNumber = String(subItem)
    var element = "div.leo-instructionarea div.instruction-spreadsheet-component:nth-of-type(" + subItemNumber + ") div.k-spreadsheet-cell.k-row-" + (rowNum - 1) + ".k-col-" + (colNum - 1);
   
    async function selectingSubItemCellTest() {
        var newWidth = await calculateDimensions.getSubItemWidth(colNum, subItemNumber, self);

            var newHeight = await calculateDimensions.getSubItemHeight(rowNum, subItemNumber, self);
        
            console.log(newWidth + " -- " + newHeight);


            self.api.moveToElement("div.DLSLeonardo", newWidth, newHeight)
                    .mouseButtonClick(0,function(){

                      if(typeof (cb) === "function") {
                         cb.call(self.client.api);
                         }
                     
                          self.emit('complete');

            }) 
    }


    async function selectingSubItemCell(element) {

        self.api.element('css selector', element, function(result) {

        //if the css class of the corresponding cell does not exist call the original select cell criteria
        if (typeof(result.value.ELEMENT) == "undefined") {

            selectingSubItemCellTest();

        } else {

            self.api.click(element, function() {

                if (typeof(cb) === "function") {
                    cb.call(self.client.api);
                }

                self.emit('complete');

            })
        }

    });


     }
            selectingSubItemCell(element);
            return this;

     

};

module.exports = selectSubItemCell;