const fs = require('fs');

/**
 * 文件是否存在?
 * @param {String} files 文件绝对路径
 */
module.exports = function open(files, mode){
    mode = mode;
    return new Promise((res, rej) => {
        if(Array.isArray(files)){
            files.forEach(file => {
                openFile(file, mode, res, rej);
            });
            return
        }
        openFile(files, mode, res, rej)
    })
}

function openFile(file, mode, res, rej){
    fs.open(file, mode, (err,fd) => {
        if(err){
                if (err.code === 'ENOENT') {
                    rej('myfile does not exist');
                    return;
                  
            }
            rej(err)
        }
        res(fd)
    });  
}