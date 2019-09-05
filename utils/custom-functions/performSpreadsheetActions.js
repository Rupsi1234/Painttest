    const fs = require('fs');
    var rimraf = require('rimraf');
    const argv = require('yargs').argv
    var configData = JSON.parse(fs.readFileSync('./testdata/config.json'));

    if (typeof argv.datafiles == 'string') {
        argv.datafiles = [argv.datafiles]    
    } else if (typeof argv.datafiles == 'undefined') {
        // console.log("No Data file is mentioned. Running default data file i.e. Demo.json")
        argv.datafiles = ['demo.json']
    }

    var j = 0;
    var i;
    var r = /\d+/;

    // var syncLoop = require('../modules/syncLoop.js')

    


    


    

// function initSpreadsheet(data, Suitekey, client, done) {
//     var inputJson = '#useCase > option:nth-child(';
//     client
//         .maximizeWindow()
//         .url(configData.staging.spreadsheetURL, function() {
//             jsonData = String(data[Suitekey].Json).match(r);
//             client
//                 .waitForElementVisible('#leoHost', 500000)
//                 .waitForElementVisible(inputJson + jsonData[0] + ')', 50000)
//                 .click(inputJson + jsonData[0] + ')')
//                 .waitForElementVisible('#leoHost', 500000)
//                 .click('.togglePaneButton', function() {
//                     done();
//                 })
//         })
// }


    // function initPlayer(data, Suitekey, client) {
    //     jsonData = String(data[Suitekey].Json).match(r);
    //     var playerURL;
    //     if (jsonData[0] == '1') {
    //         playerURL = configData.staging.playerJSON1_URL
    //     } else if (jsonData[0] == '2') {
    //         playerURL = configData.staging.playerJSON2_URL
    //     } else {
    //         playerURL = configData.staging.playerJSON3_URL
    //     }
    //     client
    //         .maximizeWindow()
    //         .url(playerURL)
    //         .waitForElementPresent('div.leo-canvasarea', 15000)
    // }

exports.command = function(client, done) {
    argv.datafiles.forEach(function(temp) {
        var rawdata = fs.readFileSync('./testdata/' + temp);
        data = JSON.parse(rawdata);
        Object.keys(data).forEach(function(Suitekey) {
            var SuiteName = data[Suitekey].Name;
            console.log(argv.testEnv)
            if (argv.testEnv == "spreadsheet" || argv.testEnv == undefined) {
                client.initSpreadsheet(data, Suitekey, client)
            } else if (argv.testEnv == "player") {
                initPlayer(data, Suitekey, client)
            }

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
                    const actionIterator = actionsToPerform.length;

                    console.log("Total Number of Actions to be performed:" + actionIterator);

                    const AA = actionsToPerform;

                    client.testcaseExecution(TC_RequirePreCheck,actionIterator,AA,TC_SkipValidationProperty,client);

                }
            })

        })
    })
}