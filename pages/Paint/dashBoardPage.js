module.exports = {

  elements: {
        
    publishItemNavigation:
      {
        selector: '.published-items'
      },
    previewActiveCell:
      {
        selector: '.k-selection-wrapper>.k-spreadsheet-active-cell'
      },
    previewActiveCellData:
      {
        selector: '.k-spreadsheet-active-cell>.k-vertical-align-bottom'
      }
    },

  commands: [
      
    { 
      
      openItemPreview: function(itemId) {
        try {
          this.api
            .waitForElementVisible('.published-items', 10000)
            .click('.published-items')
            .waitForElementPresent('.page-spinner-loader.hide', 10000)
            .useXpath()
            .moveToElement('//span[contains(text(), "' + itemId + '")]', 50, 50)
            .click('//span[contains(text(), "' + itemId + '")]//following::a[@title="Launch Preview"][1]')
            .useCss()
            .waitForElementPresent('div.leonardo-player-container',10000)

        } catch (err) {
          logger.error(err.stack)
        }
        return this
      },

      openEmbed: function(itemId) { 
        try {
          this.api
            .waitForElementVisible('.published-items',10000)
            .click('.published-items')
            .waitForElementPresent('.page-spinner-loader.hide',10000)
            .useXpath()
            .moveToElement('//span[contains(text(), "' + itemId + '")]', 50, 50)
            .click('//span[contains(text(), "' + itemId + '")]//following::a[@title="Embed Item"][1]')
            .useCss()
            .waitForElementVisible('.modal-embed .modal-header',10000)
        } catch (err) {
          logger.error(err.stack)
        }
        return this
      }
     
    }]  
};
 