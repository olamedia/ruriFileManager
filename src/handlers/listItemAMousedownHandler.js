var clicks = 0;
var lastClickItem = null;
var listItemAMousedownHandler = function(e){
    clearTimeout(doubleClickTimeout);
    var listItem = e.currentTarget.parentNode;
    console.log('list item a mousedown', clicks, listItem.id);
    if (clicks === 1 && lastClickItem !== null && lastClickItem.id === listItem.id){
        // doubleclick
        e.stopPropagation(); // leaves only default action
        e.currentTarget = listItem;
        listItemDoubleClickHandler(e);
    }else{
        e.preventDefault(); // prevents default only
    }
    clicks = 1;
    lastClickItem = listItem;
    var doubleClickTimeout = setTimeout(function(){
        clicks = 0;
    }, 400);
//e.stopPropagation(); // leaves only default action
};