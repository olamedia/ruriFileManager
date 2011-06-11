select: function(li){
    console.log('select', this.list.id, li);
    $(this.list).find('a').removeClass('selected');
    $(li).find('a').addClass('selected');
}