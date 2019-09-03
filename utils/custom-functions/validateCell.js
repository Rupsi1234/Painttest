var util = require('util');
var events = require('events');
var fs = require('fs');
const assert = require('assert');



var diff = require('deep-diff');

var syncLoop = require('../../utils/modules/syncLoop.js')
var elementSelector = "div.k-spreadsheet-cell.k-spreadsheet-active-cell";
var elementSelector1= "div.k-spreadsheet-cell.k-spreadsheet-active-cell>div";
var formulabarvalue=".k-spreadsheet-formula-bar>.k-spreadsheet-formula-input";
function iterationCopy(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            target[prop] = src[prop];
        }
    }
    return target;
}


function Validate() {
    events.EventEmitter.call(this);
}


util.inherits(Validate, events.EventEmitter);


Validate.prototype.command = function(activeCells, target, property, expected, precheckEvaluation, callback) {
    flag = true;

    var self = this;

    var cellsToSelect = activeCells.split(",");

    console.log(cellsToSelect);
    var existingCellData = {};

    syncLoop.loopExecution(cellsToSelect.length, function(loop) {

           
            var appendData = {};
            

            var itr = loop.iteration();

             console.log("validation Starts for : "+ cellsToSelect[itr]);


            if (target === "getCssProperty") {

                self.api
                    .selectCell(cellsToSelect[itr])
                    .getCssProperty(elementSelector, property, function(result) {
                        console.log("CSS property Value:" + result.value);
                        console.log("CSS property Expected:" + expected);

                        self.api.verify.equal(expected, result.value);

                        loop.next();

                    })

            }
            if (target === "getValue") {

                self.api
                    .selectCell(cellsToSelect[itr])
                    .pause(500)
                    .getText(elementSelector1, function(result) {
                        console.log("CSS property Value:" + result.value);
                        console.log("CSS property Expected:" + expected);

                        self.api.verify.equal(expected, result.value);

                        loop.next();

                    })

            }
            
            if (target === "getAttribute") {


                if (expected.includes('vertical-align')) {
                    elementSelector = "div.k-spreadsheet-cell.k-spreadsheet-active-cell > div";
                } else
                    elementSelector = "div.k-spreadsheet-cell.k-spreadsheet-active-cell";


                var regex = /\-[a-z]{0,1}/g;

                // console.log(elementSelector + " " + property + " " + expected);

                self.api.selectCell(cellsToSelect[itr])
                        .getAttribute(elementSelector, property, function(result) {

                        console.log("attribute Value:" + result.value);
                        console.log("attribute Expected:" + expected);

                        var resToCheck = result.value;

                        var defaultMessage = "Expected" + expected.trim() + " but got :-" + resToCheck;


                        self.api.verify.equal(resToCheck.includes(expected.trim()), true);

                        // })
                        // .perform(function(){

                        if (precheckEvaluation === false) {

                            console.log("precheck has not been initialized");
                            loop.next();

                        }

                        else
                        {       
                            var objectTODuplicate = {};
                            

                            if(flag === true)
                            {

                            if ((fs.existsSync('./temp/precheck.json'))) {
                                flag = false;

                                if (!(fs.existsSync('./temp/precheckDuplicate.json'))) {


                                var preCellState = fs.readFileSync('./temp/precheck.json');
                                cellData = JSON.parse(preCellState);

                                existingCellData = cellData;

                                console.log("Creating Duplicate Precheck")
                                fs.writeFileSync('./temp/precheckDuplicate.json', JSON.stringify(cellData , null, 4), 'utf-8')

                            }

                            else{

                                var preCellState = fs.readFileSync('./temp/precheckDuplicate.json');
                                cellData = JSON.parse(preCellState);

                                existingCellData = cellData;

                                }
                            }

                            }

                        }

                    })
                    .perform(function() {
                         

                        if (precheckEvaluation === true) {

                            if(Object.keys(existingCellData).length != 0)
                            {

                          //  if (fs.existsSync('./temp/precheckDuplicate.json')) {


                               //update the object if precheck duplicate json already exists
                                // duplicateCellDataExists = fs.readFileSync('./temp/precheckDuplicate.json');
                                // existingCellData = JSON.parse(duplicateCellDataExists);

                                cellStateToBeUpdated = existingCellData[cellsToSelect[itr]];

                               
                              //  console.log("Cell To be updated : " + JSON.stringify(cellStateToBeUpdated));

                                objectToBeUpdated = iterationCopy(cellStateToBeUpdated); 
                               // console.log("objectToBeUpdated" + JSON.stringify(objectToBeUpdated))                   

                                
                                //check if the property already exists in the precheck duplicate json
                                if (objectToBeUpdated.hasOwnProperty(property)) {

                                      objectToBeUpdated[property] = expected;
                                   }


                                //if property is style then update the object
                                else if (property === "style") {

                                    newProperty = expected.split(":");

                                    newProperty[0] = newProperty[0].replace(regex, function(match) {
                                        return match.toUpperCase().replace("-", "");
                                    })

                                    objectToBeUpdated[newProperty[0]] = newProperty[1].trim();

                                }

                                //if none of the above(a new property needs to be appended)
                                else

                                { 
                                    objectToBeUpdated[property] = expected.trim();
                                }
                                   
                                existingCellData[cellsToSelect[itr]] = objectToBeUpdated;

                                 console.log("Appending Data in Precheck Duplicate ")
                                 //+ JSON.stringify(existingCellData));
                                 loop.next();

                              //  fs.writeFileSync('./temp/precheckDuplicate.json', JSON.stringify(appendData, null, 4), 'utf-8');   

                                }

                            // }
                        } 

                        else {

                             console.log("Skipping Precheck Duplicate Creation");
                             loop.next();
                        }

                    })
                    // .perform(function(){
                       
                        
                    //         loop.next();


                    //     // else
                    //     //     
                    // })
                    // .perform(function() {
                    //     if (precheckEvaluation === true) {
                    //         if ((fs.existsSync('./temp/precheckDuplicate.json'))) {

                    //             self.api.postCheck(cellsToSelect[itr], function() {
                    //                 console.log("POST JSON populated")
                    //                 loop.next();
                    //             })


                    //         }
                    //     } else {
                    //         console.log("POST JSON Skipping");
                    //         loop.next();
                    //     }


                    // });


            }

        },
        function() {

             if (precheckEvaluation === true) {
                           fs.writeFileSync('./temp/precheckDuplicate.json', JSON.stringify(existingCellData, null, 4), 'utf-8')
                           //,function(){
                            console.log("Writing..")     ;
                }          
           
            if (typeof(callback) === "function") {

                callback.call(self.client.api);
            }

            console.log("End of validations");

            self.emit('complete');
            return this;

        });


};

module.exports = Validate;