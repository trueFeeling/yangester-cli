var fs = require('fs');
var path = require('path');
fs.writeFile(path + "test.js", "hello world!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});