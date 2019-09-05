module.exports = {

  elements : {

     setPath: 
     {
      selector: 'input[type="file"]'
     },
     previewClose:
     {
      selector: 'div[aria-hidden=\'false\'] i[title=\'Close\']'
     },
     submissionStatus1 :
     {
     selector: 'upload-document[filepicker=\'filepicker1\'] .file-upload-timestamp',
     },
      submissionStatus2 :
     {
     selector: 'upload-document[filepicker=\'filepicker2\'] .file-upload-timestamp',
     },
     activeCellData:
     {
      selector: '.k-selection-wrapper .k-spreadsheet-active-cell>div'
     },
     previewWindowHeader:
     {
      selector: '.modal--90 div[aria-hidden=\'false\'] .modal-header'
     },
     documentuploadStatus:
     {
      selector: '.d-flex.dz-message-el[style=\'visibility: hidden;\']'
     },
     mapperDBOkButton:
     {
      selector: '//button[text()="Ok" or text()="OK"]',
      locateStrategy: 'xpath'
     }
  
},

commands : [{

 uploadDocument: function (start,final) {

      path = require('path')
      var test=this
      if (this.api.globals.configFile != undefined) {
        var startPath = this.api.globals.configFile.testDataBaseFolder + start
        var finalPath = this.api.globals.configFile.testDataBaseFolder + final

      } else {
        // var reqPath = path.join(__dirname, '../')
        // var startPath = reqPath +'testdata\\'+ start
        // var finalPath = reqPath +'testdata\\'+ final
        var startPath = currentDirPath +'\\testdata\\'+ start
        var finalPath = currentDirPath +'\\testdata\\'+ final
      }
      logger.info("Upload the Document in Item")
      try {
          this
              .setValue('@setPath', require('path').resolve(String(startPath)))
              .waitForElementNotPresent('@documentuploadStatus',50000, function() {
                logger.info("Document is uploaded in Item")
                test.api
                  .pause(10000)
                  .element('xpath', '//button[text()="Ok" or text()="OK"]', function(result){
                  if(result.status != -1) {
                    test
                      .api.useXpath()
                      .waitForElementPresent('//button[text()="Ok" or text()="OK"]', 5000)
                      .click('//button[text()="Ok" or text()="OK"]')
                      .useCss()
                      .waitForElementNotPresent('div[style="display: block;"]', 5000)
                  }
                })   

              })
            } 
      catch (err) 
          {
           logger.error(err.stack)
          }
          if(final)
          {
              test
              .setValue('@setPath', require('path').resolve(String(finalPath)))
              .waitForElementNotPresent('@documentuploadStatus',50000, function() {
                logger.info("Document is uploaded in Item")
                test.api
                  .pause(500)
                  .element('xpath', '//button[text()="Ok" or text()="OK"]', function(result){
                  if(result.status != -1){
                    test
                      .api.useXpath()
                      .waitForElementPresent('//button[text()="Ok" or text()="OK"]', 5000)
                      .click('//button[text()="Ok" or text()="OK"]')
                      .useCss()
                      .waitForElementNotPresent('div[style="display: block;"]', 5000)
                  }
                })

              })
               
          }

      return this
  
  },
  openPreviewdocument(documentoption)
     {
      var previewDocument='upload-document[filepicker=\'filepicker'+documentoption+'\'] .fa.fa-file-text'
           try {
              logger.info("Open the Document Preview")
                this
                    .click(previewDocument)
                    .waitForElementVisible('.k-spreadsheet-active-cell',50000)
                   logger.info("Document Preview is opened")
                   } 
           catch (err) 
                {
                 logger.error(err.stack)
                }
            
     return this
      },

    closePreviewdocument()
    {
      
          logger.info("Close the Preview")
      try {
          this
             .click('@previewClose')
             .waitForElementNotPresent('@previewClose',10000)
             logger.info("Preview is closed")
          } 
      catch (err) 
          {
           logger.error(err.stack)
          }
      return this
  
    },
    deleteDocument(documentoption)
    {
       var deleteDocument='upload-document[filepicker=\'filepicker'+documentoption+'\'] .fa.fa-trash'
           try {
              logger.info("Delete the Document")
                this
                    .click(deleteDocument)
                    .waitForElementVisible()
                    .click(createItem.elements.proceedButton.selector)
                    .waitForElementVisible('.k-spreadsheet-active-cell',50000)
                   logger.info("Document is Deleted")
                   } 
           catch (err) 
                {
                 logger.error(err.stack)
                }
            
     return this
      }

    
  
}]
};