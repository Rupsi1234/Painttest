'use strict'
//getSelectorForCell
exports.getSelectorForCell = function(cellRef) {
    var res = cellRef.substr(0, 1)
    var colNum = res.charCodeAt(0);
    var rowNum = cellRef.replace(/[^0-9]/g, '');
    // change alphabet to index number
    if (colNum <= 89 && colNum >= 64) {
        colNum = colNum - 64;
    }

    var element = "div.leo-canvasarea div.k-spreadsheet-cell.k-row-" + (rowNum - 1) + ".k-col-" + (colNum - 1);
    
    return element
}