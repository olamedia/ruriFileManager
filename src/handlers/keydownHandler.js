

var keydownHandler = function(e){
    
    var key = keyString(e);
    
    if (key === 'ENTER'){
        if (renaming){
            finishRename();
            return false;
        }
    }
    
    if (activeExplorer === null || renaming){
        return true; // skip events outside or while renaming
    }
    
    var methods = {
        'LEFT': 'navigateLeft',
        'UP': 'navigateUp',
        'RIGHT': 'navigateRight',
        'DOWN': 'navigateDown',
        'HOME': 'navigateHome',
        'END': 'navigateEnd',
        'BACKSPACE': 'navigateParent',
        'F2': 'startRename',
        'DEL': 'deleteSelected',
        'CTRL+A': 'selectAll',
        'CTRL+C': 'copy',
        'CTRL+X': 'cut',
        'CTRL+V': 'paste',
        'CTRL+ALT+N': 'createFolder'
    };
    
    if (typeof methods[key] !== 'undefined'){
        e.preventDefault();
        var method = methods[key];
        activeExplorer[method].apply(activeExplorer, [e]);
        return false;
    }
    
    return true;
    
};