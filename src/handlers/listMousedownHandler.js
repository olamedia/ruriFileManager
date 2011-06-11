var listMousedownHandler = function(e){
    console.log('list mousedown', e);
    e.preventDefault();
    e.currentTarget.yukiFolderExplorer.activate();
    return false;
};