var util = require('util');
var events = require('events');
var fs = require('fs');

var calculateDimensions = require('./../modules/getDimensions');


function selectRange() {

    events.EventEmitter.call(this);
}


util.inherits(selectRange, events.EventEmitter);

selectRange.prototype.command = function(range, cb) {

    var dragtarget = [];
    var droptarget = [];
    var offset = [];
    var cellRange = String(range).split(":");

    var self = this;

    function offsets(cellName) {

        var colNum;
        var rowNum;

        colNum = (cellName.substr(0, 1)).charCodeAt(0);

        rowNum = cellName.replace(/[^0-9]/g, '');

        // console.log(colNum + " " +rowNum);

        if (colNum <= 89 && colNum >= 64) {
            colNum = colNum - 64;
        }

        return new Promise(function(resolve, reject) {

            calculateDimensions.getWidth(colNum, self).then(function(result) {
                offset[0] = result;


                calculateDimensions.getHeight(rowNum, self).then(function(result1) {
                    offset[1] = result1;
                    resolve(offset);
                })

            })

        })

    };


    var promise1 = new Promise(function(resolve, reject) {

        offsets(cellRange[0]).then(function(value) {
            resolve(value);
        });
    })


    var promise2 = new Promise(function(resolve, reject) {

        offsets(cellRange[1]).then(function(result) {
            resolve(result);
        });
    })



    async function runSerial() {
        var draggablesrc = [];
        var draggableto = [];

        const executePromise1 = await promise1;

        await (draggablesrc[0] = executePromise1[0]);
        await (draggablesrc[1] = executePromise1[1]);

        const executePromise2 = await promise2;
       
        await (draggableto[0] = executePromise2[0]);
        await (draggableto[1] = executePromise2[1]);


        self.api.moveToElement("body", draggablesrc[0], draggablesrc[1])
            .mouseButtonDown(0)
            .moveToElement("body", draggableto[0], draggableto[1])
            .mouseButtonUp(0, function() {

                if (typeof(cb) === "function") {
                    cb.call(self.client.api);
                }

                self.emit('complete');

            })

    }


    runSerial();
    return this;

};

module.exports = selectRange;