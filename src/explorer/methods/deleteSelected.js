deleteSelected: function(){
    console.log('deleteSelected', this.list.id);
    var self = this;
    $(this.list).find('li:has(a.selected)').each(function(){
        var li = $(this);
        var id = this.id;
        var type = 'file';
        if (li.hasClass('folder')){
            type = 'folder';
        }
        self.apiCall({
            action: 'delete', 
            type: type, 
            id: id
        }, function(response){
            if (response.status !== 0){
                console.error(response);
            }else{
                li.remove(); // remove from list
            }
        });
    // TODO update list
    });
}