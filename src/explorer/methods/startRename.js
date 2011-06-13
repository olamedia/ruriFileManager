startRename: function(){
    var li = $(this.list).find('li:has(a.selected)').first();
    if (li.length){
        li.addClass('renaming');
        var caption = li.find('.caption');
        renaming = true;
        var name = $('<textarea></textarea>');
        name.text(caption.text());
        caption.addClass('caption-rename').html(name);
        var ta = name.get(0);
        ta.style.height = '1px';
        var grow = function(ta){
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight+'px';
        };
        grow(ta);
        name.bind('keyup', function(){
            grow(ta);
        }).focus().bind('blur', this.finishRename).bind('mousedown', function(e){
            e.stopPropagation(); // leaves only default action
        });
    };
}