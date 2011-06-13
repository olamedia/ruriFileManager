var listItemAClickHandler = function(e){
    console.log('list item a click', e);
    e.preventDefault(); // prevents default only
    //e.stopPropagation(); // leaves only default action
};