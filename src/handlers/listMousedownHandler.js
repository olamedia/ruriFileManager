var listMousedownHandler = function(e){
    console.log('list mousedown', e);
    e.preventDefault();
    if (activeExplorer !== null){
        activeExplorer.finishRename();
    }
    e.currentTarget.yukiFolderExplorer.activate();
    return false;
};