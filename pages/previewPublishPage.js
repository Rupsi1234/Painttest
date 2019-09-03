module.exports = {
	elements : {
		publishButton : {
        	selector: '//button[text() = "Publish"]',
			locateStrategy: 'xpath'	
        },

        overrideButton : {
        	selector: '//button[text() = "Override"]',
			locateStrategy: 'xpath'	
        },

        createNewButton : {
        	selector: '//button[text() = "Create New"]',
			locateStrategy: 'xpath'	
        },

		embedButton : {
        	selector: '//button[@title = "Embed Item"]',
			locateStrategy: 'xpath'	
        },        

        previewContainer : {
        	selector: 'div.preview-container' 
        },

        publishedID : {
        	selector: '//div[contains(@class, "paint-header")]//span[contains(@class, "title-tag")][3]//span[2]',
        	locateStrategy: 'xpath'
        }
	},

	commands : [{

		validatePublishCheckpoints : function(client) {
			try {
				logger.info("Validating Publish Checkpoints")
				this.api.waitForElementNotPresent('.checkList-loader.checkpoints-container',20000)	
				this.api.elements('css selector', '.row.no-gutters.checkpoint .fa', function(result) {
					var length = 1;
					var temp = this;
					result.value.forEach(function (value) {
						var checkpoint = 'div.row.no-gutters.checkpoint:nth-child(' + length + ') span.fa'
						try {
							temp
								.getAttribute(checkpoint, "class", function(result1) {
									temp.waitForElementVisible(checkpoint, 5000)
							 			.assert.cssClassNotPresent(checkpoint, "invalid", "Publish Checkpoints failed");
								})
							length++;
						} catch (err) {
							logger.error(err.stack)
						}
						
					});
				})
				logger.info("Publish Checkpoints Validated")
			} catch (err) {
				logger.error(err.stack)
			}
			return this;
		},


		openPreview : function() {
			try {
				logger.info("Opening Preview")
				this
					.waitForElementVisible('@previewContainer', 5000)
					.click('@previewContainer')
				logger.info("Preview Opened")
			} catch (err) {
				logger.error(err.stack)
			}
			return this
		},

		closePreview : function(client) {
			try {
				logger.info("Closing Preview")
				var temp = this
				this
					.api.url(function(current_url) {
						if(current_url.value.includes('publish')) {
							var selector = '//div[contains(@class, "preview-component") and contains(@class, "transform")]'
							var previewCloseButton = '//*[contains(@class, "container") and not(contains(@style, "display: none"))]//span[contains(text(), "- Preview")]/following::i[1]'	
							temp
								.api.useXpath()
								.waitForElementVisible(previewCloseButton, 5000)
								.click(previewCloseButton)
								.waitForElementVisible(selector, 10000)
								.useCss()
						} else {
							var previewCloseButton = '//*[contains(@class, "container") and not(contains(@style, "display: none"))]//span[contains(text(), "- Preview")]/following::i[1]'
							temp
								.api.useXpath()
								.waitForElementVisible(previewCloseButton, 5000)
								.click(previewCloseButton)
								.waitForElementNotPresent(previewCloseButton, 10000)
								.useCss()
						}

					})
				logger.info("Preview Closed")
			} catch (err) {
				logger.error(err.stack)
			}
			return this
		},

		publishItem : function(client) {
			try {
				logger.info("Publishing Item")
				this
					.waitForElementVisible('@publishButton', 5000)
					.click('@publishButton')
					.waitForElementPresent('div.page-spinner-loader.hide', 40000)
					.verify.elementPresent('@embedButton', "Failed to publish Project");
				logger.info("Item Published")
			} catch (err) {
				logger.error(err.stack)
			}
			return this
		},

		rePublishItem : function(option) {
			try {
				logger.info("Re-Publishing Item")
				this
					.waitForElementVisible('@publishButton', 5000)
					.click('@publishButton')
				if (option.toLowerCase() == "override") {
					this
						.waitForElementVisible('@overrideButton', 5000)
						.click('@overrideButton')
				} else if (option.toLowerCase() == "create new") {
					this
						.waitForElementVisible('@createNewButton', 5000)
						.click('@createNewButton')
				}	
				this	
					.waitForElementPresent('div.page-spinner-loader.hide', 40000)
					.verify.elementPresent('@embedButton', "Failed to publish Project");
				logger.info("Item Re-Published")
			} catch (err) {
				logger.error(err.stack)
			}
			return this
		},

		validateTextForRow : function(insText, rowNumber) {
			try {
				logger.info("Validating Instruction Text for Row: " + rowNumber + "to be: " + insText)
				var row = "div.leo-instructionarea p:nth-child(" + rowNumber + ")"
				this
					.waitForElementVisible(row, 5000)
					.getText(row, function(temp) {
						this.assert.equal(temp.value, insText);
				})
                logger.info("Instruction Text for Row: " + rowNumber + "validated to be: " + insText)
			} catch (err) {
				logger.error(err.stack)
			}
            return this
		},

		getPublishedID : function() {
			try {
				logger.info("Getting Published ID")
				this
					.verify.elementPresent('@publishedID')
					.getValue('@publishedID', function(result) {
						return result
					})
			} catch (err) {
				logger.error(err.stack)
			}
		} 

	}]
};