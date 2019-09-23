module.exports ={
	
	elements: {
	 selectSheetDropdown : {
	 	selector : '.btn.dropdown-toggle'
	 },
	 cellvisible:{
	 	selector:'row.row-spacing.no-gutters.disabled'
	 },
	 startCell: {
	 	selector : '.col-sm-6.col-sm-offset-1>input[name=\'startCell\']'
	 },
	 activeSheet:
	 {
	 	selector: '#filter-type > span'
	 },
	 ribbon: {
	 	selector : '.leo-widget.leo-presentationwidget .widgetContainer>div'
	 },
	 formulaBar: {
	 	selector : '.leonardo-player-container .k-spreadsheet-action-bar'
	 },
	 sheetBar: {
	 	selector : '.leonardo-player-container .k-spreadsheet-sheets-bar'
	 },
	 rowHeader: {
	 	selector : '.leonardo-player-container .k-spreadsheet-row-header'
	 },
	 columnHeader: {
	 	selector : '.leonardo-player-container .k-spreadsheet-column-header'
	 },
	 endCell: {
	 	selector : 'input[name=\'endCell\']'
	 }
},
 commands : [{

 	selectSheet : function(sheetName)
 	{
 		var a=this
 	 	try {
             logger.info("Select the Sheet")
           		this
 					.waitForElementVisible('@selectSheetDropdown',20000)
 					.click('@selectSheetDropdown')
        			.api.elements('css selector', '.dropdown-menu--select .dropdown-item', function (result){
        				result.value.forEach(function(element) {

         					a.api.elementIdAttribute(element.ELEMENT, 'innerText', function(res) {
         						var Sheetname=res.value
            					if (Sheetname.includes(sheetName) ){
               				 		this
                						.elementIdClick(element.ELEMENT);
               				 	}
                   				
              		  		})
            			})
        			})
        			logger.info(sheetName+" is selected")
            } catch (err) {
                logger.error(err.stack)
            }
	   return this
	},
	cellRange: function(start,end)
	{
		try {
             logger.info("Update the Cell Range")
           		this
					.waitForElementVisible('@startCell',20000)
		 			.clearValue('@startCell')
		 			.setValue('@startCell',start)
		 		   .click('span.title-tag')
		 			.clearValue('@endCell')
		 		   .setValue('@endCell',end)
		 		   .click('span.title-tag')
		 		   logger.info(start + " is updated as Start Cell Value")
		 		   logger.info(end + " is updated as End Cell Value")
		 	} 
		 catch (err) {
                logger.error(err.stack)
            }
	   return this 
	},

	enableToggleButton:function(checkboxName)
	{   
	 	var number=1;
	 	var test = this.api;
	 	try {
             logger.info("Enable the Toggle Button")
           		this
						if (checkboxName=='All')
						{
 						this.api.elements('css selector' ,'.form-control.d-none' ,function(result)
 							{
 								logger.info("Change the state of All Toggle Button")
 		 						result.value.forEach(function(value){
 		 					try{
 		 						var toggleButton='.panel-body> .row-spacing-checkbox:nth-child('+number+') i'
 		 						test.moveToElement('.panel-body> .row-spacing-checkbox:nth-child(6) i',288,763)
 		 							.waitForElementVisible(toggleButton,30000)
 		 							.click(toggleButton)
 		 							.waitForElementNotPresent('div.panel:nth-child(2) div.panel-body.disable-toggle', 10000)
 		 						number++;
 		 						logger.info("All Toggle Button is enabled")
 		 						
 		 					}catch(err)
 		 							{
 		 								logger.error(err.stack)
 		 							}
 		 						})
 		 					})
 							
 							}
						
						else
						{
							var chcekboxname= ".//div[@class=\"col-sm-6 text-right\"]/../label[text()=\""
							var checkbox= chcekboxname.concat(checkboxName, "\"]/..//i")
							logger.info("Enable the " +checkboxName+ " Toggle Button")
							this.api
								.moveToElement('.panel-body> .row-spacing-checkbox:nth-child(6) i',288,763)
	 							.waitForElementNotPresent('div.panel:nth-child(2) div.panel-body.disable-toggle', 10000)
								.useXpath()
								.waitForElementVisible(checkbox,30000)
								.click(checkbox)
								.useCss()
	 							.waitForElementNotPresent('div.panel:nth-child(2) div.panel-body.disable-toggle', 10000)
							logger.info(checkboxName+ " Toggle Button is enabled")
						}
		}
		catch (err) {
                logger.error(err.stack)
            }
	   return this 
	   }
}]
};
