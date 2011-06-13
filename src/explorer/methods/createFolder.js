createFolder: function(){
    console.log('createFolder', this.list.id);
    var self = this;
    self.apiCall({
        action: 'create', 
        type: 'folder'
    }, function(response){
        if (response.status !== 0){
            console.error(response);
        }else{
            var newid = response.result.id;
            var explorer = self;
            explorer.apiCall({
                action: 'list', 
                id: self.list.id
            }, function(response){
                console.log('response', response);
                if (response.status !== 0){
                    console.error(response);
                }else{
                    explorer.loadList(response.id, response.result);
                    console.log('select', newid);
                    $(explorer.list).find('a').removeClass('selected');
                    $(explorer.list).find('li[id="' + newid + '"] a').addClass('selected');
                    explorer.startRename();
                }
            });
            console.log(response);
        }
    });
}