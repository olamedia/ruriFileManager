var listItemMousedownHandler = function(e){
    console.log('list item mousedown', e);
    // Allow passing to listMousedownHandler to activate list
    // e.preventDefault();
    e.currentTarget.parentNode.yukiFolderExplorer.select(e.currentTarget);
    // return false;
};