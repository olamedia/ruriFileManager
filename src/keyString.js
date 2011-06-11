var keyString = function(e){
    var s = '';
    var k = e.keyCode;
    if (e.ctrlKey){
        s+='CTRL+';
    }
    if (e.altKey){
        s+='ALT+';
    }
    if (e.shiftKey){
        s+='SHIFT+';
    }
    var special = {
        8: 'BACKSPACE',
        13: 'ENTER',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN',
        46: 'DEL'
    };
    if (typeof special[k] != 'undefined'){
        s += special[k];
    }else if (k >= 112 && k <= 123){ // F1-F12: 112-123
        s += 'F' + (k - 111);
    }else{
        s += String.fromCharCode(k);
    }
    return s; 
};