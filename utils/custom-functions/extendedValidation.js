exports.command = function (extendedValidationCells, client) {

    cellsToValidate = extendedValidationCells.toString().split(",");

    return new Promise(function(resolve, reject) {

        if (cellsToValidate[0] != "") {
            console.log("Initializing Precheck")

        client.preCheck(cellsToValidate, function() {
                resolve(true);
            })

        } else {

            client.perform(function(){
            resolve(false);
         })   
            
        }
    })
}