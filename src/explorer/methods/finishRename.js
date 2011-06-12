finishRename: function(e){
    if (e){ // from event
        console.log('finish rename ', e);
        var target = e.target;
        if ($(target).parents('li').first().attr('id') == renaming){
            return false;
        }
    }
    if (renaming){
        renaming = false;
        $(this.list).find("li:has(textarea)").each(function(){
            var li = $(this);
            var ta = li.find('textarea');
            var caption = li.find('.caption');
            caption.text(ta.val());
            /*if (li.isFolder()){
                $.post(apiEndPoint + 'folder/' + li.attr('id') + '/rename', {
                    name: caption.text()
                    });
            }else{
                $.post(apiEndPoint + 'file/' + li.attr('id') + '/rename', {
                    name: caption.text()
                    });
            }*/
        });
    }
}