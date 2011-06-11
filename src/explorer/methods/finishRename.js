finishRename: function(e){
    if (e){ // from event
        console.log('finish rename ', e);
        var target = e.target;
        if ($(target).parents('li').first().attr('id') == renaming){
            return false;
        }
    }
}