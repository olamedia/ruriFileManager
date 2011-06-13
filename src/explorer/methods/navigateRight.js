navigateRight: function(){
    console.log('navigateRight', this.list.id);
    var a = $(this.list).find('li:has(a.selected)').last().next().find('a');
    this.deselect();
    if (a.length){
        a.addClass('selected');
    }else{
        $(this.list).find('a').first().addClass('selected');
    }
}