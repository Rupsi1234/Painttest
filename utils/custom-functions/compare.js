var util = require('util');
var events = require('events');
var fs = require('fs');
const assert = require('assert');

var diff = require('deep-diff');

//var rimraf = require('rimraf');

var syncLoop = require('../../utils/modules/syncLoop.js')


function Compare() {
    events.EventEmitter.call(this);
}


util.inherits(Compare, events.EventEmitter);


Compare.prototype.command = function(ignoredProperties, callback) {

    var self = this;

    console.log("Comparing....")
    // self.api.verify.equal(1, 0);
        
    var skipProperties = ignoredProperties.split(",");

    var preCheckDup = fs.readFileSync('./temp/precheckDuplicate.json');
    preData = JSON.parse(preCheckDup);

    var postCheck = fs.readFileSync('./temp/postcheck.json');
    postData = JSON.parse(postCheck);

    if (skipProperties.length > 0) {

        differences = diff(preData, postData, function(path, key) {

            return skipProperties.indexOf(key) >= 0;
        });

    } else

        differences = diff(preData, postData);


    new Promise(function(resolve, reject) {

        if (typeof(differences) === "undefined") {

            self.api.perform(function(){

                resolve("Pre and Post Status is same");
            })

            

        } else {

        self.api.perform(function(){    

            diffJson = JSON.stringify(differences);

            jsonObj = JSON.parse(diffJson);

            console.log(diffJson);

            resolve(jsonObj);
        })

        }

    }).then(function(result) {

        if (!(result.includes("Pre and Post Status is same"))) {

            console.log("Precheck does not match with the postcheck")
            console.log(Object.keys(result).length);
            self.api.verify.equal(Object.keys(result).length, 0)


        } else {

            console.log(result);
            
        }


    }).then(function() {

       // rimraf('./temp/*', function() { console.log("Deleting Files after comparison"); })  

        if (typeof(callback) === "function") {
            callback.call(self.client.api);
        }

        self.emit('complete');
        return this;
     })


};

module.exports = Compare;