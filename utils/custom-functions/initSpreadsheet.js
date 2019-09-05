exports.command = function(data, Suitekey, client, done) {
    
    var inputJson = '#useCase > option:nth-child(';
    
    if (!argv.app) {
        argv.app = "spreadsheet"
    }
    
    client
        .maximizeWindow()
        .url(configData[argv.app][argv.testEnv].url, function() {
            jsonData = String(data[Suitekey].Json).match(/\d+/);
            client
                .waitForElementVisible('#leoHost', 500000)
                .waitForElementVisible(inputJson + jsonData[0] + ')', 50000)
                .click(inputJson + jsonData[0] + ')')
                .waitForElementVisible('#leoHost', 500000)
                .click('.togglePaneButton', function() {
                    done();
                })
        })
};