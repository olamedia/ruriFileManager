var globalMousedownHandler = function(e){
    console.log('global mousedown', e);
    // any mousedown outside of list forces finishRename
    if (activeExplorer !== null){
        activeExplorer.finishRename();
    }
    deactivateExplorers();
};