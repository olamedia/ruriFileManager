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
        var self = this;
        $(this.list).find("li:has(textarea)").each(function(){
            var li = $(this);
            var ta = li.find('textarea');
            var name = ta.val();
            var caption = li.find('.caption');
            caption.text(name);
            var id = this.id;
            var type = 'file';
            if (li.hasClass('folder')){
                type = 'folder';
            }
            self.apiCall({
                action:'rename',
                type: type,
                id: id,
                name: name
            }, function(response){
                if (response.status !== 0){
                    console.error(response);
                }else{
                    console.log(response);
                }
            });
        });
    }
}