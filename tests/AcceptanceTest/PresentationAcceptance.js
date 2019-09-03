 var getID = require('./../../utils/modules/getID');
  var embedID = require('./../../utils/modules/embedUrl');
describe('Presentation Item Acceptance Test', function(client) {
    this.timeout(9000000);
     
      var testfile_name = this.file;
      var suite_name = this.title;
      var testcase_name;
      var n = testfile_name.lastIndexOf('\\');
      var result = testfile_name.substring(n + 1);
      var ItemId;
      var em;
      var client1
      var item="presentation"
      before(function(client, done) {

       logger.info("Executing File: " + result + ".js")
        logger.info("Starting following suite : " + suite_name)
          loginPage = client.page.loginPage();
          createItem =client.page.createItem();
          setupPage = client.page.setupPage();
          documentUpload =client.page.documentUpload();
          preferencePage=client.page.preferencePage();
          previewPublishPage = client.page.previewPublishPage();
          headerFooterPage=client.page.headerFooterPage();
          dashBoardPage=client.page.dashBoardPage();

    logger.info("Launching Browser : " + client.options.desiredCapabilities.browserName)
    logger.info("Launching the Leonardo Paint URL : " + data.url)

     client
            .maximizeWindow()
            .url(data.url, function() {
             logger.info("Login Page is uploaded")
             loginPage
                    .loginWithDetails(data.org,data.username, data.password)
                    .verify.elementPresent(headerFooterPage.elements.title.selector, "Login is not successful")

            })
            
            .waitUntilLoaderPresent(function() {

                done();
          })
    }),
      beforeEach(function (client, done) {
        testcase_name = this.currentTest.title;
        testcase_name=testcase_name.substring(testcase_name.lastIndexOf("\\")+1)

        
        logger.info("Executing following Test Case: " + testcase_name.substring(testcase_name.lastIndexOf('\\')+1))
        done();
    });
    
   it('TC01: Validate "Create Presentation Item" workflow for a single sheet workbook', function(client) {
    logger.info("Launching the Leonardo Paint")
    var Title="leonardo-Single Sheet-Presentation-Test"
   
    client
     .waitUntilLoaderPresent(function() {
                      createItem
                      .openCreate()
                      .verify.containsText(createItem.elements.createPageHeader.selector, 'Create a New Leonardo Item', 'Unable to open Create page')
                      .verify.cssClassPresent(createItem.elements.presetationItem.selector,'active', 'Presentation Item is Active')
                      .createItem(Title ,item)
           
           })
         .waitUntilLoaderPresent(function() {

            setupPage
                      .verify.containsText(properties.get("activeTabText"), "Setup", "SetUp Tab is not active") 
                      .verify.value('#title',Title,'SetUp Page Title is not Correct')
                      .enterSetupDetails("Description","Other Tag")
                      .click(properties.get("nextButton"))
                  
            })
        
        .waitUntilLoaderPresent(function(){
            documentUpload
                        .verify.containsText(properties.get("activeTabText"), "Document", "Documents Tab is not active") 
                        .uploadDocument('Motion_Profile.xlsx')
                        .verify.containsText(documentUpload.elements.submissionStatus1.selector, String("Uploaded on").trim())
                        .openPreviewdocument('1')
                        .verify.containsText(documentUpload.elements.previewWindowHeader.selector,'Presentation Document')
                        .verify.containsText(documentUpload.elements.activeCellData.selector,'Segment Type')
                        .closePreviewdocument()
                        .click(properties.get("nextButton"))
        })
        
        
        .waitUntilLoaderPresent(function(){
            preferencePage
                        .verify.containsText(properties.get("activeTabText"), "Preference", "Documents Tab is not active") 
                        .selectSheet("Building Profile1")
                        .verify.containsText(preferencePage.elements.activeSheet.selector, "Building Profile", "Sheet is not selected coprrectly")
                        .cellRange("A5","b5")
                        
                        .enableToggelButton("Formula Bar")
                        .verify.attributeContains(preferencePage.elements.formulaBar.selector,'style','','Formula Bar is not displayed')
                        .click(properties.get("nextButton"))
        })
      
        
        .waitUntilLoaderPresent(function() {
            client1=client
            previewPublishPage
                        .verify.containsText(properties.get("activeTabText"), "Publish", "Documents Tab is not active") 
                        .validatePublishCheckpoints()
                        .openPreview()
                        .closePreview()
                        .publishItem()
                        getID.getLeonardoID(client1)
                                            .then(function(value) {
                                            logger.info("Item ID:"+value);
                                            ItemId=value
                                     })
                      }) 

         .click(properties.get("finishButton"))

         .waitUntilLoaderPresent(function() {
            dashBoardPage
                         .openItemPreview(ItemId)
                         .verify.cssClassPresent(dashBoardPage.elements.previewActiveCell.selector, 'k-state-disabled', 'Item is Editable')
                         .verify.containsText(dashBoardPage.elements.previewActiveCellData.selector, 'Cruise', 'Text is not visible');
              previewPublishPage
                          .closePreview()

           }) 
         // .waitUntilLoaderPresent(function() {
         // })
       /*   .waitUntilLoaderPresent(function() {
              dashBoardPage
                        .openEmbed(ItemId)
                        .verify.containsText( '.modal-embed .modal-header>span' ,"Embed Leonardo Item - "+Title, "Header is not Correct" )
                         embedID.getEmbedUrl(client1)
                                .then(function(value) {
                                            logger.info("embedurl:"+value);
                                     })
                      
                })
          .waitUntilLoaderPresent(function() {
              documentUpload
                          .closePreviewdocument()
         
         })*/
        
      }),

 
it('TC02: Validate "Create Presentation Item" workflow for a workbook having two Sheets', function(client) {
    
        
    logger.info("Launching the Leonardo Paint")
    var Title="leonardo-Mulitple Sheet-Presentation-Test"
    client

          .url(data.url)
          .waitUntilLoaderPresent(function() {
            createItem
                      .openCreate()
                      .verify.containsText(createItem.elements.createPageHeader.selector, 'Create a New Leonardo Item', 'Unable to open Create page')
                      .verify.cssClassPresent(createItem.elements.presetationItem.selector,'active', 'Presentation Item is Active')
                      .createItem(Title ,"presentation")
           
           })
         .waitUntilLoaderPresent(function() {

            setupPage
                      .verify.containsText(properties.get("activeTabText"), "Setup", "SetUp Tab is not active") 
                      .verify.value('#title',Title,'SetUp Page Title is not Correct')
                      .enterSetupDetails("Description","Other Tag")
                      .click(properties.get("nextButton"))
                  
            })
      
         .waitUntilLoaderPresent(function(){
            documentUpload
                        .verify.containsText(properties.get("activeTabText"), "Document", "Documents Tab is not active") 
                        .uploadDocument('MultiSheet_Final.xlsx')
                        .verify.containsText(documentUpload.elements.submissionStatus1.selector, String("Uploaded on").trim())
                        .openPreviewdocument('1')
                        .verify.containsText(documentUpload.elements.previewWindowHeader.selector,'Presentation Document')
                        .verify.containsText(documentUpload.elements.activeCellData.selector,'100')
                        .closePreviewdocument()
                        .click(properties.get("nextButton"))
        })
         .waitUntilLoaderPresent(function(){
            preferencePage
                        .verify.containsText(properties.get("activeTabText"), "Preference", "Documents Tab is not active") 
                        .selectSheet("All Sheets")
                        .verify.containsText(preferencePage.elements.activeSheet.selector, "All Sheets", "Sheet is not selected coprrectly")
                        .enableToggelButton("All")
                        .verify.cssClassPresent(preferencePage.elements.ribbon.selector,'leonardoRibbon','Ribbon is not present')
                        .verify.attributeContains(preferencePage.elements.formulaBar.selector,'style','','Formula Bar is not displayed')
                        .verify.attributeContains(preferencePage.elements.sheetBar.selector,'style','','Sheet Bar is not displayed')
                        .verify.attributeContains(preferencePage.elements.rowHeader.selector,'style','width: 32px;','Row header is not displayed')
                        .verify.attributeContains(preferencePage.elements.columnHeader.selector,'style','height: 20px;','Row header is not displayed')

                       .click(properties.get("nextButton"))
        })
      
       
       .waitUntilLoaderPresent(function() {
            previewPublishPage
                        .verify.containsText(properties.get("activeTabText"), "Publish", "Documents Tab is not active") 
                        .validatePublishCheckpoints()
                        .openPreview()
                        .closePreview()
                        .publishItem()
                        getID.getLeonardoID(client1)
                                            .then(function(value) {
                                            logger.info("Item ID:"+value);
                                            ItemId=value
                                          })
                      
        }) 
    
       .click(properties.get("finishButton"))

         .waitUntilLoaderPresent(function() {
            dashBoardPage
                         .openItemPreview(ItemId)
                         .verify.cssClassPresent(dashBoardPage.elements.previewActiveCell.selector, 'k-state-disabled', 'Item is Editable')
                         .verify.containsText(dashBoardPage.elements.previewActiveCellData.selector, '100', 'Text is not visible');
              previewPublishPage
                          .closePreview()

           }) 
         // .waitUntilLoaderPresent(function() {
         // })
        /*  .waitUntilLoaderPresent(function() {
              dashBoardPage
                        .openEmbed(ItemId)
                        .verify.containsText( '.modal-embed .modal-header>span' ,"Embed Leonardo Item - "+Title, "Header is not Correct" )
                         embedID.getEmbedUrl(client1)
                                .then(function(value) {
                                            logger.info("embedurl:"+value);
                                     })
                      
                })
         .waitUntilLoaderPresent(function() {
              documentUpload
                          .closePreviewdocument()
         
         })*/
                headerFooterPage.logOut();
        
  
      })
 
 afterEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Completed following Test Case: " + testcase_name)
        done();
    });
     after(function(client, done) {
        client.end(function() {
            done();
       })
 
    })
});


       

 