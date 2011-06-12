navigateHome: function(){
    console.log('navigateHome', this.list.id);
    this.deselect();
    $(this.list).find('li a').first().addClass('selected');
}