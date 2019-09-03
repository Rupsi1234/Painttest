var fs = require('fs');
var configFile = JSON.parse(fs.readFileSync('./testdata/editItemConfig.json'));
inputData = JSON.parse(fs.readFileSync(configFile["inputJson"]));

describe ('Bulk Item Update and Publish', function(client) {
  this.timeout(9000000);
        
  before (function(client, done) {
    loginPage = client.page.loginPage();
    setupPage = client.page.setupPage();
    documentUpload =client.page.documentUpload();
    preferencePage=client.page.preferencePage();
    previewPublishPage = client.page.previewPublishPage();
    headerFooterPage=client.page.headerFooterPage();
    
    client.globals.configFile = configFile;
          
    client
      .maximizeWindow()
      .url(configFile["url"], function() {
        logger.info("Login Page is displayed")
        loginPage
          .loginWithDetails(configFile["org"], configFile["username"], configFile["password"])
      })
      .waitUntilLoaderPresent(function() {
        done();
      })
  })
            
  Object.keys(inputData).forEach(function(testcaseID) {
    it ('Edit Item Test Case - ' + testcaseID + ' Updating item ID = ' + inputData[testcaseID].itemId, function(client) {
      if (inputData[testcaseID].itemType.toLowerCase() == "presentation") {
        presentation(inputData[testcaseID], client)
      }
      else if (inputData[testcaseID].itemType.toLowerCase() == "question") {
        question(inputData[testcaseID], client)
      }
    })
  });

  after (function(client, done) {
      client.end(function() {
          done();
      });
    });
})
    
 
function presentation(itemDetails, client) {
  var presentationUrl = configFile["url"] + "/#/presentation/item/" + itemDetails.itemId + "/document"
  client
    .url(presentationUrl)
    .waitUntilLoaderPresent(function() {
      headerFooterPage
        .unlockItem();
      documentUpload
        .verify.containsText(properties.get("activeTabText"), "Document", "Documents Tab is not active") 
        .uploadDocument(itemDetails.StartDoc)
        .verify.containsText(documentUpload.elements.submissionStatus1.selector, String("Uploaded on").trim())
        .click('a.step[href*="/publish"]')
    })
  	.waitUntilLoaderPresent(function() {
      previewPublishPage
        .verify.containsText(properties.get("activeTabText"), "Publish", "Documents Tab is not active") 
        .validatePublishCheckpoints()
        .rePublishItem("override")
    })
    .click(properties.get("finishButton"))
    .waitUntilLoaderPresent(function() {
      console.log("Presentation completed")
    })
}

function question(itemDetails, client) {
  var questionUrl = configFile["url"] + "/#/question/item/" + itemDetails.itemId + "/document"
  client
    .url(questionUrl)
    .waitUntilLoaderPresent(function() {
      headerFooterPage
        .unlockItem();
      documentUpload
        .verify.containsText(properties.get("activeTabText"), "Document", "Documents Tab is not active") 
        .uploadDocument(itemDetails.StartDoc, itemDetails.FinalDoc)
        .verify.containsText(documentUpload.elements.submissionStatus1.selector, String("Uploaded on").trim())
        .click(properties.get("nextButton"))
    })
    .waitUntilLoaderPresent(function() {
      documentUpload
        .waitForElementNotPresent('a.step-5.disabled-step', 10000)
        .click('a.step[href*="/publish"]');
    })

    .waitUntilLoaderPresent(function() {
      previewPublishPage
        .verify.containsText(properties.get("activeTabText"), "Preview & Publish", "Preview & Publish Tab is not active") 
        .validatePublishCheckpoints()
        .rePublishItem("override")
        .verify.containsText("span.title-tag:nth-child(3) span:last-child", "Published", "Item failed to publish")
        .verify.containsText("span.title-tag:nth-child(4) span:first-child", "Published ID", "Item failed to publish")
    })   
    .click(properties.get("finishButton"))
    .waitUntilLoaderPresent(function() {
      console.log("Question completed")
    })
}
  
