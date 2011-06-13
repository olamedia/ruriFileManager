navigateLeft: function(e){
    var a = $(this.list).find('li:has(a.selected)').first().prev().find('a');
    this.deselect();
    if (a.length){
        a.addClass('selected');
    }else{
        $(this.list).find('a').last().addClass('selected');
    }
}