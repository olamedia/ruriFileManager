select: function(li, add){
    if (!add){
        $(this.list).find('a').removeClass('selected');
    }
    if (add && $(this.list).find('a').length > 1){
        $(li).find('a').toggleClass('selected');
    }else{
        $(li).find('a').addClass('selected');
    }
}