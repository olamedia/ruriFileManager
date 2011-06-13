navigateSelected: function(e){
    // keyboard: ENTER
    var a = $(activeExplorer.list).find('a.selected').first().get(0);
    if (a){
        activeExplorer.triggerMouse('dblclick', a);
    //listItemDoubleClickHandler(evt);
    }
}