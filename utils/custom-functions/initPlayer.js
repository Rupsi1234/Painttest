exports.command = function (data, Suitekey, client, done) {
    jsonData = String(data[Suitekey].Json).match(/\d+/);
    if (!argv.app) {
        argv.app = "defaultPlayer"
    }
    var playerURL;
    if (jsonData[0] == '1') {
        playerURL = configData[argv.app][argv.testEnv].playerJSON1_URL
    } else if (jsonData[0] == '2') {
        playerURL = configData[argv.app][argv.testEnv].playerJSON2_URL
    } else {
        playerURL = configData[argv.app][argv.testEnv].playerJSON3_URL
    }
    client
        .maximizeWindow()
        .url(playerURL)
        .waitForElementPresent('div.leo-canvasarea', 15000, function() {
            done();
        })
}