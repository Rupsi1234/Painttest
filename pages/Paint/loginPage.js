module.exports = {

    elements: {
        organization:
        {
            selector : '#orgid'
        },
        username: { 
            selector : '#name'
      },
      password: {
            selector : '#password'
      },
      signIn : {
            selector : '.btn.btn-primary.btn-lg.login-form__signin.btn--primary'
      }
    
         
    },

    commands: [

      { 
       loginWithDetails: function(organization, username, password) {
        var test=this
        
        try {
             logger.info("Enter the Login Details")
           this
                .waitForElementVisible('@organization', 40000)
                .setValue('@organization', organization)
                .setValue('@username', username)
                .setValue('@password', password)
                .click('@signIn')
                .waitForElementVisible(headerFooterPage.elements.title.selector, 50000, function(result) {
                    if(result.status===0)
                       logger.info("leonardo Paint : Login Successful")
                    else 
                     {
                       logger.error("leonardo Paint : Login UnSuccessful")
                           test.api
                             .elements('css selector' ,'.login-box .message--error' ,function(errorelement)
                             { 
                              try{
                                    errorelement.value.forEach(function(errorvalue){
                                    test.api.elementIdAttribute(errorvalue.ELEMENT, 'innerText', function(error) {
                                    logger.error("Error: "+error.value)
                                      })
                                    })
                                }catch(err)
                                {
                                  logger.error(err.stack)
                                }

                             })
                     }
            })
      
          
          }  
          catch(err)
           {
            logger.error(err.stack)
            }
    return this
     }
   }]
};

