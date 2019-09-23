module.exports = {

	elements : {
		create: {
			selector :'.btn-create-new>i'
		},
		title : {
			selector : '#title'
		},
		presetationItem : {
			selector :'.modeItem.rightmargin'	
		},
		questionItem : {
			selector : 'div[class=\'modeItem\']',
		},
		proceedButton : {
			selector : 'div[aria-hidden=\'false\'] button.btn.modal-footer-btn-0'
		},
		createWindow : {
			selector :'.new-leonardo-item>div[aria-hidden=\'false\']'
		},
		createPageHeader: {
			selector: '.new-leonardo-item .modal-header'
		}

},

	commands : [
	{
		openCreate: function() {
			try {
                logger.info("Click on Create a New Item")
				this
					.waitForElementVisible('@create',10000)
					.click('@create')
					.waitForElementVisible('@createWindow',10000)
			} catch (err) {
                logger.error(err.stack)
           	}
           	return this
		},
	
		createItem: function(title,item) {
			if (item.toLowerCase() == 'presentation')
				item = '@presetationItem'
			else 
				item = '@questionItem';	
			try {
                logger.info("Create a New Item")
				this
					.waitForElementVisible('@title' , 10000)
					.setValue('@title', title)
					.waitForElementVisible (item ,10000)
					.click(item)
					.waitForElementVisible ('@proceedButton',10000)
					.click('@proceedButton')
				logger.info("New Item is created")
			} catch (err) {
                logger.error(err.stack)
           	}
            return this
	 	}
	}]
};
