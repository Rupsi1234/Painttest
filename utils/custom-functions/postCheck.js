var util = require('util');
var events = require('events');
var fs = require('fs');
var elementStyles;
var syncLoop = require('../../utils/modules/syncLoop.js')

function Postcheck() {
    events.EventEmitter.call(this);
}



//regex to match first - and first lower case letter

util.inherits(Postcheck, events.EventEmitter);

Postcheck.prototype.command = function(activeCells, callback) {

    console.log("POST Check - Cells: " + activeCells + " -- Count: " + activeCells.length)

    var self = this;

    if (activeCells.length === 1 && activeCells[0] === "") {


        if (typeof(callback) === "function") {
            callback.call(self.client.api);
        }

        self.emit('complete');
        return this;
    }

    syncLoop.loopExecution(activeCells.length, function(loop) {

        var itr = loop.iteration();

        res = activeCells[itr].substr(0, 1)

        var colNum = res.charCodeAt(0);

        var rowNum = activeCells[itr].replace(/[^0-9]/g, '');
        // change alphabet to index number
        if (colNum <= 89 && colNum >= 64) {
            colNum = colNum - 64;
        }

        var elementStylesSelector = "div.k-spreadsheet-cell.k-row-" + (rowNum - 1) + ".k-col-" + (colNum - 1);

        //  console.log(elementStylesSelector);

        self.api.execute(function(elementStylesSelector) {

            //cssproperties
            var array = [].slice.call(document.querySelector(elementStylesSelector).style);
            //regex to replace '-' and first charatcter which if lower case to upper case 
            var regex = /\-[a-z]{0,1}/g;

            elementStyles = document.querySelector(elementStylesSelector).style;
            style = new Object();

            for (i = 0; i < array.length; i++) {

                array[i] = array[i].replace(regex, function(match) {

                    return match.toUpperCase().replace("-", "");

                })

                // console.log(elementStyles[array[i]]);
                //  console.log(array[i]);

                style[array[i]] = elementStyles[array[i]];
            }

            //child elements
            element = document.querySelector(elementStylesSelector);

            if (element["childElementCount"] > 0) {
                for (itr = 0; itr < element["childElementCount"]; itr++) {

                    // console.log(element["children"][itr]);
                    style["class"] = element["children"][itr]["className"];
                }

            }


            return style;

        }, [elementStylesSelector], function(response) {


            //   console.log(JSON.stringify(response.value));

            cellData = new Object();

            cellData[activeCells] = response.value;

            cellData["style"] = response.value;

            if (!(fs.existsSync('./temp/postcheck.json'))) {

                cellData = new Object();

                cellData[activeCells[itr]] = response.value;

                fs.writeFileSync('./temp/postcheck.json', JSON.stringify(cellData, null, 4), 'utf-8');

                loop.next();

            } else {


                var postCellState = fs.readFileSync('./temp/postcheck.json');
                appendData = JSON.parse(postCellState);

                appendData[activeCells[itr]] = response.value;

                fs.writeFileSync('./temp/postcheck.json', JSON.stringify(appendData, null, 4), 'utf-8');

                loop.next();

            }


        })

    }, function() {

        console.log("Postcheck completed");

        if (typeof(callback) === "function") {

            callback.call(self.client.api);
        }


        self.emit('complete');

        return self.api;

    });

};

module.exports = Postcheck;