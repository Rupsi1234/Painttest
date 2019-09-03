'use strict'
//getDimensions
exports.getHeight = function(rowNum,self) {

    // var self = this;
    var hgt;
    var rowPath;
    return new Promise(function(resolve, reject) {
        //console.log("logging height");
        self.api.url(function(current_url) {
            if(current_url.value.includes('embedframe')) {
                rowPath = "div.leo-canvasarea > div.widgetContainer > div.spreadsheet.k-widget.k-spreadsheet > div.k-spreadsheet-view > div.k-spreadsheet-fixed-container > div.k-spreadsheet-pane.k-top.k-left > div.k-spreadsheet-row-header > div:nth-child(" + rowNum + ") > div"
            } else {
                rowPath = "div.widgetContainer > div.spreadsheet.k-widget.k-spreadsheet > div.k-spreadsheet-view > div.k-spreadsheet-fixed-container > div.k-spreadsheet-pane.k-top.k-left > div.k-spreadsheet-row-header > div:nth-child(" + rowNum + ") > div"
            }
            self.api.getElementSize(rowPath, function(result) {
                hgt = (result.value.height) / 2;
            })
            self.api.getLocationInView(rowPath, function(result) {
                hgt = hgt / 2 + result.value.y;
                resolve(hgt);
            })
        })
    })
}

exports.getWidth = function(colNum,self) {

    // var self = this;
    var wdth;
    var colpath;
    return new Promise(function(resolve, reject) {
       // console.log("calculating Width");
        self.api.url(function(current_url) {
            if(current_url.value.includes('embedframe')) {
                colpath = "div.leo-canvasarea > div.widgetContainer > div.spreadsheet.k-widget.k-spreadsheet > div.k-spreadsheet-view > div.k-spreadsheet-fixed-container > div.k-spreadsheet-pane.k-top.k-left > div.k-spreadsheet-column-header > div:nth-child(" + colNum + ") > div"
            } else {
                colpath = "div.widgetContainer > div.spreadsheet.k-widget.k-spreadsheet > div.k-spreadsheet-view > div.k-spreadsheet-fixed-container > div.k-spreadsheet-pane.k-top.k-left > div.k-spreadsheet-column-header > div:nth-child(" + colNum + ") > div"
            }
            self.api.getElementSize(colpath, function(result) {
                wdth = ((result.value.width) / 2);
            })

            self.api.getLocationInView(colpath, function(result) {
                wdth = wdth / 2 + result.value.x;
                resolve(wdth);
            })
        })
    })

}
