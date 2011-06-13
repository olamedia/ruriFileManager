navigateSelected: function(e){
    // keyboard: ENTER
    console.log('navigateSelected', this.list.id);
    var a = $(activeExplorer.list).find('a.selected').first().get(0);
    if (a){
        activeExplorer.triggerMouse('dblclick', a);
    //listItemDoubleClickHandler(evt);
    }
}