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

        incorrectCells: {
            selector: 'span.l-incorrect'
        },

        correctCells: {
            selector: 'span.l-correct'
        },

        partialCorrectCells: {
            selector: 'span.l-partial'
        },

        activeHintCells: {
            selector: 'div.l-hint-default'
        },

        consumedHintCells: {
            selector: 'div.l-hint-consumed'
        },

        revealHint: {
            selector: 'button.revealHintsButton'
        },

        remainingHintsCount : {
            selector: 'span.remainingHints'
        },

        closeHintContainer : {
            selector: 'div.hintsCardContainer span.la-close'
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
                .waitForElementVisible('div.feedbackTooltipContent div.text', 3000)
                .verify.containsText('div.feedbackTooltipContent div.text', tooltip, "Tooltip text not matching with the expected text")
                
            return this    
        },

        validateHintTextForCell: function(cellRef, hintPos, expectedText) {
            var hintText = []
            var temp = this

            temp.api
                .selectCell(cellRef)
                .waitForElementPresent('div.hintsCardContainer', 10000)
                .elements('css selector', 'div.hintsCardContainer div.hintsContent.revealed span.text', function(elementList) {
                    elementList.value.forEach(function (elem, index) {
                        temp.api.elementIdText(elem.ELEMENT, function(result) {
                            hintText.push(result.value)                    
                            if (index == elementList.value.length - 1) {
                                temp.api.verify.equal(hintText[hintPos-1], expectedText)
                            }
                        })
                    })
                })
            return this
        },

        validatePenaltyForCell: function(cellRef, hintPos, expectedPenalty) {
            var penaltyText = []
            var temp = this

            temp.api
                .selectCell(cellRef)
                .waitForElementPresent('div.hintsCardContainer', 10000)
                .elements('css selector', 'div.hintsCardContainer div.hintsContent.revealed span.marksDeducted', function(elementList) {
                    elementList.value.forEach(function (elem, index) {
                        temp.api.elementIdText(elem.ELEMENT, function(result) {
                            penaltyText.push(result.value)                    
                            if (index == elementList.value.length - 1) {
                                temp.api.verify.equal(penaltyText[hintPos-1], "Penalty Marks: " + expectedPenalty)
                            }
                        })
                    })
                })
            return this
        }
    }]
};