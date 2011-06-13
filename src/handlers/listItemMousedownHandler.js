var listItemMousedownHandler = function(e){
    console.log('list item mousedown', e);
    // Allow passing to listMousedownHandler to activate list
    var li = e.currentTarget;
    var explorer = li.parentNode.yukiFolderExplorer;
    if (e.shiftKey){
        explorer.selectRange(e.currentTarget);
    }else if(e.ctrlKey){
        explorer.select(e.currentTarget, true);
    }else{
        explorer.select(e.currentTarget);
    }
};