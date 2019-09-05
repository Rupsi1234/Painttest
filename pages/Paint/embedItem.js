module.exports = {

      elements: {
        embedModalHeader: {
            selector: '.modal-embed div.modal-header > span'
        },

        embedText: {
            selector: 'div.embed-containerRight textarea'
        }
    },
    commands: [

    { 
        checkEmbedOptions: function(option) {
            var embedOption = 'div.form-check:nth-child(' + option + ') label'
            return this
                .waitForElementVisible(embedOption, 10000)
                .click(embedOption)
        }
    }]
};
