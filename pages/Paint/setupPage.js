module.exports = {
	
	elements : {

		description :{
			selector : 'textarea.description'
		},

		domain_DropDown : {
			selector : '#tag-trigger-0'
		},

		domain_Value :{
		selector :'#tag-res-ctn-0 > div:nth-child(2)'
		},

		difficulty_DropDown :{
			selector :'#tag-trigger-1'
		},
		difficulty_Value :{
		selector :'#tag-res-ctn-0 > div:nth-child(1)'
		},

		otherText :{
			selector : '#tag-input-2'
		},
		nextButton :{
			selector :'//button[text() = "Next"]',
			locateStrategy: 'xpath'
		}
	},

	commands: [
{
	enterSetupDetails: function (desc,other){			 
		

		try {
             logger.info("Enter the Item Setup Details")
           this
				.waitForElementVisible('@description',20000)
				.click('@description')
				.setValue('@description',desc)
				.waitForElementVisible('@domain_DropDown',20000)
				.click('@domain_DropDown')
				.click('@domain_Value')
				.waitForElementVisible('@difficulty_DropDown',20000)
				.click('@difficulty_DropDown')
				.click('@difficulty_Value')
				.waitForElementVisible('@otherText',20000)
				.setValue('@otherText',other)
				.click('@otherText')
				.click('@description')
			} 
   		 catch (err) {
           logger.error(err.stack)
            }
      return this
					
	},
	validateSetup: function(type)
	{
		console.log("Validate Setup Page Mode")
	return this
		.waitForElementVisible('.paint-header-left.d-flex>span:nth-child(2) > span:nth-child(2)',5000)
		.verify.containsText('.paint-header-left.d-flex>span:nth-child(2) > span:nth-child(2)',type)

	}

	}]
};

