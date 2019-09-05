var getSelector = require(currentDirPath + '/utils/modules/getSelectorForCell');

describe ('QI_TS03 - Grid View Template - Single Sheet With Row, Col header, Formula Bar, Gridlines', function(client) {

	this.timeout(90000000);
	var testfile_name = this.file;
	var suite_name = this.title;
    var testcase_name;

	before(function(client, done) {

		logger.info("Executing File: " + testfile_name + ".js")
		logger.info("Starting following suite: " + suite_name)		
		logger.info("Launching Browser: " + client.options.desiredCapabilities.browserName)
		logger.info("Launching the Leonardo Player URL: " + data[argv.testEnv].playerURL_Gridview_HBP)

		embedPlayer = client.page.embedPlayer();

    	client
    		.maximizeWindow()
    		.url(data[argv.testEnv].playerURL_Gridview_HBP)
            .waitForElementVisible(properties.get("playerLoader"), 10000, function() {
            	done();
     	    })
	});

	beforeEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Executing following Test Case: " + testcase_name)
        done();
    });

	it('TC01 - Check cell is editable and cell text', function(client) {
		
		embedPlayer
			.selectCell('A2')
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "Cost per unit of capacity")
			.verify.cssClassNotPresent('div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell', 'k-state-disabled')
	})

	it('TC02 - Check all error scenario', function(client) {

		embedPlayer
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.correctCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.incorrectCells.selector, 34)
			.verify.elementCount(embedPlayer.elements.partialCorrectCells.selector, 0)
	});

	it('TC03 - Validate Tooltip for cell B6', function(client) {

		embedPlayer
			.validateTooltipForCell('B6', 'Cell Text should be "50,000".')
	});

	it('TC04 - Validate Try Again functionality', function(client) {

		embedPlayer
			.click(properties.get('tryAgainButton'))
			.verify.elementCount(embedPlayer.elements.correctCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.incorrectCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.partialCorrectCells.selector, 0)
	});

	it('TC05 - Check My Work for few correct and few incorrect cell values - Text, Accounting, Percent and Decimal Values', function(client) {

		embedPlayer.api
			.selectCell('B1')
			.keys(client.Keys.DELETE)
			.enterText('500000')
			.selectCell('B6')
			.keys(client.Keys.DELETE)
			.enterText('50000')
			.selectCell('B7')
			.keys(client.Keys.DELETE)
			.enterText('5')
			.selectCell('B12')
			.keys(client.Keys.DELETE)
			.enterText('2.00')
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.correctCells.selector, 18)
			.verify.elementCount(embedPlayer.elements.incorrectCells.selector, 16)
			.verify.elementCount(embedPlayer.elements.partialCorrectCells.selector, 0);
	});

	it('TC06 - Validate Try Again does not reset the cell values - Check for cell B1', function(client) {

		embedPlayer	
			.validateTooltipForCell('E22', 'Cell Text should be "$ 2.25".')
			.click(properties.get('tryAgainButton'))
			.verify.elementCount(embedPlayer.elements.correctCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.incorrectCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.partialCorrectCells.selector, 0)
			.verify.containsText(getSelector.getSelectorForCell('B1'), "$ 500,000")
	});

	it('TC07 - Check My Work after entering Formulas in cells - Perfect Scenario', function(client) {

		client
			.selectCell('D18')
			.keys(client.Keys.DELETE)
			.enterText('=IF(D15<=$B7+1, $B8, $B10)')
			.selectCell('F18')
			.keys(client.Keys.DELETE)
			.enterText('=IF(F15<=$B7+1, $B8, $B10)')
			.click(properties.get('checkMyWorkButton'))
			.verify.elementCount(embedPlayer.elements.correctCells.selector, 34)
			.verify.elementCount(embedPlayer.elements.incorrectCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.partialCorrectCells.selector, 0);
	});

	it('TC08 - Validate Reset functionality removes all the user entered values', function(client) {

		embedPlayer	
			.click(properties.get('tryAgainButton'))
			.click(properties.get('resetButton'))
			.verify.elementCount(embedPlayer.elements.correctCells.selector, 0)
			.verify.elementCount(embedPlayer.elements.incorrectCells.selector, 0)
			.verify.containsText(getSelector.getSelectorForCell('B1'), "")

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