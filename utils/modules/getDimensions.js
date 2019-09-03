'use strict'
//getDimensions
exports.getSubItemHeight = function(rowNum, subItem, self) {

    // var self = this;
    var hgt;
    return new Promise(function(resolve, reject) {
        //console.log("logging height");
        var rowPath = "div.leo-instructionarea div.instruction-spreadsheet-component:nth-of-type(" + subItem + ") > div.widgetContainer > div.spreadsheet.k-widget.k-spreadsheet > div.k-spreadsheet-view > div.k-spreadsheet-fixed-container > div.k-spreadsheet-pane.k-top.k-left > div.k-spreadsheet-row-header > div:nth-child(" + rowNum + ") > div"
            
        self.api.getElementSize(rowPath, function(result) {
            hgt = (result.value.height) / 2;
        })
        self.api.getLocationInView(rowPath, function(result) {
            hgt = hgt / 2 + result.value.y;
            resolve(hgt);
        })
    })
}

exports.getSubItemWidth = function(colNum, subItem, self) {

    // var self = this;
    var wdth;
    return new Promise(function(resolve, reject) {
       // console.log("calculating Width");
        var colpath = "div.leo-instructionarea div.instruction-spreadsheet-component:nth-of-type(" + subItem + ") > div.widgetContainer > div.spreadsheet.k-widget.k-spreadsheet > div.k-spreadsheet-view > div.k-spreadsheet-fixed-container > div.k-spreadsheet-pane.k-top.k-left > div.k-spreadsheet-column-header > div:nth-child(" + colNum + ") > div"
        self.api.getElementSize(colpath, function(result) {
            wdth = ((result.value.width) / 2);
        })

        self.api.getLocationInView(colpath, function(result) {
            wdth = wdth / 2 + result.value.x;
            resolve(wdth);
        })
    })

}
