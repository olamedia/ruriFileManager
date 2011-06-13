var explorerInstances = [];
var activeExplorer = null;
var renaming = false;
var deactivateExplorers = function(){
    for (i = 0; i < explorerInstances.length; i++){
        explorerInstances[i].deactivate();
    }
    activeExplorer = null;
};
var folderExplorer = function(list, options){
    $.extend(this, options);
    this.list = list;
    this.init();
};
var folderExplorerPrototype = {
    api: null,
    list: null, // HTMLUListElement
    active: false,
    /** @include methods **/
    onDomChange: function(){
        console.log('TODO onDomChange', this.list.id);
    },
    apiCall: function(request, callback){
        if (this.api !== null){
            $.post(this.api, request, callback, 'json');
        }
    },
    activate: function(){
        deactivateExplorers(); // deactivate all explorers
        this.active = true;
        activeExplorer = this;
        $(this.list).removeClass('files-list-inactive').addClass('files-list-active');
    },
    refresh: function(parent){
        var id = this.list.id;
        this.getList(id, parent);
    },
    getList: function(id, parent){
        var explorer = this;
        var args = {
            action: 'list', 
            id: id
        };
        if (parent){
            args['type'] = 'parent';
        };
        explorer.apiCall(args, function(response){
            console.log('response', response);
            if (response.status !== 0){
                console.error(response);
            }else{
                explorer.loadList(id, response.result);
                console.log(response);
            }
        });
    },
    upload5: function(file, targetId){
        if (!targetId){
            targetId = this.list.id;
        }
        // TODO check file drop support
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.api);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", file.fileName);
        xhr.setRequestHeader("X-File-Size", file.fileSize);
        xhr.setRequestHeader("X-Target-Id", targetId);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.onload = function() { 
            /* If we got an error display it. */
            if (xhr.responseText && xhr.responseText !== '{"status":0}') {
                console.error(xhr.responseText);
            }else{
                self.refresh();
            }
        };
        // event.dataTransfer.mozGetDataAt("application/x-moz-file", 0)
        // Starting with Firefox 3.5 Gecko 1.9.2, you may also specify an DOM File
        xhr.send(file); 
    },
    deactivate: function(){
        this.active = false
        $(this.list).addClass('files-list-inactive').removeClass('files-list-active');
    },
    bind: function(skipSelf){
        if (!skipSelf){
            $(this.list).bind('mousedown', listMousedownHandler);
            $(this.list).bind('drop', listDropHandler);
            this.list.ondragenter = this.list.ondragover = function (e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                return false;
            };
        }
        $(this.list).find('li').bind('mousedown', listItemMousedownHandler);
        $(this.list).find('a')
        .bind('mousedown', listItemAMousedownHandler)
        .bind('click', listItemAClickHandler);
    },
    call: function(method){
        arguments.shift();
        method.apply(this, arguments);
    },
    apply: function(method, args){
        method.apply(this, args);
    },
    init: function(){
        if (this.api === null){
            return false;
        }
        if (this.list === null){
            return false;
        }
        explorerInstances.push(this);
        $(this.list).addClass('files-list');
        this.bind();
        this.activate(); // activate last initialized explorer
        return true;
    }
};
folderExplorer.prototype = folderExplorerPrototype;
folderExplorer.prototype.constructor = folderExplorer;
