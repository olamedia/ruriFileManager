selectAll: function(){
    console.log('selectAll', this.list.id);
    $(this.list).find('a').addClass('selected');
}