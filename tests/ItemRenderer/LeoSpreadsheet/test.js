const fs = require('fs');
var rimraf = require('rimraf');

if (typeof argv.datafiles == 'string') {
    argv.datafiles = [argv.datafiles]    
} else if (typeof argv.datafiles == 'undefined') {
    console.log("No Data file is mentioned. Running default data file i.e. Demo.json")
    argv.datafiles = ['demo.json']
}

var j = 0;
var i;
var r = /\d+/;

var syncLoop = require(currentDirPath + '/utils/modules/syncLoop.js')

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
                client.selectElement(String(result.Target), function() {
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


function extendedValidation(extendedValidationCells, client) {

    cellsToValidate = extendedValidationCells.toString().split(",");

    return new Promise(function(resolve, reject) {

        if (cellsToValidate[0] != "") {
            console.log("Initializing Precheck")
            client.preCheck(cellsToValidate, function() {
                resolve(true);
            })

        } else {
            client.perform(function(){
                resolve(false);
            })   
        }
    })
}


function testcaseExecution(cellsToValidate, actionIterator, AA, TC_SkipValidationProperty, client) {

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

describe("LEONARDO SPREADSHEET", function(client) {

    argv.datafiles.forEach(function(temp) {
        var rawdata = fs.readFileSync('./testdata/' + temp);
        data = JSON.parse(rawdata);
        Object.keys(data).forEach(function(Suitekey) {

            describe(data[Suitekey].Name, function(client) {
                this.timeout(99999999);

                before(function(client, done) {
                    if (argv.app == "spreadsheet" || argv.app == undefined) {
                        client.initSpreadsheet(data, Suitekey, client, done)
                    } else if (argv.app == "defaultPlayer" || argv.app == "player") {
                        argv.app = "defaultPlayer";
                        client.initPlayer(data, Suitekey, client, done)
                    }
                })

                var testcase = data[Suitekey];
                const testCasesNum = Object.keys(data[Suitekey]).length;

                Object.keys(testcase).forEach(function(testCaseKey) {

                    //to skip name and Json keys
                    if (testCaseKey.includes("TC")) {
                        var TCID = testCaseKey;
                        var TC_NAME = data[Suitekey][testCaseKey].TestCase;
                        var TC_Tags = data[Suitekey][testCaseKey].Tags;
                        const TC_RequirePreCheck = data[Suitekey][testCaseKey].ExtendedValidation;
                        const TC_SkipValidationProperty = data[Suitekey][testCaseKey].SkipExtendedValProp;
                        const actionsToPerform = data[Suitekey][testCaseKey].Actions;

                        

                        it(TCID + '-' + TC_NAME + ' -- Tags: ' + TC_Tags, function(client) {

                            const actionIterator = actionsToPerform.length;

                            console.log("Total Number of Actions to be performed:" + actionIterator);

                            const AA = actionsToPerform;

                            testcaseExecution(TC_RequirePreCheck,actionIterator,AA,TC_SkipValidationProperty,client);

                        })
                    }

                })

                after(function(client, done) {
                    client.end(function() {
                        console.log("End of Suite")
                        done();
                    });
                });

            });

        })
    })
});