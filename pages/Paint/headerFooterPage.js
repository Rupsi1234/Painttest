module.exports = {

    elements: {
        NextButton:
        {
            selector : 'button.btn.btn-md.next'
        },
        PreviousButton: { 
            selector : 'button.btn.btn-md.previous'
           
        },
        FinishButton: {
            selector : 'button.btn.btn-md.finish'
        },
        CloseButton : {
            selector : 'button.btn.btn-md.close-btn'
        },
        title: {
             selector :'.productTitle'
        },
        userName: {
            selector: '.nav-link.dropdown-toggle.dropdown-toggle--profile'  
        },
        logOut: {
            selector : '.fa.fa-sign-out'
        },
        unlockForEditing: {
            selector: '//button[text()="Unlock for editing"]',
            locateStrategy: 'xpath'
        }

      }, 

      commands: [
      { 
       /* validateTags(id,tags)
        {
             logger.info("Validate the Tags")
             try {
            //.//span[@class='item-id' and (text()='Item ID: leonardo-dev-967')]/../..//span[@class='badge badge-difficulty']
                var projetID=".//span[@class='item-id' and (text()='Item ID: leonardo-dev-"+id+"')]"
                var tags=   projetID +"/../..//span[@class='badge badge-"+tags+"']"
                consol.log(projetID)
                console.log(tags)
                 } 
            catch (err) 
                  {
                 logger.error(err.stack)
                 }
            },*/
        logOut:function () 

        {
         try{ 
          logger.info('LogOut from the application')
            this
                .waitForElementVisible('@userName', 10000)
                .click('@userName')
                .waitForElementVisible('@logOut',10000)
                .click('@logOut')
                logger.info('Application is LogOut Succesfully')

                 } 
         catch (err) 
             {
              logger.error(err.stack)
             }
          return this
        },

        unlockItem : function () {
          try {
            var test = this
            this.api.element('xpath', '//button[text()="Unlock for editing"]', function(result) {
                if (result.status != -1) {
                    test
                        .api.useXpath()
                        .click('//button[text()="Unlock for editing"]')
                        .useCss();
                    logger.info('Item unlocked for editing')
                } else {
                    logger.info('Item already in unlocked state')
                }
            })
          }  
          
          catch (err) {
            logger.error(err.stack)
          }

          return this
        }
    }]
     
};

     