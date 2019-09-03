  
'use strict'


   exports.getLeonardoID = function(self) {
    var getValue;
    var itemurl;

    return new Promise(function(resolve, reject) {

        self.url(function(result) {
          
               getValue=result.value.substring(result.value.lastIndexOf("-")+1)
               itemurl=getValue.substring(0, getValue.indexOf("/"))
               resolve(itemurl);
        })
       
     })
   } 
