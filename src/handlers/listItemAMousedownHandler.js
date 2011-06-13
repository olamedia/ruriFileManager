var listItemAMousedownHandler = function(e){
    console.log('list item a mousedown', e);
    e.preventDefault(); // prevents default only
    //e.stopPropagation(); // leaves only default action
};