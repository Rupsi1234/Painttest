var rimraf = require('rimraf');
var syncLoop = require('../modules/syncLoop.js')

function performAction(result, precheckEvaluation, client) {

    try {
        if (result.Event.includes("selectCell")) {

            return new Promise(function(resolve, reject) {
                client.selectCell(result.Target, function() {
                    resolve("selectCell : " + result.Target)
                })

            })
        }

        if (result.Event.includes("selectElement")) {
            return new Promise(function(resolve, reject) {
                client.selectElement("home." + String(result.Target), function() {
                    resolve("selectElement : " + result.Target)
                })

            })
        };


       if (result.Event.includes("selectRange")) {
            return new Promise(function(resolve, reject) {
                client.selectRange(String(result.Target), function() {
                    resolve("selectRange : " + result.Target)
                })
            })
        };

        if (result.Event.includes("enterText")) {
            return new Promise(function(resolve, reject) {
                client.enterText(String(result.Target), function() {
                    resolve("enterText : " + result.Target)
                })
            })
        };

        if (result.Event.includes("keyPress")) {
            return new Promise(function(resolve, reject) {
                client.keyPress(String(result.Target), function() {
                    resolve("keyPress : " + result.Target)
                })
            })
        };


        if (result.Event.includes("validateCell")) {
            return new Promise(function(resolve, reject) {
                client.validateCell(result.ActiveCell, result.Target, result.Property, result.Expected, precheckEvaluation, function() {
                    resolve("resolving validation")
                })
            })
        }

    } catch (err) {

        console.log(err);
        client.end();

    }

};

exports.command = function (cellsToValidate, actionIterator, AA, TC_SkipValidationProperty, client) {

    rimraf('./temp/*', function() { console.log("Deleting Files Before a Test"); })

    self = client;  

  // var precheckEvaluation = await extendedValidation(cellsToValidate, self);

    //precheckEvaluation = false;
    var precheckEvaluation;
    

    cellsToValidateArray = cellsToValidate.toString().split(",");

    client.perform(function() {

     if (cellsToValidateArray[0] != "") {
            console.log("Initializing Precheck")

        client.preCheck(cellsToValidateArray, function() {
                precheckEvaluation = true;
            })

        } else {

         client.perform(function(){
            precheckEvaluation = false;
         })   
            
    }

    })
    .perform(function(callback){

        syncLoop.loopExecution(actionIterator, function(loop) {
            var itr = loop.iteration();
            console.log("performing action")
            performAction(AA[itr], precheckEvaluation, client).then((str) => {
                console.log(str)
                loop.next();
               
            })

        }, function() {

         if (precheckEvaluation === true) {

                console.log("Precheck Set to :" + precheckEvaluation);
                // client.postCheck(cellsToValidateArray);

                client.postCheck(cellsToValidateArray,function(){

                     client.compare(TC_SkipValidationProperty, function() {
                        callback(console.log("End"))
                   
                    })

                    })
                     
            } else {

                rimraf('./temp/*', function() { console.log("Deleting Files when no comparison"); })
                console.log("Precheck Set to :" + precheckEvaluation)
                console.log("End of Testcase");
                callback(console.log("End"))
            
            }

        })
    })
}