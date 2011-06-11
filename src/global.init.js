var globalInitialized = false;
var globalInit = function(options){
    if (globalInitialized){
        return;
    }
    globalInitialized = true;
    $(document)
    .bind('keydown', keydownHandler)
    .bind('click', globalClickHandler);
};