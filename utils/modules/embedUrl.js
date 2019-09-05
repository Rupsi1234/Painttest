'use strict'

  
         




    exports.getEmbedUrl = function(self) {
    var EmbedData;
    var embedurl;

    return new Promise(function(resolve, reject) {
        self.waitForElementVisible('.modal-embed .modal-header',10000)
            .getValue('.modal-embed textarea',function(result){
              EmbedData=result.value
              var EmbedValue=EmbedData.substring(EmbedData.lastIndexOf("=")+1)
                embedurl=EmbedValue.substring(0, EmbedValue.indexOf(">"))
                embedurl=  embedurl.split('\"').join('')
               resolve(embedurl);
        })
       
     })
   } 
