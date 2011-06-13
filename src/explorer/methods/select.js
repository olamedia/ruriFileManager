select: function(li){
    $(this.list).find('a').removeClass('selected');
    $(li).find('a').addClass('selected');
}