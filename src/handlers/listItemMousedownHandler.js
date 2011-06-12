var listItemMousedownHandler = function(e){
    console.log('list item mousedown', e);
    // Allow passing to listMousedownHandler to activate list
    var li = e.currentTarget;
    li.parentNode.yukiFolderExplorer.select(e.currentTarget);
};