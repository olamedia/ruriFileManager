var allowClick = false;
var listItemAClickHandler = function(e){
    console.log('list item a click', e);
    if (!allowClick){
        e.preventDefault(); // prevents default only
    }else{
        allowClick = false;
    }
//e.stopPropagation(); // leaves only default action
};