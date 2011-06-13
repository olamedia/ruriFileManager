selectRange: function(endLi){
    var $startLi = $(this.list).find('li:has(a.selected)').last();
    if (!$startLi.length){
        // simply select one item
        this.select(endLi);
        return;
    }
    //var startLi = $startLi.get(0);
    $(this.list).find('a').removeClass('selected');
    var id = endLi.id;
    if ($startLi.nextAll().filter('li[id="' + id + '"]').length){
        // endLi is after startLi
        $startLi.nextUntil('li[id="' + id + '"]').andSelf().add(endLi).find('a').addClass('selected');
    }else{
        $startLi.prevUntil('li[id="' + id + '"]').andSelf().add(endLi).find('a').addClass('selected');
    }
//$(li).find('a').addClass('selected');
}