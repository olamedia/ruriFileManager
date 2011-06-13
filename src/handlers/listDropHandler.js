var listDropHandler = function(je){
    je.preventDefault();
    je.stopPropagation();
    var e = je.originalEvent;
    console.log('list drop', je, e);
    if (e.dataTransfer){
        var dt = e.dataTransfer;
        console.log('dataTransfer', dt, dt.files, dt.files.length);
        if (dt.files && dt.files.length){
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('dropped ' + file.name);
                activeExplorer.upload5(file);
            }
        }
    }
    return false;
};