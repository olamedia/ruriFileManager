loadList: function(id, list){
    console.log('load list', this.list.id);
    this.list.id = id;
    var ul = $(this.list);
    ul.html('');
    ul.attr('id', id);
    for (i=0;i<list.length;i++){
        item = list[i];
        var li = $('<li></li>');
        var a = $('<a></a>');
        var icon = $('<span class="icon"></span>');
        var caption = $('<span class="caption"></span>');
        var isFolder = (item.type === 'folder');
        li.attr('id', item.id);
        if (isFolder){
            li.addClass('folder');
        }else{
            a.attr('target', '_blank');
        }
        caption.text(item.name);
        if (item.href){
            a.attr('href', item.href);
        }else{
            a.attr('href', 'javascript:void()');
        }
        if (item.icon){
            var img = $('<img />');
            img.attr('src', item.icon);
            img.appendTo(icon);
        }else{
        }
        icon.appendTo(a);
        caption.appendTo(a);
        a.appendTo(li);
        li.appendTo(ul);
    }
    //$(this.list).html(ul.html());
    this.bind(true);
}