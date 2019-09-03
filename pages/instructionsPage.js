module.exports = {

      elements: {
        addSubItem: {
            selector: 'div.medium-insert-buttons > button'
        },

        leonardoItemButton: {
            selector: '//button[text()="Leonardo Item"]',
            locateStrategy: 'xpath'
        },
    },
    
    commands: [

    { 
        clickRow: function(number) {
            try {
                logger.info("Clicking Instruction Row Number: " + number)
                var rowSelector = 'div.content-area > p:nth-child(' + number + ')';
                this
                    .waitForElementVisible(rowSelector, 10000)
                    .click(rowSelector);
                logger.info("Successfully clicked Instruction Row Number: " + number)
            } catch (err) {
                logger.error(err.stack)
            }
            return this
        },

        enterInstructionText: function(text) {
            try {
                logger.info("Entering following text in selected row: " + text)
                this.api
                    .execute(function(instructionData) {
                        document.getElementsByClassName('medium-insert-active')[0].innerText = instructionData
                        }, [text])
                    .keys([this.api.Keys.END, this.api.Keys.ENTER])
                logger.info("Successfully entered following text in selected row: " + text)
            } catch (err) {
                logger.error(err.stack)
            }
            return this
        },

        addSubItem: function() {
            try {
                logger.info("Adding Leonardo Sub Item")
                this
                    .waitForElementVisible('@addSubItem', 10000)
                    .click('@addSubItem')
                    .waitForElementVisible('@leonardoItemButton', 10000)
                    .click('leonardoItemButton')
                logger.info("Successfully added Leonardo Sub Item")
            } catch (err) {
                logger.error(err.stack)
            }
            return this
        },

        selectSubItemOption: function(option) {
            try {
                logger.info("Adding Leonardo Sub Item option: " + option)
                var subItemOption = 'div.create-item-wizard:nth-child(' + option + ')'
                this
                    .waitForElementVisible(subItemOption, 10000)
                    .click(subItemOption)
                logger.info("Added Leonardo Sub Item option: " + option)
            } catch (err) {
                logger.error(err.stack)
            }
            return this
        },

        selectFormattingToolbarOption: function(option) {
            try {
                logger.info("Selecting Option " + option + " from Formatting toolbar")
                var temp = '.medium-editor-toolbar-actions li:nth-child(' + option + ') button'
                this
                    .waitForElementVisible(temp, 10000)
                    .click(temp)
                logger.info("Option " + option + " selected from Formatting toolbar")
            } catch (err) {
                logger.error(err.stack)
            }
            return this
        },

/* Select Text for Row can be replaced with a generic function to press any Key Events 
simultaneously depending upon the future requirements */

        selectTextForRow: function(option) {
            this
                .clickRow(option)
                .api.keys([this.api.Keys.END, this.api.Keys.SHIFT, this.api.Keys.HOME, this.api.Keys.NULL])
            return this
        }
    }]
};
