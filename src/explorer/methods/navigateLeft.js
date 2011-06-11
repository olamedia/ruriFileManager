navigateLeft: function(e){
    console.log('navigateLeft', this.list.id);
    var a = $(this.list).find('li:has(a.selected)').first().prev().find('a');
    if (a.length){
        this.deselect();
        a.addClass('selected');
    }
}