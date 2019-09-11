describe ('Hint Feature Test', function(client) {

	this.timeout(90000000);
	var testfile_name = this.file;
	var suite_name = this.title;
    var testcase_name;

	before(function(client, done) {

		logger.info("Executing File: " + testfile_name + ".js")
		logger.info("Starting following suite: " + suite_name)		
		logger.info("Launching Browser: " + client.options.desiredCapabilities.browserName)
		logger.info("Launching the Leonardo Player URL: " + data[argv.testEnv].hintPlayerURL)

		embedPlayer = client.page.embedPlayer();

    	client
    		.maximizeWindow()
    		.url(data[argv.testEnv].hintPlayerURL)
            .waitForElementVisible(properties.get("playerLoader"), 10000, function() {
            	done();
     	    })
	});

	beforeEach(function (client, done) {
        testcase_name = this.currentTest.title;
        logger.info("Executing following Test Case: " + testcase_name)
        done();
    });

	it('TC.HP.00 - Enable Hint Check', function(client) {
		
		embedPlayer
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))
			.verify.elementCount(embedPlayer.elements.activeHintCells.selector, 10)
	})

	it('TC.HP.01 - Check Single Tooltip Hint on a cell', function(client) {
		
		embedPlayer
			.selectCell('D1')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.validateHintTextForCell('D1', 1, "Enter the value as 15%")
			.validatePenaltyForCell('D1', 1, 3)
			.click(embedPlayer.elements.closeHintContainer.selector)
	});

	it('TC.HP.02 - Check Single Fill Cell hint on a cell (default Tooltip text)', function(client) {
		
		embedPlayer
			.selectCell('B18')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.validateHintTextForCell('B18', 1, "We have entered the value for you.")
			.validatePenaltyForCell('B18', 1, 3)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "$227,500.00")
	});

	it('TC.HP.03 - Check Single Fill Cell hint on a cell (modified Tooltip text)', function(client) {
		
		embedPlayer
			.selectCell('C18')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.validateHintTextForCell('C18', 1, 'The formula to be filled is "=SUM(C6:C17)"')
			.validatePenaltyForCell('C18', 1, 3)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "$114,090.00")
	});

	it('TC.HP.06 - Check Multiple Hints on a cell with formatting available(Tooltip and Fill Hint)', function(client) {
		
		embedPlayer
			.selectCell('D2')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '2')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.validateHintTextForCell('D2', 1, 'Bold needs to be applied')
			.validatePenaltyForCell('D2', 1, 1)
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.validateHintTextForCell('D2', 2, 'We have entered the value for you.')
			.validatePenaltyForCell('D2', 2, 2)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "35.80%")
	});

	it('TC.HP.12 - Check Group Hint on Multiple Cells', function(client) {
		
		embedPlayer
			.selectCell('C11')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '3')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '2')
			.click(embedPlayer.elements.closeHintContainer.selector)
			.validateHintTextForCell('B12', 1, 'Value should be in Accounting Format')
			.validatePenaltyForCell('B12', 1, 5)
			.click(embedPlayer.elements.revealHint.selector)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.closeHintContainer.selector)
			.validateHintTextForCell('C13', 2, 'Apply correct alignment')
			.validatePenaltyForCell('C13', 2, 3)
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.validateHintTextForCell('C11', 3, 'This will cost 10 marks')
			.validatePenaltyForCell('C11', 3, 10)
			.click(embedPlayer.elements.closeHintContainer.selector)
	});

	it('TC.HP.13 - Check Hints will be renewed after the user clicks Try Again button', function(client) {
		
		embedPlayer
			.selectCell('A1')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.waitForElementVisible(properties.get('checkMyWorkButton'), 5000)
			.click(properties.get('checkMyWorkButton'))
			.waitForElementVisible(properties.get('tryAgainButton'), 5000)
			.click(properties.get('tryAgainButton'))
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))		
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.verify.elementPresent(embedPlayer.elements.revealHint.selector)
			.click(embedPlayer.elements.closeHintContainer.selector)
	});

	it('TC.HP.14 - Check Toggle Hint Functionality: The user should be able to toggle on/off the Hint Button', function(client) {
		
		embedPlayer
			.waitForElementVisible(properties.get('checkMyWorkButton'), 5000)
			.click(properties.get('checkMyWorkButton'))
			.waitForElementVisible(properties.get('tryAgainButton'), 5000)
			.click(properties.get('tryAgainButton'))
			.waitForElementVisible(properties.get('resetButton'), 5000)
			.click(properties.get('resetButton'))
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))
			.verify.elementCount(embedPlayer.elements.activeHintCells.selector, 10)
			.click(properties.get('closeHint'))
			.verify.elementCount(embedPlayer.elements.activeHintCells.selector, 0)
	});

	it('TC.HP.15 - Check Hint Functionality after pressing Reset button (Fill Text Use case)', function(client) {
		
		embedPlayer
			.waitForElementVisible(properties.get('checkMyWorkButton'), 5000)
			.click(properties.get('checkMyWorkButton'))
			.waitForElementVisible(properties.get('tryAgainButton'), 5000)
			.click(properties.get('tryAgainButton'))
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))
			.verify.elementCount(embedPlayer.elements.activeHintCells.selector, 10)
			.selectCell('A3')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "March 31, 2018")
			.waitForElementVisible(properties.get('resetButton'), 5000)
			.click(properties.get('resetButton'))
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))
			.selectCell('A3')
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "March 31, 2018")
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.validateHintTextForCell('A3', 1, 'We have entered the date for you.')
			.validatePenaltyForCell('A3', 1, 2)
	});

	it('TC.HP.16 - Check Hint Functionality after pressing Reset button (Tool Tip Use case)', function(client) {
		
		embedPlayer
			.waitForElementVisible(properties.get('checkMyWorkButton'), 5000)
			.click(properties.get('checkMyWorkButton'))
			.waitForElementVisible(properties.get('tryAgainButton'), 5000)
			.click(properties.get('tryAgainButton'))
			.waitForElementVisible(properties.get('resetButton'), 5000)
			.click(properties.get('resetButton'))
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))
			.verify.elementCount(embedPlayer.elements.activeHintCells.selector, 10)
			.selectCell('A6')
			.waitForElementVisible(embedPlayer.elements.remainingHintsCount.selector, 5000)
			.verify.containsText(embedPlayer.elements.remainingHintsCount.selector, '1')
			.click(embedPlayer.elements.revealHint.selector)
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.click(embedPlayer.elements.closeHintContainer.selector)
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "")
			.waitForElementVisible(properties.get('resetButton'), 5000)
			.click(properties.get('resetButton'))
			.waitForElementVisible(properties.get('showHint'), 5000)
			.click(properties.get('showHint'))
			.selectCell('A6')
			.verify.containsText("div.leo-canvasarea .k-spreadsheet-cell.k-spreadsheet-active-cell", "")
			.verify.elementNotPresent(embedPlayer.elements.remainingHintsCount.selector)
			.validateHintTextForCell('A6', 1, 'Cash needs to be filled')
			.validatePenaltyForCell('A6', 1, 2)
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