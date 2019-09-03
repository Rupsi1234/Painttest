var getID = require('./../../utils/modules/getID');
var embedID = require('./../../utils/modules/embedUrl');

describe ('Question Item Acceptance Test', function(client) {

	this.timeout(90000000);
	var testfile_name = this.file;
	var suite_name = this.title;
    var testcase_name;
    var ItemId;

	before(function(client, done) {

		logger.info("Executing File: " + testfile_name + ".js")
		logger.info("Starting following suite: " + suite_name)
		
		loginPage = client.page.loginPage();
		createItem = client.page.createItem();
		setupPage = client.page.setupPage();
		templatePage = client.page.templatePage();
		instructionsPage = client.page.instructionsPage();
		documentUploadPage = client.page.documentUpload();
		scoringRulesPage = client.page.scoringRulesPage();
		previewPublishPage = client.page.previewPublishPage();
     	headerFooterPage = client.page.headerFooterPage();
     	dashBoardPage=client.page.dashBoardPage();
		
		logger.info("Launching Browser: " + client.options.desiredCapabilities.browserName)
		logger.info("Launching the Leonardo Paint URL: " + data.url)

    	client
    		.maximizeWindow()
            .url(data.url, function() {
             loginPage
                    .loginWithDetails(data.org, data.username, data.password)
                    .verify.elementPresent(headerFooterPage.elements.title.selector, "Login is not successful")
            })
            .waitUntilLoaderPresent(function() {
                done();
          })
	});

	beforeEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Executing following Test Case: " + testcase_name)
        done();
    });

	it('Question Workflow Validation using workbook having multiple sheets', function(client) {
		var title = "Question-Item - With Multiple Sheets"
		client
			.waitUntilLoaderPresent(function() {
				createItem
					.openCreate()
					.verify.containsText(createItem.elements.createPageHeader.selector, 'Create a New Leonardo Item', 'Unable to open Create page')
                    .verify.cssClassPresent(createItem.elements.presetationItem.selector, 'active', 'Presentation Item is Not Active')  
					.createItem(title, "question");
			})
			.waitUntilLoaderPresent(function() {
				setupPage
					.verify.containsText(properties.get("activeTabText"), "Setup", "SetUp Tab is not active") 
                    .verify.value('#title', title, 'SetUp Page Title is not Correct')
					.enterSetupDetails("This is the description", "Other Tags")
					.click(properties.get("nextButton"))
			})
			
			.waitUntilLoaderPresent(function() {
				templatePage
					.verify.containsText(properties.get("activeTabText"), "Template", "Template Tab is not active") 
					.verify.cssClassPresent(templatePage.getSelectorForTemplate(1), "template-selected", "Default Template is not selected")
					.verify.cssClassPresent(templatePage.getSelectorForLayout(1), "layout-selected", "Default Layout is not selected")
					.chooseTemplate(1)
					.chooseLayout(2)
					.click(properties.get("nextButton"));

			})
			.waitUntilLoaderPresent(function() {
				instructionsPage
					.verify.containsText(properties.get("activeTabText"), "Instructions", "Instructions Tab is not active") 
					.clickRow(1)
					.enterInstructionText("Instruction 1 Text")
					.clickRow(2)
					.enterInstructionText("Instruction 2 Text")
					.clickRow(3)
					.enterInstructionText("Instruction 3 Text")
					.selectTextForRow(2)
					.selectFormattingToolbarOption(1)
					.verify.elementPresent('div.content-area p:nth-child(2) b')
					.selectFormattingToolbarOption(3)
					.verify.elementPresent('div.content-area p:nth-child(2) u')
					.clickRow(3)
					.click(properties.get("nextButton"));
			})
			
			.waitUntilLoaderPresent(function() {
				documentUploadPage
					.verify.containsText(properties.get("activeTabText"), "Documents", "Documents Tab is not active") 
					.uploadDocument("MultiSheet_Start.xlsx", "MultiSheet_Final.xlsx")
					.verify.containsText(documentUploadPage.elements.submissionStatus1.selector, String("Uploaded on").trim())
					.openPreviewdocument('1')
                    .verify.containsText(documentUploadPage.elements.previewWindowHeader.selector,'Initial Document')
                    .verify.containsText(documentUploadPage.elements.activeCellData.selector,'c')
                    .closePreviewdocument()
                    .openPreviewdocument('2')
                    .verify.containsText(documentUploadPage.elements.previewWindowHeader.selector,'Final Document')
                    .verify.containsText(documentUploadPage.elements.activeCellData.selector,'100')
                    .closePreviewdocument()
					.click(properties.get("nextButton"));
			})
			
			.waitUntilLoaderPresent(function() {
				scoringRulesPage
					.verify.containsText(properties.get("activeTabText"), "Scoring Rules", "Scoring Rules Tab is not active") 
					.toggleScoreForRow(1)
					.verify.value("div.score-heading  input", "90", "Score is not matching")
					.click(properties.get("previewButton"));
				previewPublishPage
					.validateTextForRow("Instruction 1 Text", 1)
					.closePreview()
					.click(properties.get("nextButton"));
			})
			
			.waitUntilLoaderPresent(function() {
				previewPublishPage
					.verify.containsText(properties.get("activeTabText"), "Preview & Publish", "Preview & Publish Tab is not active") 
					.validatePublishCheckpoints()
					.openPreview()
					.validateTextForRow("Instruction 1 Text", 1)
					.closePreview()
					.publishItem()
					.verify.containsText("span.title-tag:nth-child(3) span:last-child", "Published", "Item failed to publish")
					.verify.containsText("span.title-tag:nth-child(4) span:first-child", "Published ID", "Item failed to publish")
				
				getID
					.getLeonardoID(client)
                    .then(function(value) {
                    	logger.info("Item ID:"+value);
                    	ItemId=value
                    	})
			})	
			.click(properties.get("finishButton"))
			.waitUntilLoaderPresent(function() {
	            dashBoardPage
	                .openItemPreview(ItemId)
	                .verify.containsText(dashBoardPage.elements.previewActiveCellData.selector, 'c', 'Text is not visible');
	            previewPublishPage
	            	.closePreview()
	        }) 
	});

	it('Question Workflow Validation using workbook having single sheet', function(client) {
		var title = "Question-Item - With Single Sheet"
		client
			.waitUntilLoaderPresent(function() {
				createItem
					.openCreate()
					.verify.containsText(createItem.elements.createPageHeader.selector, 'Create a New Leonardo Item', 'Unable to open Create page')
                    .verify.cssClassPresent(createItem.elements.presetationItem.selector, 'active', 'Presentation Item is Not Active')  
					.createItem(title, "question");
			})
			.waitUntilLoaderPresent(function() {
				setupPage
					.verify.containsText(properties.get("activeTabText"), "Setup", "SetUp Tab is not active") 
                    .verify.value('#title', title, 'SetUp Page Title is not Correct')
					.enterSetupDetails("This is the description", "Other Tags")
					.click(properties.get("nextButton"))
			})
			
			.waitUntilLoaderPresent(function() {
				templatePage
					.verify.containsText(properties.get("activeTabText"), "Template", "Template Tab is not active") 
					.verify.cssClassPresent(templatePage.getSelectorForTemplate(1), "template-selected", "Default Template is not selected")
					.verify.cssClassPresent(templatePage.getSelectorForLayout(1), "layout-selected", "Default Layout is not selected")
					.chooseTemplate(2)
					.click(properties.get("nextButton"))
			})
			
			.waitUntilLoaderPresent(function() {
				instructionsPage
					.verify.containsText(properties.get("activeTabText"), "Instructions", "Instructions Tab is not active") 
					.clickRow(1)
					.enterInstructionText("Instruction 1 Text")
					.clickRow(2)
					.enterInstructionText("Instruction 2 Text")
					.clickRow(3)
					.enterInstructionText("Instruction 3 Text")
					.selectTextForRow(2)
					.selectFormattingToolbarOption(1)
					.verify.elementPresent('div.content-area p:nth-child(2) b')
					.selectFormattingToolbarOption(3)
					.verify.elementPresent('div.content-area p:nth-child(2) u')
					.clickRow(3)
					.click(properties.get("nextButton"))
			})
			
			.waitUntilLoaderPresent(function() {
				documentUploadPage
					.verify.containsText(properties.get("activeTabText"), "Documents", "Documents Tab is not active") 
					.uploadDocument("testfile.xlsx", "testfile_Final.xlsx")
					.verify.containsText(documentUploadPage.elements.submissionStatus1.selector, String("Uploaded on").trim())
					.openPreviewdocument('1')
                    .verify.containsText(documentUploadPage.elements.previewWindowHeader.selector,'Initial Document')
                    .verify.containsText(documentUploadPage.elements.activeCellData.selector,'1')
                    .closePreviewdocument()
                    .openPreviewdocument('2')
                    .verify.containsText(documentUploadPage.elements.previewWindowHeader.selector,'Final Document')
                    .verify.containsText(documentUploadPage.elements.activeCellData.selector,'1')
                    .closePreviewdocument()
                    .click(properties.get("nextButton"))
			})
			
			.waitUntilLoaderPresent(function() {
				scoringRulesPage
					.verify.containsText(properties.get("activeTabText"), "Scoring Rules", "Scoring Rules Tab is not active") 
					.toggleScoreForRow(1)
					.verify.value("div.score-heading  input", "80", "Score is not matching")
					.click(properties.get("previewButton"));
				previewPublishPage
					.validateTextForRow("Instruction 1 Text", 1)
					.closePreview()
					.click(properties.get("nextButton"))
			})
			
			.waitUntilLoaderPresent(function() {
				previewPublishPage
					.verify.containsText(properties.get("activeTabText"), "Preview & Publish", "Preview & Publish Tab is not active") 
					.validatePublishCheckpoints()
					.openPreview()
					.validateTextForRow("Instruction 3 Text", 3)
					.closePreview()
					.publishItem()
					.verify.containsText("span.title-tag:nth-child(3) span:last-child", "Published", "Item failed to publish")
					.verify.containsText("span.title-tag:nth-child(4) span:first-child", "Published ID", "Item failed to publish")
					
				getID
					.getLeonardoID(client)
                    .then(function(value) {
                    		logger.info("Item ID:"+value);
                    		ItemId=value
                    	})
			})	
			.click(properties.get("finishButton"))
			.waitUntilLoaderPresent(function() {
	            dashBoardPage
	                .openItemPreview(ItemId)
	                .verify.containsText(dashBoardPage.elements.previewActiveCellData.selector, '1', 'Text is not visible');
	            previewPublishPage
	            	.closePreview()
	        }) 
	});
	
	afterEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Completed following Test Case: " + testcase_name)
        done();
    });

	after(function(client, done) {
		logger.info("Completed following suite : " + suite_name)
    	client.end(function() {
      		done();
    	});
  	});
});