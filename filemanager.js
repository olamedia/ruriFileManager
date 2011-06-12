;(function($, undefined){


var keydownHandler = function(e){
    
    var key = keyString(e);
    console.log('keydown', key, e);
    if (key === 'ENTER'){
        if (renaming){
            finishRename();
            return false;
        }
    }
    
    if (activeExplorer === null || renaming){
        return true; // skip events outside or while renaming
    }
    
    var methods = {
        'LEFT': 'navigateLeft',
        'UP': 'navigateUp',
        'RIGHT': 'navigateRight',
        'DOWN': 'navigateDown',
        'HOME': 'navigateHome',
        'END': 'navigateEnd',
        'BACKSPACE': 'navigateParent',
        'F2': 'startRename',
        'DEL': 'deleteSelected',
        'CTRL+A': 'selectAll',
        'CTRL+C': 'copy',
        'CTRL+X': 'cut',
        'CTRL+V': 'paste',
        'CTRL+ALT+N': 'createFolder'
        // TAB WHILE RENAMING = SWITCH TO RENAME NEXT IN LIST
        // SHIFT + LEFT/RIGHT = EXPAND SELECTION
    };
    
    if (typeof methods[key] !== 'undefined'){
        e.preventDefault();
        var method = methods[key];
        activeExplorer[method].apply(activeExplorer, [e]);
        return false;
    }
    
    return true;
    
};
var globalClickHandler = function(e){
   // console.log('global click', e);
    
};
var globalMousedownHandler = function(e){
    console.log('global mousedown', e);
    // any mousedown outside of list forces finishRename
    if (activeExplorer !== null){
        activeExplorer.finishRename();
    }
    deactivateExplorers();
};
var listMousedownHandler = function(e){
    console.log('list mousedown', e);
    e.preventDefault();
    if (activeExplorer !== null){
        activeExplorer.finishRename();
    }
    e.currentTarget.yukiFolderExplorer.activate();
    return false;
};
var listItemMousedownHandler = function(e){
    console.log('list item mousedown', e);
    // Allow passing to listMousedownHandler to activate list
    var li = e.currentTarget;
    li.parentNode.yukiFolderExplorer.select(e.currentTarget);
};

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
    copy: function(){
    console.log('TODO copy', this.list.id);
},createFolder: function(){
    console.log('TODO createFolder', this.list.id);
},cut: function(){
    console.log('TODO cut', this.list.id);
},deleteSelected: function(){
    console.log('TODO deleteSelected', this.list.id);
},deselect: function(){
    $(this.list).find('a').removeClass('selected');
},finishRename: function(e){
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
},navigateDown: function(){
    console.log('TODO navigateDown', this.list.id);
},navigateEnd: function(){
    console.log('navigateEnd', this.list.id);
    this.deselect();
    $(this.list).find('li a').last().addClass('selected');
},navigateHome: function(){
    console.log('navigateHome', this.list.id);
    this.deselect();
    $(this.list).find('li a').first().addClass('selected');
},navigateLeft: function(e){
    console.log('navigateLeft', this.list.id);
    var a = $(this.list).find('li:has(a.selected)').first().prev().find('a');
    if (a.length){
        this.deselect();
        a.addClass('selected');
    }
},navigateParent: function(){
    console.log('TODO navigateParent', this.list.id);
},navigateRight: function(){
    console.log('navigateRight', this.list.id);
    var a = $(this.list).find('li:has(a.selected)').last().next().find('a');
    if (a.length){
        this.deselect();
        a.addClass('selected');
    }
},navigateUp: function(){
    console.log('TODO navigateUp', this.list.id);
},paste: function(){
    console.log('TODO paste', this.list.id);
},select: function(li){
    console.log('select', this.list.id, li);
    $(this.list).find('a').removeClass('selected');
    $(li).find('a').addClass('selected');
},selectAll: function(){
    console.log('selectAll', this.list.id);
    $(this.list).find('a').addClass('selected');
},startRename: function(){
    console.log('startRename', this.list.id);
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
},
    onDomChange: function(){
        console.log('TODO onDomChange', this.list.id);
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

var defaults = {
    api: null,
    list: null
};
var keyString = function(e){
    var s = '';
    var k = e.keyCode;
    if (e.ctrlKey){
        s+='CTRL+';
    }
    if (e.altKey){
        s+='ALT+';
    }
    if (e.shiftKey){
        s+='SHIFT+';
    }
    var special = {
        8: 'BACKSPACE',
        13: 'ENTER',
        35: 'END',
        36: 'HOME',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN',
        46: 'DEL'
    };
    if (typeof special[k] != 'undefined'){
        s += special[k];
    }else if (k >= 112 && k <= 123){ // F1-F12: 112-123
        s += 'F' + (k - 111);
    }else{
        s += String.fromCharCode(k);
    }
    return s; 
};
var globalInitialized = false;
var globalInit = function(options){
    if (globalInitialized){
        return;
    }
    globalInitialized = true;
    $(document)
    .bind('keydown', keydownHandler)
    .bind('click', globalClickHandler)
    .bind('mousedown', globalMousedownHandler);
};



    
$.fn.explorer = function(options){
    globalInit(options);
    return this.each(function() {        
        if (options) { 
            $.extend(defaults, options);
        }
        this.yukiFolderExplorer = new folderExplorer(this, options);
    });
};
}(jQuery));
