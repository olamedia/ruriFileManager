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
    deactivate: function(){
        this.active = false
        $(this.list).addClass('files-list-inactive').removeClass('files-list-active');
    },
    bind: function(){
        $(this.list).bind('mousedown', listMousedownHandler);
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
