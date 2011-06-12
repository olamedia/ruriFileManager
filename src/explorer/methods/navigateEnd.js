navigateEnd: function(){
    console.log('navigateEnd', this.list.id);
    this.deselect();
    $(this.list).find('li a').last().addClass('selected');
}