$.fn.explorer = function(options){
    globalInit(options);
    return this.each(function() {        
        if (options) { 
            $.extend(defaults, options);
        }
        this.yukiFolderExplorer = new folderExplorer(this, options);
    });
};