module.exports = {
	elements : {
		
		totalScoreInput : {
			selector : 'div.score-heading > input'
		},

		totalScoreInDescription : {
			selector : 'div.instruction2 > b:nth-child(1)'
		}
	},

	commands : [

	{

		toggleScoreForRow: function(rowNumber) {
			try {
			var row = "div.table-row:nth-child(" + rowNumber + ")"
			var toggleCheckbox = "div.table-row:nth-child(" + rowNumber + ") > div.toggle-rule > i"
			this
				.waitForElementVisible(toggleCheckbox, 5000)
				.click(toggleCheckbox)
				.verify.cssClassPresent(row, 'disable-row', "Failed to toggle the score for the specified row")	
			} catch (err) {
				logger.error(err.stack)
			}
			return this
		} 
	}]

};