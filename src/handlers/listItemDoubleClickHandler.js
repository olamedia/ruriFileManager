var listItemDoubleClickHandler = function(e){
    console.log('list item a dblclick', e);
    var li = e.currentTarget;
    if ($(li).hasClass('folder')){
        var explorer = activeExplorer;
        var id = li.id;
        explorer.apiCall({
            action: 'list', 
            id: id
        }, function(response){
            console.log('response', response);
            if (response.status !== 0){
                console.error(response);
            }else{
                explorer.loadList(id, response.result);
                console.log(response);
            }
        });
    }else{
        if (e.type == 'internal'){
            //allowClick = true;
            //var a = $(li).find('a').get(0);
            //a.dispatchEvent(e);
        }else{
            allowClick = true;
        }
    }
}