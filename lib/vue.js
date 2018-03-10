const download = require('./download'); 
const re = require('./rename');
const path = require('path');
module.exports = function vue(newName){
    return download().then((temp)=>{
        console.log(": successfully created" );
        return re('vue-template', newName);
    })
};
