module.exports = {

      elements: {
        checkMyWorkButton: {
            selector: '//*[contains(@class, "buttonContainer")]//button[text() = "Check My Work"]',
            locateStrategy: 'xpath'
        },

        tryAgainButton: {
            selector: '//*[contains(@class, "buttonContainer")]//button[text() = "Try Again"]',
            locateStrategy: 'xpath'
        },

        resetButton: {
            selector: '//*[contains(@class, "buttonContainer")]//button[text() = "Reset"]',
            locateStrategy: 'xpath'
        }, 

        activeCell: {
            selector: 'div.leo-canvasarea .k-spreadsheet-active-cell'
        },

        redColorCells: {
            selector: 'div.k-state-disabled.incorrect:not(.k-spreadsheet-active-cell) '
        },

        greenColorCells: {
            selector: 'div.k-state-disabled.correct:not(.k-spreadsheet-active-cell) '
        }
    },
    
    commands: [

    { 
        clickButton: function(button) {
            var selector = '//*[contains(@class, "buttonContainer")]//button[text() = "' + button + '"]'
            this.api
                .useXpath()
                .waitForElementVisible(selector, 10000)
                .click(selector)
                .useCss()
            return this    
        },

        getActiveCellText: function() {
            this
                .api.getText('div.leo-canvasarea .k-spreadsheet-active-cell > div', function(result) {
                    return result.value
                })
        },

        setActiveCellText: function(value) {
            return this
                .api.setValue('div.leo-canvasarea div.k-spreadsheet-cell-editor.k-spreadsheet-formula-input', value)

        }, 

        validateTooltipForCell: function(cellRef, tooltip) { 
            this.api
                .selectCell(cellRef)
                .moveToElement('div.leo-canvasarea', 10, 10)
                .moveToElement('div.leo-canvasarea div.k-spreadsheet-active-cell', 50, 10)
                .waitForElementVisible('div.k-animation-container[style*="display: block"] div.feedbackTooltipContent div.text', 3000)
                .verify.valueContains('div.k-animation-container[style*="display: block"] div.feedbackTooltipContent div.text', tooltip, "Tooltip text not matching with the expected text")
                
            return this    
        }
    }]
};