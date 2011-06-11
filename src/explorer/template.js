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
    list: null,
    active: false,
    /** @include methods **/
    onDomChange: function(){
        console.log('TODO onDomChange', this.list.id);
    },
    activate: function(){
        deactivateExplorers(); // deactivate all explorers
        this.active = true;
        activeExplorer = this;
    },
    deactivate: function(){
        this.active = false;
    },
    bind: function(){
        
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
        this.bind();
        this.activate(); // activate last initialized explorer
        return true;
    }
};
folderExplorer.prototype = folderExplorerPrototype;
folderExplorer.prototype.constructor = folderExplorer;
