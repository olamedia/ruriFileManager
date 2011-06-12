var listItemMousedownHandler = function(e){
    console.log('list item mousedown', e);
    // Allow passing to listMousedownHandler to activate list
    e.preventDefault();
    e.stopPropagation();
    var li = e.currentTarget;
    li.parentNode.yukiFolderExplorer.select(e.currentTarget);
    return false;
};