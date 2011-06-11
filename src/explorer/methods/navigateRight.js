navigateRight: function(){
    console.log('navigateRight', this.list.id);
    var a = $(this.list).find('li:has(a.selected)').last().next().find('a');
    if (a.length){
        this.deselect();
        a.addClass('selected');
    }
}