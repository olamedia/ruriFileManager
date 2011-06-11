var globalMousedownHandler = function(e){
    // any mousedown outside of list forces finishRename
    if (activeExplorer !== null){
        activeExplorer.finishRename();
    }
};