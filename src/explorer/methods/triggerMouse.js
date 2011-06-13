triggerMouse: function(type, el, nat){
    if (!nat){
        if (type === 'click'){
            this.triggerMouse('mousedown', el, true);
            this.triggerMouse('mouseup', el, true);
            this.triggerMouse('click', el, true);
            return;
        }else if (type === 'dblclick'){
            this.triggerMouse('click', el);
            this.triggerMouse('click', el);
            return;
        }
    }
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type, true, true, window,
        0, 0, 0, 0, 0, 
        false, false, false, false, 
        0, null);
    el.dispatchEvent(evt);
    
}