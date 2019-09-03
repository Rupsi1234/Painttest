var getSelector = require('./../../utils/modules/getSelectorForCell');

describe ('QI_TS07 - Top Bottom Template - Single Sheet_Row_Column Header_Formula & Sheet Bar', function(client) {

	this.timeout(90000000);
	var testfile_name = this.file;
	var suite_name = this.title;
    var testcase_name;

	before(function(client, done) {

		logger.info("Executing File: " + testfile_name + ".js")
		logger.info("Starting following suite: " + suite_name)		
		logger.info("Launching Browser: " + client.options.desiredCapabilities.browserName)
		logger.info("Launching the Leonardo Player URL: " + data.playerURLMultiSubItems_TopBottom)

		embedPlayer = client.page.embedPlayer();

    	client
    		.maximizeWindow()
            .url(data.playerURLMultiSubItems_TopBottom)
            .waitForElementVisible(properties.get("playerLoader"), 10000, function() {
            	done();
     	    })
	});

	beforeEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Executing following Test Case: " + testcase_name)
        done();
    });

	it('TC01 - Check sub-items cell is not editable and validate cell text', function(client) {
		
		embedPlayer
			.selectSubItemCell('A1', 1)
			.verify.containsText("div.leo-instructionarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "Motor Number")
			.verify.cssClassPresent('div.leo-instructionarea .k-spreadsheet-cell.k-spreadsheet-active-cell', 'k-state-disabled')
	})

	it('TC02 - Check all error scenario', function(client) {

		embedPlayer
			.selectCell('A13')
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 12)
	});

	it('TC03 - Validate Tooltip for cell G4', function(client) {

		embedPlayer
			.validateTooltipForCell('G4', 'Cell G4 should have property Content set to 5.2.')
	
	});

	it('TC04 - Validate Try Again functionality', function(client) {

		embedPlayer
			.click(properties.get('tryAgainButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 0)

	});

	it('TC05 - Check My Work for few correct and few incorrect cell values - Decimal Values', function(client) {

		embedPlayer.api
			.selectCell('G4')
			.keys(client.Keys.DELETE)
			.enterText('5.2')
			.selectCell('G5')
			.keys(client.Keys.DELETE)
			.enterText('7.6')
			.selectCell('G10')
			.keys(client.Keys.DELETE)
			.enterText('10')
			.selectCell('G11')
			.keys(client.Keys.DELETE)
			.enterText('20')
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 2)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 10);
	
	});

	it('TC06 - Validate Try Again does not reset the cell values - Check for cell G4', function(client) {

		embedPlayer	
			.validateTooltipForCell('G6', 'Cell G6 should have property Content set to 7.8.')
			.click(properties.get('tryAgainButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 0)
			.verify.containsText(getSelector.getSelectorForCell('G4'), "5.2")
	});

	it('TC07 - Check My Work after correcting few incorrect cells and vice versa', function(client) {

		client
			.selectCell('G6')
			.keys(client.Keys.DELETE)
			.enterText('7.8')
			.selectCell('G7')
			.keys(client.Keys.DELETE)
			.enterText('4.2')
			.selectCell('G8')
			.keys(client.Keys.DELETE)
			.enterText('FALSE')
			.selectCell('G11')
			.keys(client.Keys.DELETE)
			.enterText('20')
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 5)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 7);
	
	});
	
	it('TC08 - Validate Try Again does not reset the incorrect cell values - Check for cell G8', function(client) {

		embedPlayer	
			.validateTooltipForCell('G10', 'Cell G10 should have property Content set to 35.')
			.click(properties.get('tryAgainButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 0)
			.verify.containsText(getSelector.getSelectorForCell('G8'), "FALSE")
	});


	it('TC09 - Check My Work after entering all correct values - Incomplete due to issue in Leonardo', function(client) {

		client
			.selectCell('G6')
			.keys(client.Keys.DELETE)
			.enterText('7.8')
			.selectCell('G7')
			.keys(client.Keys.DELETE)
			.enterText('4.2')
			.selectCell('G8')
			.keys(client.Keys.DELETE)
			.enterText('FALSE')
			.selectCell('G11')
			.keys(client.Keys.DELETE)
			.enterText('20')
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 5)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 7);
	
	});
	
	it('TC10 - Validate Reset functionality removes all the user entered values', function(client) {

		embedPlayer	
			.validateTooltipForCell('G10', 'Cell G10 should have property Content set to 35.')
			.click(properties.get('resetButton'))
			.verify.elementCount(embedPlayer.elements.greenColorCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.redColorCells.selector, 0)
			.verify.containsText(getSelector.getSelectorForCell('G8'), "30")
	});

	afterEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Completed following Test Case: " + testcase_name)
        client.pause(2000, function() {
	        done();
        	
        })
    });

	after(function(client, done) {
		logger.info("Completed following suite : " + suite_name)
    	client.end(function() {
      		done();
    	});
  	});
});