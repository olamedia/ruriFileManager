

var keydownHandler = function(e){
    
    var key = keyString(e);
    console.log('keydown', key, e);
    
    
    if (activeExplorer === null){
        return true; // skip events outside or while renaming
    }
    if (key === 'ENTER'){
        e.preventDefault();
        activeExplorer.finishRename();
        return false;
    }
    if (renaming){
        return true;
    }
    var methods = {
        'LEFT': 'navigateLeft',
        'UP': 'navigateUp',
        'RIGHT': 'navigateRight',
        'DOWN': 'navigateDown',
        'HOME': 'navigateHome',
        'END': 'navigateEnd',
        'BACKSPACE': 'navigateParent',
        'ENTER': 'navigateSelected',
        'F2': 'startRename',
        'DEL': 'deleteSelected',
        'CTRL+A': 'selectAll',
        'CTRL+C': 'copy',
        'CTRL+X': 'cut',
        'CTRL+V': 'paste',
        'CTRL+ALT+N': 'createFolder'
    // TAB WHILE RENAMING = SWITCH TO RENAME NEXT IN LIST
    // SHIFT + LEFT/RIGHT = EXPAND SELECTION
    };
    
    if (typeof methods[key] !== 'undefined'){
        e.preventDefault();
        var method = methods[key];
        activeExplorer[method].apply(activeExplorer, [e]);
        return false;
    }
    
    return true;
    
};