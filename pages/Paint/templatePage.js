module.exports = {

    elements: {
        
    },
    
    commands: [

    { 
        chooseTemplate: function(option) {
            try {
                var templateOption = 'div.template > div.template-container > div:nth-child(' + option + ')'   
                var selectedTemplate = 'div.template > div.template-container > div:nth-child(' + option + ') > div'
                this
                    .waitForElementVisible(templateOption, 10000)
                    .click(templateOption)
                    .verify.cssClassPresent(selectedTemplate, 'template-selected', "Failed to select the Template option");        
            } catch (err) {
                logger.error(err.stack)
            }
            return this
        },

        chooseLayout: function(option) {
            try {
                var layoutOption = 'div.layout > div.template-container > div:nth-child(' + option + ')'   
                var selectedLayout = 'div.layout > div.template-container > div:nth-child(' + option + ') > div'
                return this
                    .waitForElementVisible(layoutOption, 10000)
                    .click(layoutOption)
                    .verify.cssClassPresent(selectedLayout, 'layout-selected', "Failed to select the Layout option");
            } catch (err) {
                logger.error(err.stack)
            }
        },

        getSelectorForTemplate: function(option) {
            return "div.template-selection:nth-child(" + option + ") > div"
        },

        getSelectorForLayout: function(option) {
            return "div.layout-selection:nth-child(" + option + ") > div"
        }

    }]
};
