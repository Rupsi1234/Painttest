
/*
function parseArgumentsAndGetEnv(env) {
    console.log(env[5])
    return env[5];
}

*/

var PropertiesReader = require('properties-reader');
global.properties = PropertiesReader("./utils/props.properties");

require('./log.js');
var json = require('json-file');
 var fs = require('fs');
module.exports = {
    
abortOnAssertionFailure : false,

    before: function(done) {
    	
    	
    	var date = String(new Date().getDate());
        var n = date.length;
        if (n == 1) {
            date = "0" + date;
        }

        var month = String(new Date().getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
    	
    	 dirName = __dirname;
        
        var rawdata = fs.readFileSync('./testdata/data.json');
        data = JSON.parse(rawdata);
        process.env.MOCHAWESOME_REPORTDIR = "output/reports/" + date + "-" + month + "-" + new Date().getFullYear() + "/LeonardoPaint_Reports/";
        process.env.MOCHAWESOME_REPORTFILENAME = "Leonardo Paint Test Result";
        
        
        done();
    }
};

